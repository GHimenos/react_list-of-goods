import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

// DON'T save goods to the state
type State = {
  isReversed: boolean;
  sortType: SortType;
  reset: boolean;
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  switch (sortType) {
    case SortType.NONE:
      break;
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
  }

  isReversed && reverser(visibleGoods);

  return visibleGoods;
}

export function reverser(goods: string[]) {
  goods.reverse();
  return goods;
}

export const App: React.FC = () => {
  const initialOrder: State = {
    isReversed: false,
    sortType: SortType.NONE,
    reset: false,
  };
  const [order, setOrder] = useState<State>({
    ...initialOrder,
  });

  const displayGoods: string[] = getReorderedGoods(goodsFromServer, order);
  //**new comment for commit */
  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            console.log(this);

            setOrder(prev => ({
              ...prev,
              sortType: SortType.ALPHABET,
              reset: true,
            }));
          }}
          type="button"
          className={classNames('button is-info', {
            'is-light': order.sortType !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() =>
            setOrder(prev => ({
              ...prev,
              sortType: SortType.LENGTH,
              reset: true,
            }))
          }
          type="button"
          className={classNames('button is-success', {
            'is-light': order.sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            setOrder(prev => ({
              ...prev,
              isReversed: !prev.isReversed,
              reset:
                prev.isReversed && prev.sortType === SortType.NONE
                  ? false
                  : true,
            }))
          }
          className={classNames('button is-warning', {
            'is-light': !order.isReversed,
          })}
        >
          Reverse
        </button>

        {order.reset && (
          <button
            onClick={() => {
              setOrder(prev => ({
                ...prev,
                sortType: SortType.NONE,
                isReversed: false,
                reset: false,
              }));
            }}
            type="button"
            className="button is-danger is-light"
            hidden
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayGoods.map((good: string) => {
          return <li key={good} data-cy="Good">{`${good}`}</li>;
        })}
      </ul>
    </div>
  );
};

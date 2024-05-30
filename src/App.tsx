import React from 'react';
import { useState } from 'react';
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
};

//! когда тип через ":", а когда через "<>"?
/*
 * - возможно:
 * useState уже имеет свой тип и ему его не надо присваивать вообще;
 * useState имеет свой тип и может принимать любые другие типы, как аргумент
 *  => мы передаём Generic для конкретизации типа State
 */

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
      console.log(visibleGoods);
      break;
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      console.log(visibleGoods);
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      console.log(visibleGoods);
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
  const [order, setOrder] = useState<State>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const displayGoods: string[] = getReorderedGoods(goodsFromServer, order);
  console.log(displayGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            setOrder(prev => ({ ...prev, isReversed: !prev.isReversed }))
          }
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        {displayGoods.map((good: string) => {
          return <li key={good} data-cy="Good">{`${good}`}</li>;
        })}
      </ul>
    </div>
  );
};

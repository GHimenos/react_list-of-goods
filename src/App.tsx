import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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

//! в чём смысл двух одинаковых типов?

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

// DON'T save goods to the state
type State = {
  sortType: SortType;
  isReversed: boolean;
};

//* стр-ра"Типы"{
//* type ReorderOptions = {
// sortType: SortType;
// isReversed: boolean;
// }
//*      }

//! когда тип через ":", а когда через "<>"?
/* const [render, setRender] = useState<State>({
  isReversed: false,
  sortType: SortType.NONE,
}); */

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  //! почему передаётся {} а не const (let):ReorderOptions в которой объект - так можно использовать switch
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];
  //* костыль для пробы
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

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    isReversed,
    sortType,
  });

  const button = document.createElement('button');
  button.addEventListener('click', () => {});

  const name = 'alex';
  const user = { name };

  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={handleClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSortType(SortType.NONE);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map((good: string) => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

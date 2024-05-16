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

//! в чём смысл двух одинаковых типов?

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
const [render, setRender] = useState<State>({
  isReversed: false,
  sortType: SortType.NONE,
});

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  //! почему передаётся {} а не const (let):ReorderOptions в которой объект - так можно использовать switch
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];
  //* костыль для пробы
  const options: any[] = [sortType, isReversed];

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  switch (options) {
    case [SortType.NONE, false]:
      console.log(visibleGoods);
      break;
    case [SortType.ALPHABET, false]:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      console.log(visibleGoods);
      break;
    case [SortType.LENGTH, false]:
      visibleGoods.sort((a, b) => a.length - b.length);
      console.log(visibleGoods);
      break;
    case [SortType.NONE, true]:
      visibleGoods.reverse();
      console.log(visibleGoods);
      break;
    case [SortType.ALPHABET, true]:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      visibleGoods.reverse();
      console.log(visibleGoods);
      break;
    case [SortType.LENGTH, true]:
      visibleGoods.sort((a, b) => a.length - b.length);
      visibleGoods.reverse();
      console.log(visibleGoods);
      break;
  }

  console.log(options);

  return visibleGoods;
}

export const App: React.FC = () => {
  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        {goodsFromServer.map((good: string) => {
          return <li key={good} data-cy="Good">{`${good}`}</li>;
        })}
      </ul>
    </div>
  );
};

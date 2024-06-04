import React from 'react';
import { useState } from 'react';
import { SortType, type State } from './types';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './serverReqst';
import { getReorderedGoods } from './utils';

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

  const handleAlpha = () =>
    setOrder(prev => ({
      ...prev,
      sortType: SortType.ALPHABET,
      reset: true,
    }));

  const handleLength = () =>
    setOrder(prev => ({
      ...prev,
      sortType: SortType.LENGTH,
      reset: true,
    }));

  const handleReverse = () => {
    setOrder(prev => ({
      ...prev,
      isReversed: !prev.isReversed,
      reset: !(prev.isReversed && prev.sortType === SortType.NONE),
    }));
  };

  const handleReset = () => {
    setOrder(prev => ({
      ...prev,
      sortType: SortType.NONE,
      isReversed: false,
      reset: false,
    }));
  };

  const alphaStyle = classNames('button is-info', {
    'is-light': order.sortType !== SortType.ALPHABET,
  });

  const lengthStyle = classNames('button is-success', {
    'is-light': order.sortType !== SortType.LENGTH,
  });

  const reverseStyle = classNames('button is-warning', {
    'is-light': !order.isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button onClick={handleAlpha} type="button" className={alphaStyle}>
          Sort alphabetically
        </button>

        <button onClick={handleLength} type="button" className={lengthStyle}>
          Sort by length
        </button>

        <button type="button" onClick={handleReverse} className={reverseStyle}>
          Reverse
        </button>

        {order.reset && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
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

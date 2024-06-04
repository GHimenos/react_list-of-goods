import { Reducer, useReducer } from 'react';

type Action = {
  type: 'increase' | 'decrease';
  payload: number;
};

function reducerFunction(state: number, action: Action) {
  console.log(state, 'prevState', action, 'action');

  switch (action.type) {
    case 'increase':
      state += action.payload;
      return state;
    case 'decrease':
      state -= action.payload;
      return state;

    default:
      return state;
  }
}

export const Counter = () => {
  const [count, dispatch] = useReducer<Reducer<number, Action>>(
    reducerFunction,
    0,
  );
  return (
    <>
      <button
        type="button"
        onClick={() => dispatch({ type: 'decrease', payload: 2 })}
      >
        -
      </button>
      <h1>{count}</h1>
      <button
        type="button"
        onClick={() => dispatch({ type: 'increase', payload: 2 })}
      >
        +
      </button>
    </>
  );
};

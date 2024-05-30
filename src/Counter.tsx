import { Reducer, useReducer } from 'react';

type Action = {
  type: 'increase' | 'decrease';
};

function reducerFunction(state: number, action: Action) {
  console.log(state, 'prevState', action, 'action');

  switch (action.type) {
    case 'increase':
      state += 1;
      return state;
    case 'decrease':
      state -= 1;
      return state;

    default:
      return state;
  }
}

export const Counter = () => {
  const [count, dispatch] = useReducer<Reducer<any, any>>(reducerFunction, 0);
  return (
    <>
      <button type="button" onClick={() => dispatch({ type: 'decrease' })}>
        -
      </button>
      <h1>{count}</h1>
      <button type="button" onClick={() => dispatch({ type: 'increase' })}>
        +
      </button>
    </>
  );
};

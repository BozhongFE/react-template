import { Action } from '../type';

function createReducer<State, A extends Action>(
  types: string[],
  initState: State
) {
  return (state: State = initState, action: A) => {
    const { type, payload } = action;
    if (types.includes(type)) return { ...state, ...payload };
    return state || initState;
  };
}

export default createReducer;

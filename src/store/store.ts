import { createStore, Reducer } from 'redux';

// action types
export const UPDATE_PROCESS_DATA: string = 'ACTION_UPDATE_PROCESS_DATA';

// action definitions
interface BaseAction { type: string };

interface UpdateProcessDataAction extends BaseAction {
  name: string,
  data: string
}

export type Action =
  | BaseAction
  | UpdateProcessDataAction;


// action creatores
export const updateProcessData: (
 (name: string, data: string) => UpdateProcessDataAction
) = (name, data) => ({ type: UPDATE_PROCESS_DATA, name, data });



// reducer
interface State  { processResults: {} };
const initialState = { processResults: [] };

export const reducer: Reducer<State> = (
  state: State = initialState, action: any
) => {

  let nextState;

  switch(action.type) {

    case UPDATE_PROCESS_DATA: {
      nextState = {
        ...state,
        processResults: {
          ...state.processResults,
          [action.name]: action.data
        }
      };
      break;
    }

    default:
      nextState = state;
  }

  return nextState || state;
};

// store
export const store = createStore(reducer);

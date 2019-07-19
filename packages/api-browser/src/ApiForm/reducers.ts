import { FormState, ActionTypes, ChangePayload, Actions } from "./types";
import { omit } from './helpers';

function changeField(
  state: FormState,
  { key, changeSet }: ChangePayload
): FormState {
  if (typeof changeSet === 'string') {
    return { ...state, [key]: changeSet };
  }

  return {
    ...state,
    params: {
      [key]: {
        ...state.params[key],
        [changeSet.key]: changeSet.value
      },
    }
  };
}

function addField(state: FormState, key: string): FormState {
  return {
    ...state,
    [key]: {
      key: "",
      value: "",
    }
  };
}

export default function reducer(state: FormState, action: Actions): FormState {
  switch (action.type) {
    case ActionTypes.Add:
      return addField(state, action.payload.key);
    case ActionTypes.Change:
      return changeField(state, action.payload);
    case ActionTypes.Delete:
      return omit(state, [action.payload.key]);
    case ActionTypes.Reinitialize:
      return action.payload;
    case ActionTypes.Submit:
      return state;
    default:
      return state;
  }
}

import { assertNever } from '@data-manager/devutils';

import {
  FormState,
  ActionTypes,
  ChangePayload,
  Actions,
  Params,
  Param
} from "./types";
import { omit } from "./helpers";

export const initialState = {
  url: "",
  params: [
    {
      key: "",
      value: ""
    }
  ]
};

function isEmptyParam(param: Param): boolean {
  return param.key !== "" && param.value !== "" ? false : true;
}

export function reduceParams(params: Params): Params {
  return params.reduce<Params>((prev, curr, index) => {
    if (isEmptyParam(curr) && index + 1 < params.length) {
      // we're not on the last item and param is considered empty, remove it
      return prev;
    }

    if (index + 1 === params.length && !isEmptyParam(curr)) {
      // check if last item is filled and add a new empty field if it is
      return [...prev, curr, { key: "", value: "" }];
    }

    return [...prev, curr];
  }, []);
}

export function changeField(
  state: FormState,
  { changeSet }: ChangePayload
): FormState {
  if (!changeSet.key) {
    assertNever('required property key is missing from changeSet');
  }

  if (changeSet.key === 'url') {
    return { ...state, url: changeSet.value };
  }

  const [path, key] = changeSet.key.split('.');

  const nextParams = state.params.map((param, i) =>
    path === `params[${i}]`
      ? {
          ...param,
          [key]: changeSet.value,
        }
      : param
  );

  const nextState = {
    ...state,
    params: reduceParams(nextParams)
  };

  return nextState;
}

export default function reducer(state: FormState, action: Actions): FormState {
  switch (action.type) {
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

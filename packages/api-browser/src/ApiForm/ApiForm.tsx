import React from 'react';

import { ChangeSet } from './ParamsField';

import reducer from './reducers';
import { ActionTypes, ApiBrowserValues } from './types';
import RenderApiForm from './RenderApiForm';

const initialState = {
  url: '',
  params: [
    {
      key: 'hello',
      value: 'hello',
    },
  ],
};

export interface ApiFormProps {
  onSubmit?: (nextValues: ApiBrowserValues) => void;
}

export default function ApiForm({ onSubmit }: ApiFormProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleSubmit = React.useCallback(() => {
    dispatch({
      type: ActionTypes.Submit
    });

    if (onSubmit) {
      onSubmit(state);
    }
  }, [dispatch]);

  const handleDelete = React.useCallback(
    (name: string) => {
      dispatch({ type: ActionTypes.Delete, payload: { key: name } });
    },
    [dispatch]
  );

  const handleChange = React.useCallback(
    (changeSet: ChangeSet) => {
      dispatch({ type: ActionTypes.Change, payload: { changeSet } });
    },
    [dispatch]
  );

  return (
    <RenderApiForm
      values={state}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onChange={handleChange}
    />
  );
}

import React from 'react';

import { ChangeSet } from './ParamsField';

import reducer from './reducers';
import { ActionTypes } from './types';
import RenderApiForm from './RenderApiForm';

const initialState = {
  url: '',
  params: {
    1: {
      key: 'hello',
      value: 'hello',
    },
  }
};

export default function ApiForm() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleAdd = React.useCallback(() => {
    dispatch({
      type: ActionTypes.Add,
      payload: { key: String(Math.random()) }
    });
  }, [dispatch]);

  const handleSubmit = React.useCallback(() => {
    dispatch({
      type: ActionTypes.Submit
    });
  }, [dispatch]);

  const handleDelete = React.useCallback(
    (name: string) => {
      dispatch({ type: ActionTypes.Delete, payload: { key: name } });
    },
    [dispatch]
  );

  const handleChange = React.useCallback(
    (name: string, changeSet: ChangeSet | string) => {
      dispatch({ type: ActionTypes.Change, payload: { key: name, changeSet } });
    },
    [dispatch]
  );

  return (
    <RenderApiForm
      values={state}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onChange={handleChange}
      onAdd={handleAdd}
    />
  );
}

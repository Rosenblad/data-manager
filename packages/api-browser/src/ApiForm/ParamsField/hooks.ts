import React from "react";

import { OnChangeEvent } from "../types";

import { ChangeSet, FieldNames } from './types';

export function useHandleChange(
  name: FieldNames,
  onChange: (changeSet: ChangeSet) => void
) {
  return React.useCallback(
    (event: OnChangeEvent) => {
      onChange({ key: name, value: event.target.value });
    },
    [onChange, name]
  );
}

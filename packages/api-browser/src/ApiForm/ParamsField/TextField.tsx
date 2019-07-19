import React from "react";
import MuiTextField, {
  StandardTextFieldProps as MuiTextFieldProps
} from "@material-ui/core/TextField";

import { ExtendProps } from '../types';

import { useHandleChange } from "./hooks";
import { ChangeSet, FieldNames } from "./types";

export interface TextFieldProps {
  name: FieldNames;
  onChange: (changeSet: ChangeSet) => void;
}

export default React.memo(function TextField({
  name,
  onChange,
  ...rest
}: ExtendProps<TextFieldProps, MuiTextFieldProps>) {
  const handleChange = useHandleChange(name, onChange);

  return <MuiTextField fullWidth name={name} onChange={handleChange} {...rest} />;
});

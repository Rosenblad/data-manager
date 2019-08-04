import React from "react";
import TextField from "@material-ui/core/TextField";
import { OnChange } from './types';

export interface RequestUrlFieldProps {
  value: string;
  onChange: OnChange;
}

export default function RequestUrlField({
  value,
  onChange
}: RequestUrlFieldProps) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      const { value } = event.target;

      onChange({ key: "url", value });
    },
    [onChange]
  );

  return (
    <TextField
      placeholder="Request URL"
      fullWidth
      name="url"
      onChange={handleChange}
      value={value}
      style={{ marginBottom: 16 }}
    />
  );
}

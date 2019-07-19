import React from "react";
import TextField from "@material-ui/core/TextField";

export interface RequestUrlFieldProps {
  value: string;
  onChange: (name: string, changeSet: string) => void;
}

export default function RequestUrlField({
  value,
  onChange
}: RequestUrlFieldProps) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      const { value } = event.target;

      onChange("url", value);
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

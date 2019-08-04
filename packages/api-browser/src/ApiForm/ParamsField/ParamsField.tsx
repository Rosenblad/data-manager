import React from "react";
import Grid from "@material-ui/core/Grid";

import { OnChange } from "../types";

import { ChangeSet, ParamsFieldValue } from "./types";
import TextField from "./TextField";
import DeleteButton from "./DeleteButton";

export interface ParamsFieldProps {
  name: string;
  value: ParamsFieldValue;
  onChange: OnChange;
  onClickDelete: (key: string) => void;
}

export default React.memo(function ParamsField({
  name,
  value,
  onChange,
  onClickDelete
}: ParamsFieldProps) {
  const handleChange = React.useCallback(
    ({ key, value }: ChangeSet) => {
      onChange({ key: `${name}.${key}`, value });
    },
    [name, onChange]
  );

  const handleDelete = React.useCallback(() => {
    onClickDelete(name);
  }, [onClickDelete, name]);

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <TextField
          name="key"
          placeholder="key"
          value={value.key}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs>
        <TextField
          name="value"
          placeholder="value"
          value={value.value}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <DeleteButton onClick={handleDelete} />
      </Grid>
    </Grid>
  );
});

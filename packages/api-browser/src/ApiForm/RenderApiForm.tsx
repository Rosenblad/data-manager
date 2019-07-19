import React from "react";

import ParamsField from "./ParamsField";
import RequestUrlField from './RequestUrlField';
import { OnChange, ApiFormValues } from './types';

export interface IRenderFormProps {
  values: ApiFormValues;
  onSubmit: () => void;
  onChange: OnChange;
  onDelete: (name: string) => void;
  onAdd: () => void;
}

export default function RenderForm({
  values,
  onDelete,
  onChange,
}: IRenderFormProps) {
  return (
    <div>
      <RequestUrlField value={values.url} onChange={onChange} />
      {Object.entries(values.params).map(([key, value]) => (
        <ParamsField
          key={key}
          name={key}
          value={value}
          onChange={onChange}
          onClickDelete={onDelete}
        />
      ))}
    </div>
  );
}

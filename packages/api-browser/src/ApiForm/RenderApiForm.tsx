import React from "react";

import ParamsField from "./ParamsField";
import RequestUrlField from './RequestUrlField';
import { OnChange, ApiBrowserValues } from './types';

export interface IRenderFormProps {
  values: ApiBrowserValues;
  onSubmit: () => void;
  onChange: OnChange;
  onDelete: (name: string) => void;
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
          name={`params[${key}]`}
          value={value}
          onChange={onChange}
          onClickDelete={onDelete}
        />
      ))}
    </div>
  );
}

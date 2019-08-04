import React from "react";
import ApiBrowser, { ApiBrowserValues } from "@data-manager/api-browser";

export default function ApiBrowserExample() {
  const [values, setValues] = React.useState<ApiBrowserValues>();

  console.log('values:', values);

  const handleSubmit = React.useCallback((nextValues: ApiBrowserValues) => {
    setValues(nextValues);
  }, []);

  return <ApiBrowser onSubmit={handleSubmit} />;
}

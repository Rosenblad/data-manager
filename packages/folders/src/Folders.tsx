import React from "react";
import Documents, { IDocumentsProps } from "./Documents";
import { CssBaseline } from "@material-ui/core";

export default function Folders({ onDelete, items }: IDocumentsProps) {
  return (
    <>
      <CssBaseline />
      <Documents onDelete={onDelete} items={items} />
    </>
  );
}

import React from "react";
import Grid from "@material-ui/core/Grid";

import Document, { IDocumentProps } from "./Document";

export interface IDocumentsProps {
  items?: IDocumentProps[];
  onDelete?: (id: string) => void;
}

export default React.memo(function Documents({
  onDelete,
  items = []
}: IDocumentsProps) {
  return (
    <Grid container spacing={1}>
      {items.map(item => (
        <Grid item xs={12} sm={4} lg={3} xl={2} key={item.id}>
          <Document onClickDelete={onDelete} {...item} />
        </Grid>
      ))}
    </Grid>
  );
});

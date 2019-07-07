import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export interface IFolderItemProps {
  id: string;
  url?: string;
  title?: string;
  secondaryTitle?: string;
  image?: string;
  meta?: {
    key: string;
    value: string;
  }[];
  onClickDelete?(id: string): void;
}

export default React.memo(function FolderItem({
  id,
  image,
  title,
  secondaryTitle,
  onClickDelete,
  meta,
}: IFolderItemProps) {
  return (
    <Card id={id}>
      <CardHeader title={title} subheader={secondaryTitle} />
      {image && <CardMedia image={image} title="Image" />}
      <CardContent>
        {meta && meta.map(m => (
          <Grid container key={m.key}>
            <Grid item>
              <Typography>{m.key}</Typography>
            </Grid>
            <Grid item>
              <Typography>{m.value}</Typography>
            </Grid>
          </Grid>
        ))}
      </CardContent>
      <CardActions>
        {onClickDelete && (
          <IconButton onClick={() => onClickDelete(id)} title="Delete">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
});

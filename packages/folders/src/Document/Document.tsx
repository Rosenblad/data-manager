import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "100%"
  }
});

export interface IDocumentProps {
  id: string;
  url?: string;
  title?: string;
  secondaryTitle?: string;
  image?: string;
  description?: string;
  avatar?: string;
  meta?: {
    key: string;
    value: string;
  }[];
  onClickDelete?(id: string): void;
}

export default React.memo(function Document({
  id,
  image,
  title,
  secondaryTitle,
  onClickDelete,
  meta,
  description,
  avatar
}: IDocumentProps) {
  const classes = useStyles();

  const hasActions = !!onClickDelete;
  const hasContent = meta !== undefined || description !== undefined;

  return (
    <Card id={id}>
      <CardHeader
        avatar={avatar && <Avatar alt="avatar" src={avatar} />}
        title={title}
        subheader={secondaryTitle}
      />
      {image && (
        <CardMedia className={classes.media} image={image} title="Image" />
      )}
      {hasContent && (
        <CardContent>
          {description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          )}
          {meta &&
            meta.map(m => (
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
      )}
      {hasActions && (
        <CardActions>
          {onClickDelete && (
            <IconButton onClick={() => onClickDelete(id)} title="Delete">
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
});

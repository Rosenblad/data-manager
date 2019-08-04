import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/api-browser">
          Api Browser
        </Button>
        <Button>Folders</Button>
      </Toolbar>
    </AppBar>
  );
}

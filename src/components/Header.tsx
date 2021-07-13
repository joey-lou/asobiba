import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      minHeight: "8vh",
    },
    breadcrumb: {
      color: "inherit",
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const [pathnames, setPathnames] = useState(["/"]);
  useEffect(() => {
    setPathnames(window.location.pathname.split("/").filter((x) => x));
  }, [window.location]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            {pathnames.map((name, idx) => {
              return (
                <Link className={classes.breadcrumb}>{name.toLowerCase()}</Link>
              );
            })}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

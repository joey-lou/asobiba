import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link as RouterLink } from "react-router-dom";
import Link, { LinkProps } from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Route } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import { capitalizeFirstLetter } from "./utils";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}
interface ListItemLinkProps extends LinkProps {
  to: string;
  open?: boolean;
}

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
    lists: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(1),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const getName = (name: string) => {
  const nameArray = name.split("/");
  return capitalizeFirstLetter(nameArray[nameArray.length - 1]);
};

function ListItemLink(props: Omit<ListItemLinkProps, "ref">) {
  const { to, open, ...other } = props;
  const primary = getName(to);

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon />
          </Button>
          <Route>
            {({ location }) => {
              const pathnames = location.pathname.split("/").filter((x) => x);
              return (
                <Breadcrumbs aria-label="breadcrumb">
                  <LinkRouter color="inherit" to="/">
                    Home
                  </LinkRouter>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return last ? (
                      <LinkRouter color="textPrimary" key={to} to={to}>
                        {value}
                      </LinkRouter>
                    ) : (
                      <LinkRouter color="inherit" to={to} key={to}>
                        {value}
                      </LinkRouter>
                    );
                  })}
                </Breadcrumbs>
              );
            }}
          </Route>
        </Toolbar>
      </AppBar>
      {/* /* move drawer out into separate component */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <nav className={classes.lists} aria-label="routes">
          <List>
            <ListItemLink to="/games" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/games/snake" className={classes.nested} />
              </List>
            </Collapse>
            <ListItemLink to="/tools" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink
                  to="/tools/calculator"
                  className={classes.nested}
                />
              </List>
            </Collapse>
          </List>
        </nav>
      </Drawer>
    </div>
  );
}

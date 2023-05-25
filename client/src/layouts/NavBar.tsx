import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import React from "react";

interface DrawerProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const TemporaryDrawer: React.FC<DrawerProps> = ({
  toggleTheme,
  currentTheme,
}) => {
  const [state, setState] = useState<{ [key: string]: boolean }>({
    left: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState((prevState) => ({ ...prevState, [anchor]: open }));
  };

  // Här lägger vi in sidor/länkar som sätter sig i hamburger menyn/drawern
  const listItems = [{ text: "Hem", icon: <HomeIcon />, to: "/" }];

  const renderListItem = ({
    text,
    icon,
    to,
  }: {
    text: string;
    icon: React.ReactNode;
    to: string;
  }) => (
    <ListItem key={text} disablePadding>
      <ListItemButton sx={{ width: "100%" }} component={NavLink} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );

  const renderList = (anchor: string) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>{listItems.map(renderListItem)}</List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <h3>BRF BASTU</h3>
          <Drawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawer("left", false)}
          >
            {renderList("left")}
          </Drawer>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={toggleTheme}>
            {currentTheme === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TemporaryDrawer;

import { useState } from "react";
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

// eslint-disable-next-line react/prop-types
const TemporaryDrawer = ({ toggleTheme, currentTheme }) => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState((prevState) => ({ ...prevState, [anchor]: open }));
  };

  const listItems = [{ text: "Hem", icon: <HomeIcon />, to: "/" }];

  const renderListItem = ({ text, icon, to }) => (
    <ListItem key={text} disablePadding>
      <ListItemButton sx={{ width: "100%" }} component={NavLink} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );

  const renderList = (anchor) => (
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
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(newValue) => setValue(newValue)}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
      }}
      elevation={3}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Hem"
        icon={<HomeIcon />}
      />
    </BottomNavigation>
  );
}
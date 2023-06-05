import { Box, AppBar, IconButton, Toolbar, Grid } from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

// eslint-disable-next-line react/prop-types
const TemporaryDrawer = ({ toggleTheme, currentTheme }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="center">
            <Grid item>
              <ThemeProvider theme={theme}>
                {/* Responsive size */}
                <Typography variant="h4">BRF BASTU</Typography>
                </ThemeProvider>

            </Grid>
          </Grid>

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

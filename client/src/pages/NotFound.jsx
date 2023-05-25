import { Box, Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <Grid margin={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "50vh",
        }}
      >
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Page not found!
        </Typography>
        <Grid margin={2}>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button
              color="success"
              size="large"
              variant="contained"
              sx={{ fontWeight: "bold" }}
            >
              Back Home
            </Button>
          </NavLink>
        </Grid>
      </Box>
    </Grid>
  );
}

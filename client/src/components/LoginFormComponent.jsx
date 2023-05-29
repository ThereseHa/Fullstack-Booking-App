import { TextField, Stack, Button, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
function LoginFormComponent(){
    return (
        <>
        <form>
      <Box
        sx={{
          width: 300,
          height: 400,
          border: "solid 1.6px",
          borderRadius: "9px",boxShadow: '0px 3px 3px rgba(83, 83, 86, 0.2)',
          textAlign: 'center'}}
      >
        <Typography sx={{ margin: "1.3em" }} variant="h5">
          Logga in
        </Typography>
        <Box sx={{ marginTop: "4em", marginLeft: "1em", marginRight: "1em" }}>
          <Stack>
            <TextField
              size="small"
              x={{ backgroundColor: "white" }}
              id="outlined-basic1"
              label="Epost"
              variant="outlined"
              type="email"
              name="email"
            />
            <TextField
              size="small"
              sx={{ marginTop: "1em"}}
              id="outlined-basic2"
              label="Lösenord"
              variant="outlined"
              type="password"
              name="password"
            />
            <Typography sx={{ marginTop: "1em" }}>
              Skapa konto
            </Typography>
            <Button
              sx={{ marginTop: "2em", marginLeft: "3em", marginRight: "3em" }}
              variant="contained"
            >
              Logga in
            </Button>
          </Stack>
        </Box>
      </Box>
      </form>
    </>
    )
}

export default LoginFormComponent;
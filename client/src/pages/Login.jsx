import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LoginFormComponent from "../components/LoginFormComponent";

function Login() {
  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="6vh"
        height="70vh"
      >
        <LoginFormComponent />
      </Box>
    </>
  );
}

export default Login;

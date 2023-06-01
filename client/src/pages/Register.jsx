import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AccountFormComponent from '../components/AccountFormComponent'

function Register() {

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
        <AccountFormComponent />
    </Box>
    </>
  );
}

export default Register;

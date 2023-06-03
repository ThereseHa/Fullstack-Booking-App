import Box from '@mui/material/Box';
import AccountFormComponent from '../components/AccountFormComponent'

function Register() {

  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="6vh"
        height="70vh"
    >
        <AccountFormComponent />
    </Box>
  );
}

export default Register;

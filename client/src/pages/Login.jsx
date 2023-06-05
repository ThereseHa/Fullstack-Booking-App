import Box from '@mui/material/Box';
import LoginFormComponent from '../components/LoginFormComponent';
import { useTheme } from '@mui/material/styles';

function Login() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop="8em"
    >
        <Box marginBottom="20px">
        {isDarkMode ? (
        <img src="sauna-icon-1.png" alt="Dark Image" height="80" />
      ) : (
        <img src="sauna-icon-2.png" alt="Light Image" height="80" />
      )}
        </Box>
        <LoginFormComponent />
    </Box>
  );
}

export default Login;

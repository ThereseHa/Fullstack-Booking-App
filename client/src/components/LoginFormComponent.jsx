import { TextField, Stack, Button, Box, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function LoginFormComponent(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //login
    const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8800/login', { email, password });

      if (response.status === 200) {

        //Gets user ID from response data
        const userIdRes = response.data.userId;
        //Saves it in localStorage
         localStorage.setItem('userId', userIdRes)

        //Get the stored user id from localStorage
        //  localStorage.getItem('userId')
        const userID = localStorage.getItem('userId')
        console.log(userID)

        // Login successful, navigate to home page
        localStorage.setItem('isAuth', 'true');
        console.log('logged in')
        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
              id="outlined-basic1"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
        onChange={(e) => setPassword(e.target.value)}
            />
            <Typography sx={{ marginTop: "1em" }}>
               <Link to="/register">Registrera konto</Link>
            </Typography>
            <Button
              sx={{ marginTop: "2em", marginLeft: "3em", marginRight: "3em" }}
              variant="contained" onClick={handleLogin}>
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

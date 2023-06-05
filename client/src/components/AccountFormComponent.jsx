import { useState } from "react";
import axios from "axios";
import { TextField, Stack, Button, Box, Typography} from "@mui/material";
import Alert from '@mui/material/Alert';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';
import styled from "styled-components"

// styles
const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1.5rem;
    font-weight: 600;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`

function AccountFormComponenet(){
    //States
    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        email: "",
        password: ""
    })
    const [success, setSuccess] = useState(false)
    const [require, setRequire] = useState(false)
    // Initialize an additional state variable for tracking the current alert type
    const [alertType, setAlertType] = useState(null);

    const navigate = useNavigate()

    //Registrera

    //Tar in från input..
    const handleChange = (e) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    //... och skapar en POST
    const handleClick = async (e) => {
    e.preventDefault()

    try {
            const response = await axios.post("http://localhost:8800/register", user);

            if (response.status === 201) {
                setAlertType("success");
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } else if (response.status === 400) {
                setAlertType("require");
                setRequire(true);
            }
        } catch (error) {
        setAlertType("require");
        setRequire(true);
        }
    }

    return (
      <form>
      <Box
        sx={{
          width: 300,
          height: success || require ? 550 : 500,
          border: "solid 1.6px",
          borderRadius: "9px",boxShadow: '0px 3px 3px rgba(83, 83, 86, 0.2)',
          textAlign: 'center'}}
      >
        <Typography sx={{ margin: "1.3em" }} variant="h5">
          Skapa konto
        </Typography>
        <Box sx={{  marginLeft: "1em", marginRight: "1em" }}>
          <Stack>
              {/* Förnamn */}
            <TextField
              size="small"
              id="outlined-basic1"
              label="Förnamn"
              variant="outlined"
              type="input"
              name="FirstName"
              onChange={handleChange}
            />
           {/* Efternam */}
            <TextField
              size="small"
              sx={{ marginTop: "1em" }}
              id="outlined-basic2"
              label="Efternamn"
              variant="outlined"
              type="input"
              name="LastName"
              onChange={handleChange}
            />
           {/* Epost */}
            <TextField
              size="small"
              sx={{ marginTop: "1em" }}
              id="outlined-basic3"
              label="Epost"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleChange}
            />
            {/* Lösenord1 */}
            <TextField
              size="small"
              sx={{ marginTop: "1em"}}
              id="outlined-basic4"
              label="Lösenord"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Typography sx={{ marginTop: "1.5em" }}>
              <Link to="/login" component={RouterLink}>Jag har redan ett konto</Link>
            </Typography>
            {/* Knappen */}
            <Button
              sx={{ marginTop: "2em", marginLeft: "3em", marginRight: "3em", marginBottom: "2em" }}
              variant="contained" size="large"
              onClick={handleClick}
            >
              Skapa konto
            </Button>
            {/* Alerts - meddelanden */}
            {alertType === "require" && (
            <Alert severity="warning">
                Vänligen fyll i alla fält
            </Alert>
            )}
            {alertType === "success" && (
            <Alert severity="success">
                Konto skapat. omdirigerar<Dots></Dots>
            </Alert>
            )}
          </Stack>
        </Box>
      </Box>
      </form>
    )
}

export default AccountFormComponenet;

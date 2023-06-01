import { useState } from "react";
import axios from "axios";
import { TextField, Stack, Button, Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";

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
    const [error, setError] = useState(false)

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
                setSuccess(true)
            } else if (response.status === 400) {
                setRequire(true)
            }
        } catch (error) {
        setError(true)
        console.error('Error:', error);
        }
    }
    
    return (
      <form>
      <Box
        sx={{
          width: 300,
          height: 500,
          border: "solid 1.6px",
          borderRadius: "9px",boxShadow: '0px 3px 3px rgba(83, 83, 86, 0.2)',
          textAlign: 'center'}}
      >
        <Typography sx={{ margin: "1.3em" }} variant="h5">
          Skapa konto
        </Typography>
        <Box sx={{ marginTop: "2em", marginLeft: "1em", marginRight: "1em" }}>
          <Stack>
              {/* Förnamn */}
            <TextField
              size="small"
              sx={{ marginTop: '1em' }}
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
              <Link to="/login">Jag har redan ett konto</Link>
            </Typography>
            {/* Knappen */}
            <Button
              sx={{ marginTop: "2em", marginLeft: "3em", marginRight: "3em" }}
              variant="contained"
              onClick={handleClick}
            >
              Skapa konto
            </Button>
            {/* Meddelanden */}
            {require && <p>Vänlig fyll i alla fält</p>}
            {success && <p>Konto skapat</p>}
            {error && <p>Något gick fel</p>}
          </Stack>
        </Box>
      </Box>
      </form>
    )
}

export default AccountFormComponenet;

import { TextField, Stack, Button, Box, Typography} from "@mui/material";

function AccountFormComponenet(){
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
              sx={{ backgroundColor: "white", marginTop: '1em' }}
              id="outlined-basic1"
              label="Förnamn"
              variant="outlined"
              type="input"
              name="FirstName"
            />
           {/* Efternam */}
            <TextField
              size="small"
              sx={{ backgroundColor: "white", marginTop: "1em" }}
              id="outlined-basic1"
              label="Efternamn"
              variant="outlined"
              type="input"
              name="LastName"
            />
           {/* Epost */}
            <TextField
              size="small"
              sx={{ backgroundColor: "white",  marginTop: "2em" }}
              id="outlined-basic1"
              label="Epost"
              variant="outlined"
              type="email"
              name="email"
            />
            {/* Lösenord1 */}
            <TextField
              size="small"
              sx={{ marginTop: "1em"}}
              id="outlined-basic2"
              label="Lösenord"
              variant="outlined"
              type="password"
              name="password"
            />
            <Typography sx={{ marginTop: "1.5em" }}>
              Jag har redan ett konto 
            </Typography>
            {/* Knappen */}
            <Button
              sx={{ marginTop: "2em", marginLeft: "3em", marginRight: "3em" }}
              variant="contained"
            >
              Skapa konto
            </Button>
          </Stack>
        </Box>
      </Box>
      </form>
    )
}

export default AccountFormComponenet;
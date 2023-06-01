import { TextField, Stack, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function ContactFormComponent() {
  const [success, setSuccess] = useState(false);

  // POST
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.message !== "") {
      axios
        .post("http://localhost:8800/contact", formData)
        .then(() => {
          setSuccess(true);
        })
        .catch(() => {});
    } else {
      alert("Du måste fylla i rutan");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 300,
            height: 400,
            border: "solid 1.6px",
            borderRadius: "9px",
            boxShadow: "0px 3px 3px rgba(83, 83, 86, 0.2)",
            textAlign: "center",
            marginTop: "3em",
          }}
        >
          <Typography sx={{ margin: "1.3em" }} variant="h5">
            Kontaktformulär
          </Typography>
          <Box sx={{ marginTop: "3em", marginLeft: "1em", marginRight: "1em" }}>
            <Stack>
              <TextField
                sx={{ marginTop: "1em" }}
                placeholder=""
                multiline
                rows={3}
                name="message"
                type="input"
                onChange={handleChange}
              />
              <Button
                sx={{ marginTop: "3em", marginLeft: "3em", marginRight: "3em" }}
                variant="contained"
                type="submit"
              >
                Skicka
              </Button>
            </Stack>
            <Typography sx={{ marginTop: "2em" }}>
              {success && <Typography>Ditt meddelande har skickats</Typography>}
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default ContactFormComponent;

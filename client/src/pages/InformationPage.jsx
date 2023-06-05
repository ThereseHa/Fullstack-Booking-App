import ContactFormComponent from "../components/ContactFormComponent";
import { Box, Stack, Typography } from "@mui/material";
import InformationTextComponent from "../components/InformationTextComoponent";

function InformationPage() {
  return (
   
      <Box p={2} sx={{ textAlign: "center" }}>
        <Box sx={{ justifyContent: "center" }}>
        <Typography variant="h4">Felanmälan</Typography>
          <InformationTextComponent />
          <ContactFormComponent />
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontWeight: "550", marginTop: "3em", marginRight: "0.4em" }}
            >
              Kontaktinformation
            </Typography>
            <Typography sx={{ marginTop: "0.4em", marginRight: "5.2em" }}>
              Tele: 07033665
            </Typography>
            <Typography sx={{ marginRight: "1em" }}>
              Epost: brfbastu@info.se
            </Typography>
          </Stack>
        </Box>
      </Box>
  );
}

export default InformationPage;

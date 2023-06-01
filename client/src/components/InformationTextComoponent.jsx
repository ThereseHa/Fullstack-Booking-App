import { Box, Stack, Typography } from "@mui/material";

function InformationTextComponent() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3em" }}>
      <Box sx={{ width: "300px", height: "160" }}>
        <Stack>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "550",
              marginRight: "5.2em",
              paddingTop: "0.4em",
            }}
          >
            Information
          </Typography>
          <Typography sx={{ marginLeft: "2em" }}>
            Saknas något eller är något trasigt
          </Typography>
          <Typography sx={{ marginLeft: "0.4em", paddingBottom: "0.5em" }}>
            skriv i formuläret så fixar vi det
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default InformationTextComponent;

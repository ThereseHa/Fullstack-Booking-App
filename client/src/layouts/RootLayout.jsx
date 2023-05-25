import { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  ${({ thememode }) =>
    thememode === "light"}
`;

export default function RootLayout() {
  const [thememode, setThememode] = useState("dark");

  const toggleTheme = () => {
    setThememode(thememode === "light" ? "dark" : "light");
  };

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
      }),
    []
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={thememode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <NavBar toggleTheme={toggleTheme} />
      <Container thememode={thememode}>
        <main style={{ marginTop: "64px", marginBottom: "64px" }}>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
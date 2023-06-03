import { useState, useMemo, useEffect } from "react";
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
`;

export default function RootLayout() {
  const [thememode, setThememode] = useState('');

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

    const setThemePreference = (theme) => {
        localStorage.setItem('theme', theme);
        setThememode(theme);
    };

  // Function to get the initial theme preference
  const getInitialThemePreference = () => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  };

    useEffect(() => {
    const initialThemePreference = getInitialThemePreference();
    setThemePreference(initialThemePreference);
  }, []);

  const toggleTheme = () => {
    const newTheme = thememode === 'light' ? 'dark' : 'light';
    setThemePreference(newTheme);
  };

  return (
    <ThemeProvider theme={thememode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <NavBar toggleTheme={toggleTheme} currentTheme={thememode} />
      <Container thememode={thememode}>
        <main style={{ marginTop: "64px", marginBottom: "64px" }}>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

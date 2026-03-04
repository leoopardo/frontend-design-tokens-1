"use client"
import { useThemeStore } from "@/stores/ThemeStore";
import { Button, Paper, Stack, Typography } from "@mui/material";

export default function Home() {
  const { updateTheme, currentTheme } = useThemeStore()

  const handleSwitchTheme = () => {
    switch (currentTheme) {
      case "dark":
        updateTheme("light")
        break;
    
      default:
        updateTheme("dark")
        break;
    }
  }

  return (
    <Paper sx={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0"}}>
      <Stack>
        <Typography variant="h1">Teste cor do texto</Typography>
        <Button variant="contained" onClick={handleSwitchTheme}>Switch theme</Button>
      </Stack>
      
    </Paper>
  );
}


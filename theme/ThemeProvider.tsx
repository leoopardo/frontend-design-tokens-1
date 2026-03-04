"use client"

import { useThemeStore } from "@/stores/ThemeStore"
import { ThemeProvider, createTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { light, dark } from "@leoopardo/design-tokens"

interface IThemeModeProvider {
  children: React.ReactNode
}

const ThemeModeProvider = ({ children }: IThemeModeProvider) => {
  const { currentTheme } = useThemeStore()
  const theme = currentTheme === "light" ? light : dark
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const customizeTheme = createTheme({
    palette: {
        mode: currentTheme,
        background: theme.bg,
        primary: theme.colors.green,
        common: {black: theme.colors.black, white: theme.colors.white},
        text: {primary: theme.fg.default, secondary: theme.fg.muted},
        secondary: {...theme.colors.pink, main: theme.colors.pink[400]},
        warning: theme.colors.yellow,
        success: theme.colors.green,
        error: theme.colors.red,
        info: theme.colors.blue,
        grey: theme.colors.gray,
    },
    typography: {
        h1: theme.h1,
        h2: theme.h2,
        h3: theme.h3,
        h4: theme.h4,
        h5: theme.h5,
        h6: theme.h6,
        body1: theme.body,
        body2: theme.body
    }

  })

  if (!isMounted) {
    return
  }

  return <ThemeProvider theme={customizeTheme}>{children}</ThemeProvider>
}

export default ThemeModeProvider

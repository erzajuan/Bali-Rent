import React, { useState } from 'react'
import theme from './config/theme'
import AppHeader from './components/AppHeader'
import SideNav from './components/SideNav'
import AppRouter from './router/AppRouter'
import LoginRegisterRouter from './router/LoginRegisterRouter'
import {ThemeProvider, CssBaseline, Box} from "@mui/material"
import { ProSidebarProvider } from 'react-pro-sidebar';
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  return (
      <React.Fragment>
        {
        loginStatus?
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <ProSidebarProvider>
            <AppHeader></AppHeader>
            <Box sx={styles.container}>
                <SideNav></SideNav>
                <Box component={"main"} sx={styles.mainSection}>
                  <AppRouter></AppRouter>
                </Box>
            </Box>
          </ProSidebarProvider>
        </ThemeProvider>
        :
        <LoginRegisterRouter/>
        }
      </React.Fragment>
  )
}

export default App

/** @type {import("@mui/material").SxProps} */

const styles = {
  container:{
    display:"flex",
    bgcolor:'neutral.light',
    height: 'calc(100% - 62px)'
  },
  mainSection:{
    p: 4,
    width: '100%',
    height: '100%',
    overflow: 'auto'
  }
  
}

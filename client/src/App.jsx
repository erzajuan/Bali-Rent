import React, { useEffect, useState } from 'react'
import theme from './config/theme'
import AppHeader from './components/AppHeader'
import SideNav from './components/SideNav'
import AppRouter from './router/AppRouter'
import LoginRegisterRouter from './router/LoginRegisterRouter'
import {ThemeProvider, CssBaseline, Box} from "@mui/material"
import { ProSidebarProvider } from 'react-pro-sidebar';
import './App.css'
import { useNavigate } from 'react-router-dom'
import { detailEmployee } from './fetches/employeeAxios'
import { AppProvider } from './components/GetterValPage'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const handleLoginCb = (result) => {
    setLoginStatus(result)  
  }

  const [employee, setEmployee] = useState([])
  const handleDetailEmployee = (id_employee) => {
      const profileEmployee = detailEmployee(id_employee)
      setEmployee(profileEmployee)
      console.log(employee)
  }

  const navigation = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('access_token')){
      setLoginStatus(true)
      //change path to profile
      navigation('/')
    }
    else{
      setLoginStatus(false)
      navigation('/login')
    }
  },[loginStatus])

  return (
      <React.Fragment>
        {
        loginStatus?
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <ProSidebarProvider>
            <AppProvider>
              <AppHeader handleLoginCb = {handleLoginCb}></AppHeader>
              <Box sx={styles.container}>
                  <SideNav handleDetailEmployee={handleDetailEmployee}></SideNav>
                  <Box component={"main"} sx={styles.mainSection}>
                    <AppRouter employee={employee} handleLoginCb = {handleLoginCb}></AppRouter>
                  </Box>
              </Box>
            </AppProvider>
          </ProSidebarProvider>
        </ThemeProvider>
        :
        <LoginRegisterRouter handleLoginCb = {handleLoginCb}/>
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

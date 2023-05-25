import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginEmployee } from "../../fetches/employeeAxios"

const Login = (props) => {
    const {handleLoginCb} = props
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if(email === ''){
            setEmailError(true)
        }
        if(password === ''){
            setPasswordError(true)
        }
        if(email && password){
            console.log(email, password)
            const loginJSON = {
                login: email,
                password: password
            }
            loginEmployee(loginJSON, handleLoginCb)
            // //change path to profile
            // navigate('/')
        }
    }
    return (
        <>
        <Grid>
            <Paper sx={styles.paperLogin}>
                <Grid align='center'>
                    <Box
                        component={'img'}
                        src="\src\assets\logo.png"
                        sx={styles.appLogo}
                    />
                    <Typography variant="h5" sx={{mb:3, mt:2, color:'#FFEACE'}}>Sign In</Typography>
                </Grid>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    required
                    variant="filled"
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={emailError}
                    sx={{mb:3, mt:1, bgcolor:"white"}}
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    variant="filled"
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={passwordError}
                    sx={{mb:3, bgcolor:"white"}}
                />
                <Button variant="contained" type="submit" sx={{mb:2}}>Login</Button>
            </form>
            <Typography variant="h7" sx={{color:'#FFEACE'}}>Need a account ? </Typography> 
            <Link to='/register' >
                <Typography variant="h7" sx={{color:'#87CEEB'}}> Register here </Typography>
            </Link>
            </Paper>
        </Grid>
        </>
    )
}

export default Login

/** @type {import('@mui/material').SxProps} */
const styles = {
    paperLogin:{
        padding: 10,
        height: '70vh',
        width:300,
        margin:'0 auto',
        backgroundColor: '#8F7158'
    },
    appLogo:{
        borderRadius: 2,
        cursor: 'pointer',
        width: 250,
        ml: 2,
    }
}
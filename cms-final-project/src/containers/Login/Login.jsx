import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
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
        }
    }
    return (
        <>
            <Typography variant="h4">Login Page</Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    required
                    variant="outlined"
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={emailError}
                    sx={{mb:3, mt:1}}
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    variant="outlined"
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={passwordError}
                    sx={{mb:3}}
                />
                <Button variant="outlined" type="submit">Login</Button>
            </form>
            <small>Need a account ? <Link to='/register'>Register here</Link></small>
        </>
    )
}

export default Login
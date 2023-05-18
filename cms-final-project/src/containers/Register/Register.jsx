import {Button, Stack, TextField, Typography} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(firstName, lastName, phoneNum, email, password)
    }

    return(
                <><Typography variant="h4">Profile</Typography><>
                    <form onSubmit={handleSubmit} action={<Link to="/login" />}> 
                        {/* default value must be same from user login profile and taken from profile database */}
                        <Stack spacing={2} direction={"row"} sx={{mb:4, mt:1}}>
                            <TextField
                                label='First Name'
                                type='text'
                                required
                                fullWidth
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                            />
                            <TextField 
                                label='Last Name'
                                type="text"
                                required
                                fullWidth
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </Stack>
                        <TextField
                            label='Phone Number'
                            type="text"
                            required
                            fullWidth
                            sx={{mb:4}}
                            onChange={e => setPhoneNum(e.target.value)}
                            value={phoneNum}
                        />
                        <TextField
                            label='Email'
                            type="email"
                            required
                            fullWidth
                            sx={{mb: 4}}
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <TextField
                            label='Password'
                            type="password"
                            required
                            fullWidth
                            sx={{mb:4}}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button type="button" variant="outlined">Register</Button>
                    </form>
                    <small>Already have an account ? <Link to={'/login'}>Login Here</Link></small>
                </></>
    )
}

export default Register
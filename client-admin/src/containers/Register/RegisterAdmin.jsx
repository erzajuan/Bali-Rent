import {Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerEmployee } from "../../fetches/employeeAxios"
import Swal from "sweetalert2"

const RegisterAdmin = () => {

    const navigation = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [adminNum, setAdminNum] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const formRegister = {
            name: `${firstName} ${lastName}`,
            username: `${firstName}${lastName}`,
            email: email,
            password: password,
            phoneNumber: phoneNum,
            role: 'admin'
        }

        if(adminNum === '54321'){
            registerEmployee(formRegister, (status) => {
                console.log(status)
                if(status){
                    navigation("/login")
                }
        })
        }
        else{
            Swal.fire({
                icon:"error",
                title:"Register Admin is Failed",
                text:"Not Found Admin Number"
            })
        }

        console.log(firstName, lastName, phoneNum, email, password)
    }

    return(
            <Grid>
                <Paper sx={styles.paperLogin}>
                <><Typography variant="h4">Admin Register</Typography><>
                    <form onSubmit={handleSubmit}> 
                        {/* default value must be same from user login profile and taken from profile database */}
                        <Stack spacing={2} direction={"row"} sx={{mb:4, mt:2}}>
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
                        <TextField
                            label='Admin Number'
                            type="text"
                            required
                            fullWidth
                            sx={{mb:4}}
                            onChange={e => setAdminNum(e.target.value)}
                            value={adminNum}
                        />
                        <Button type="submit" variant="outlined" sx={{mb:1}}>Register</Button>
                    </form>
                    <small style={{display:'block'}}>Already have an account ? <Link to={'/login'}>Login Here</Link></small>
                    {/* <small>Register an admin account ? <Link to={'/register'}>Register Renter Here</Link></small> */}
                </></>
                </Paper>
            </Grid>
    )
}

export default RegisterAdmin

/** @type {import('@mui/material').SxProps} */
const styles = {
    paperLogin:{
        padding: 10,
        height: '77vh',
        width:500,
        margin:'0 auto',
        backgroundColor: 'white'
    }
}
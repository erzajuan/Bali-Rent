import {Button, Stack, TextField, Typography} from "@mui/material"
import { useState } from "react"

const Profile = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNume] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return(
        <><Typography variant="h3">Profile</Typography><>
            <form>
                {/* default value must be same from user login profile and taken from profile database */}
                <Stack spacing={2} direction={"row"} sx={{mb:4, mt:1}}>
                    <TextField
                        label='First Name'
                        type='text'
                        required
                        fullWidth
                        defaultValue="Zia" 
                    />
                    <TextField 
                        label='Last Name'
                        type="text"
                        required
                        fullWidth
                        defaultValue="Pratama"
                    />
                </Stack>
                <TextField
                    label='Phone Number'
                    type="text"
                    required
                    fullWidth
                    sx={{mb:4}}
                    defaultValue="081"
                />
                <TextField
                    label='Email'
                    type="email"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    defaultValue="zia@mail.com"
                />
                <TextField
                    label='Password'
                    type="password"
                    required
                    fullWidth
                    sx={{mb:4}}
                    defaultValue="123"
                />
                <Button type="button" variant="outlined">Save</Button>
            </form>
        </></>
        
    )
}

export default Profile
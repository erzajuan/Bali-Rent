import {Box, Button, Stack, Tab, Tabs, TextField, Typography} from "@mui/material"
import { useState } from "react"
import TabPanel from "../../components/TabPanel"

const Profile = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNume] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return(
        <Box sx={{borderBottom: 1, borderColor:'divider'}}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label='Profile' id='tab-0'></Tab>
                <Tab label='Address' id='tab-1'></Tab>
            </Tabs>
            <TabPanel value={value} index={0}>
                <><Typography variant="h4">Profile</Typography><>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h4">Address</Typography>
                <form>
                    <TextField
                        label='Line Address'
                        type="text"
                        required
                        fullWidth
                        sx={{mb: 4}}
                    />
                    <Stack spacing={2} direction={"row"} sx={{mb:4, mt:1}}>
                        <TextField
                            label='RT'
                            type='text'
                            required
                            fullWidth
                        />
                        <TextField
                            label='RW'
                            type='text'
                            required
                            fullWidth
                        />
                    </Stack>
                    <TextField
                            label='Urban Village'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                    />
                    <TextField
                            label='Sub-District'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                    />
                    <TextField
                            label='City'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                    />
                    <TextField
                            label='Zip Code'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                    />
                    <Button type="button" variant="outlined">Save</Button>
                </form>
            </TabPanel>
        </Box>
        
    )
}

export default Profile
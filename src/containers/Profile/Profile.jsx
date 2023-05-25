import {Box, Button, IconButton, InputAdornment, Stack, Tab, Tabs, TextField, Typography} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import TabPanel from "../../components/TabPanel"
import { changePasswordEmployee, detailEmployee, updateEmployee } from "../../fetches/employeeAxios"
import { createRentHouse, detailRentHouse, updateRentHouse } from "../../fetches/renthouseAxios"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../components/GetterValPage"

const Profile = (props) => {
    // Get id for get detail and update
    const {handleLoginCb} = props
    const id_employee = localStorage.getItem('id')
    const navigation = useNavigate()

    // Get data profile
    const [profile, setProfile] = useState({
        firstName:'',
        lastName:'',
        phoneNum:'',
        email:'',
        role:''
    })
    const detail = () => {
        detailEmployee(+id_employee, (response) => {
            console.log('response detail',response)
            const fullName = response.name.split(' ')
            // console.log(fullName.slice(1))
            setProfile({
                firstName:fullName[0],
                lastName:fullName.slice(1).join(' '),
                phoneNum: response.phoneNumber,
                email:response.email,
                role:response.role
            })
        })
    }

    useEffect(() => {
        detail();
    }, []);

    // Prepare update data profile
    const handleUpdateProfileSubmit = (event) => {
        event.preventDefault()

        try{
            const newProfile = {
                name: `${profile.firstName} ${profile.lastName}`,
                username: `${profile.firstName}${profile.lastName}`,
                phoneNumber: profile.phoneNum,
                email: profile.email
            }
            updateEmployee(+id_employee, newProfile)
            
        }
        catch(err){
            console.log(err)
        }  
    }

    // Prepare create address rent house
    const [address, setAddress] = useState({
        lineAddress:'',
        rt:'',
        rw:'',
        urbanVillage:'',
        subDistrict:'',
        city:'',
        zipCode:''
    })
    const handleAddress = (event) => {
        event.preventDefault()

        try{
            // const arrayString = ['aku','adalah']
            // console.log( ['aku','adalah'].join('-'))
            const addressLine = [
                address.lineAddress, address.rt, address.rw, address.urbanVillage,
                address.subDistrict, address.city, address.zipCode
            ].join('-')
            console.log(address)
            console.log(addressLine)

            createRentHouse({address:addressLine}, (haveAddress) => { 
                console.log('haveAddress:',haveAddress)
                const id_address = localStorage.getItem('id_address')
                if(haveAddress){
                    try{
                        updateRentHouse(id_address,{address:addressLine})
                    }
                    catch(err){
                        console.log(err)
                    }
                    
                }
                else{
                    localStorage.clear()
                    handleLoginCb(false)
                    navigation('/login')
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }
    
    
    const detailAdress = () => {
        detailRentHouse(id_employee, (response) => {
            const rentHouseById = response.find((data) => data.employeeId == id_employee)
            const id_address = rentHouseById.id
            localStorage.setItem('id_address',id_address)
            // console.log(rentHouseById)
            const addressParts = rentHouseById.address.split('-')
            setAddress({
                lineAddress:addressParts[0],
                rt:addressParts[1],
                rw:addressParts[2],
                urbanVillage:addressParts[3],
                subDistrict:addressParts[4],
                city:addressParts[5],
                zipCode:addressParts[6]
            })
    })}
    useEffect(() => {
        detailAdress();
    },[])

    // Prepare change password
    const [changePassword, setChangePassword] = useState({
        password: '',
        showPass: false,
        newPassword: '',
        showNewPass: false,
        confirmPassword:'',
        showConfirmPass: false
    })
    const handleChangePasswordSubmit = (event) => {
        event.preventDefault()
        try{
            const changePasswordData = {
                password: changePassword.password,
                newPassword: changePassword.newPassword,
                confirmPassword: changePassword.confirmPassword
            }
            changePasswordEmployee(changePasswordData, (status) => {
                if(status){
                    navigation('/')
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }
    
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
                <Tab label='Change Password' id='tab-2'></Tab>
            </Tabs>
            <TabPanel value={value} index={0}>
                <><Typography variant="h4">Profile</Typography><>
                    <form onSubmit={handleUpdateProfileSubmit}>
                        {/* default value must be same from user login profile and taken from profile database */}
                        <Stack spacing={2} direction={"row"} sx={{mb:4, mt:1}}>
                            <TextField
                                label='First Name'
                                type='text'
                                required
                                fullWidth
                                value={profile.firstName}
                                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                            />
                            <TextField 
                                label='Last Name'
                                type="text"
                                required
                                fullWidth
                                value={profile.lastName}
                                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                            />
                        </Stack>
                        <TextField
                            label='Phone Number'
                            type="text"
                            required
                            fullWidth
                            sx={{mb:4}}
                            value={profile.phoneNum}
                            onChange={(e) => setProfile({...profile, phoneNum: e.target.value})}
                        />
                        <TextField
                            label='Email'
                            type="email"
                            required
                            fullWidth
                            sx={{mb: 4}}
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                        
                        <Button type="submit" variant="outlined">Save</Button>
                    </form>
                </></>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h4" sx={{mb:2}}>Address</Typography>
                <form onSubmit={handleAddress}>
                    <TextField
                        label='Line Address'
                        type="text"
                        required
                        fullWidth
                        sx={{mb: 4}}
                        value={address.lineAddress}
                        onChange={(e) => setAddress({...address, lineAddress: e.target.value})}
                    />
                    <Stack spacing={2} direction={"row"} sx={{mb:4, mt:1}}>
                        <TextField
                            label='RT'
                            type='text'
                            required
                            fullWidth
                            value={address.rt}
                            onChange={(e) => setAddress({...address, rt: e.target.value})}
                        />
                        <TextField
                            label='RW'
                            type='text'
                            required
                            fullWidth
                            value={address.rw}
                            onChange={(e) => setAddress({...address, rw: e.target.value})}
                        />
                    </Stack>
                    <TextField
                            label='Urban Village'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                            value={address.urbanVillage}
                            onChange={(e) => setAddress({...address, urbanVillage: e.target.value})}
                    />
                    <TextField
                            label='Sub-District'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                            value={address.subDistrict}
                            onChange={(e) => setAddress({...address, subDistrict: e.target.value})}
                    />
                    <TextField
                            label='City'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                            value={address.city}
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                    />
                    <TextField
                            label='Zip Code'
                            type='text'
                            required
                            fullWidth
                            sx={{mb: 4}}
                            value={address.zipCode}
                            onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                    />
                    <Button type="submit" variant="outlined">Save</Button>
                </form>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant="h4" sx={{mb:2}}>Change Password</Typography>
                <form onSubmit={handleChangePasswordSubmit}>
                    <TextField 
                        label='Last Password'
                        type={changePassword.showPass ? 'text':'password'}
                        required
                        fullWidth
                        sx={{mb: 4}}
                        value={changePassword.password}
                        onChange={(e) => setChangePassword({...changePassword, password: e.target.value})}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setChangePassword({...changePassword, showPass: !changePassword.showPass})}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {changePassword.showPass ? <VisibilityOff/>:<Visibility/>}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                    <TextField 
                        label='New Password'
                        type={changePassword.showNewPass ? 'text':'password'}
                        required
                        fullWidth
                        sx={{mb: 4}}
                        value={changePassword.newPassword}
                        onChange={(e) => setChangePassword({...changePassword, newPassword: e.target.value})}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setChangePassword({...changePassword, showNewPass: !changePassword.showNewPass})}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {changePassword.showNewPass ? <VisibilityOff/>:<Visibility/>}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                    <TextField 
                        label='Confirm Password'
                        type={changePassword.showConfirmPass ? 'text':'password'}
                        required
                        fullWidth
                        sx={{mb: 4}}
                        value={changePassword.confirmPassword}
                        onChange={(e) => setChangePassword({...changePassword, confirmPassword: e.target.value})}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setChangePassword({...changePassword, showConfirmPass: !changePassword.showConfirmPass})}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {changePassword.showConfirmPass ? <VisibilityOff/>:<Visibility/>}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                    <Button type="submit" variant="outlined">Save</Button>
                </form>

            </TabPanel>
        </Box>
        
    )
}

export default Profile
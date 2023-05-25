import {Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createRentHouse } from "../../fetches/renthouseAxios"

const AddressRegister = () => {

    const navigation = useNavigate()

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

            createRentHouse({address:addressLine}, (result) => {
                if(result !== true){
                    navigation("/login")
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }
    

    return(
            <Grid>
                <Paper sx={styles.paperLogin}>
                <><Typography variant="h4" sx={{mb:2}}>Address</Typography><>
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
                    <Button type="submit" variant="outlined">Register</Button>
                </form>
                    <small>Already have an account ? <Link to={'/login'}>Login Here</Link></small>
                </></>
                </Paper>
            </Grid>
    )
}

export default AddressRegister

/** @type {import('@mui/material').SxProps} */
const styles = {
    paperLogin:{
        padding: 10,
        height: '90vh',
        width:500,
        margin:'0 auto',
        backgroundColor: 'white'
    }
}
import {Button, MenuItem, Select, Stack, TextField, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { createCarRent } from "../../fetches/carAxios"
import { detailCarBrand } from "../../fetches/brandAxios"
const AddCar = () => {
    const [brandNames, setBrandNames] = useState('')
    const detailBrand = () => {
        try{
            detailCarBrand((response) => {
                console.log('mulai ')
                setBrandNames(response)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        detailBrand()
    },[])
    
    const [form, setForm] = useState({
        name:'',
        rentPrice:'',
        plateNumber:'',
        fuelType:'',
        seatCount:'',
        carYear:'',
        brandName:'',
        transmission:'',
        wdType:'',
        status:''
    })
    const [file, setFile] = useState(null)

    const handleSubmit = (event) => {
        try{
            const brandNameDetail = brandNames.find((name) => name.brandName === form.brandName)
            const brandId = brandNameDetail.id
            event.preventDefault()
            const data = new FormData()
            data.append("name", form.name)
            data.append("rentPrice", form.rentPrice)
            data.append("plateNumber", form.plateNumber)
            data.append("fuelType", form.fuelType)
            data.append("seatCount", form.seatCount)
            data.append("carYear", form.carYear)
            data.append("brandId", brandId)
            data.append("transmission", form.transmission)
            data.append("wdType", form.wdType)
            data.append("status", form.status)
            data.append("carImage", file)

            createCarRent(data)
        }
        catch(err){
            console.log(err)
        }
    }


    return(
        <>
        <Typography variant="h4">AddCar</Typography>
        <form onSubmit={handleSubmit}>
            <Typography sx={{mt:2}}>Upload Image Car</Typography>
            <TextField
                type="file"
                name="upload image car"
                required
                fullWidth
                sx={{mb:4}}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <TextField
                label="Name Car"
                type="text"
                required
                fullWidth
                sx={{mb:4}}
                onChange={(e) => setForm({...form, name:e.target.value})}
                // value={form.name}
            />
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Seat Count"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, seatCount:e.target.value})}
                    // value={form.seatCount}
                />
                <TextField 
                    label="Fuel Type"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, fuelType:e.target.value})}
                    // value={form.fuelType}
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Car Year"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, carYear:e.target.value})}
                    // value={form.carYear}
                />
                <TextField 
                    label="Transmission"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, transmission:e.target.value})}
                    // value={form.transmission}
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Brand"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, brandName:e.target.value})}
                    // value={form.brandId}
                />
                <TextField 
                    label="Wd Type"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, wdType:e.target.value})}
                    // value={form.wdType}
                />
            </Stack>
            <TextField 
                    label="Plate Number"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    onChange={(e) => setForm({...form, plateNumber:e.target.value})}
                    // value={form.plateNumber}
            />
            <TextField 
                    label="Rent Price"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    onChange={(e) => setForm({...form, rentPrice:e.target.value})}
                    // value={form.rentPrice}
            />
            <TextField 
                    label="Status"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    onChange={(e) => setForm({...form, status:e.target.value})}
                    // value={form.status}
            />
            <Button type="submit" variant="outlined">Save</Button>
        </form>
        </>
    )
}

export default AddCar
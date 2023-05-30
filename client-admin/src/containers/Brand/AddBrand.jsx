import {Button, MenuItem, Select, Stack, TextField, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { createCarRent } from "../../fetches/carAxios"
import { createCarBrand, detailCarBrand } from "../../fetches/brandAxios"

const AddBrand = () => {
    const [form, setForm] = useState({
        brandName:''            
    })
    const [file, setFile] = useState(null)

    const handleSubmit = (event) => {
        try{
            event.preventDefault()
            const data = new FormData()
            data.append('brandName', form.brandName)
            data.append('brandImage', file)

            createCarBrand(data)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Typography variant="h4">Add Brand</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="file"
                    name="upload image brand"
                    required
                    fullWidth
                    sx={{mb:4}}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <TextField
                    label="Name Brand"
                    type="text"
                    required
                    fullWidth
                    sx={{mb:4}}
                    onChange={(e) => setForm({...form, brandName:e.target.value})}
                    // value={form.brandName}
                />
                <Button type="submit" variant="outlined">Save</Button>
            </form>
        </>
        
    )
}

export default AddBrand
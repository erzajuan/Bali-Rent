import {Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { detailCarBrand, updateCarBrand } from "../../fetches/brandAxios"

const EditBrand = (props) => {
    const navigation = useNavigate()

    const {idBrand, handleShowEditBrand} = props
    const [form, setForm] = useState({
        brandName:''            
    })
    const [file, setFile] = useState(null)

    const detailBrand = () => {
        try{
            detailCarBrand((response) => {
                const brandById = response.find((data) => data.id === +idBrand)
                console.log('idBrand:',idBrand)
                console.log('brand car:',brandById)
                setForm({
                    brandName:brandById.brandName
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }

    console.log('form brand edit:',form)

    useEffect(() => {
        detailBrand()
    },[])

    const handleSubmit = (event) => {
        try{
            event.preventDefault()
            const data = new FormData()
            data.append('brandName', form.brandName)
            data.append('brandImage', file)

            updateCarBrand(idBrand, data, (response) => {
                handleShowEditBrand(idBrand, false)
                navigation('/showbrands')
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Typography variant="h4">Edit Brand</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="file"
                    name="upload image brand"
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
                    value={form.brandName}
                />
                <Button type="submit" variant="outlined">Save</Button>
                <Button type="button" variant="outlined" sx={{ml:'10px'}} color='warning' onClick={() => handleShowEditBrand(idBrand, false)}>Back</Button>
            </form>
         </>

    )
}

export default EditBrand
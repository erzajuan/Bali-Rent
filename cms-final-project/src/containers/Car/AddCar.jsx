import {Button, Stack, TextField, Typography} from "@mui/material"
const AddCar = () => {
    return(
        <>
        <Typography variant="h4">AddCar</Typography>
        <form>
            <Typography>Upload Image Car</Typography>
            <TextField
                type="file"
                name="upload image car"
                required
                fullWidth
                sx={{mb:4}}
            />
            <TextField
                label="Name Car"
                type="text"
                required
                fullWidth
                sx={{mb:4}}
            />
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Seat Count"
                    type="text"
                    required
                    fullWidth
                />
                <TextField 
                    label="Fuel Type"
                    type="text"
                    required
                    fullWidth
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Car Year"
                    type="text"
                    required
                    fullWidth
                />
                <TextField 
                    label="Transmission"
                    type="text"
                    required
                    fullWidth
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Brand"
                    type="text"
                    required
                    fullWidth
                />
                <TextField 
                    label="Wd Type"
                    type="text"
                    required
                    fullWidth
                />
            </Stack>
            <TextField 
                    label="Plate Number"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
            />
            <TextField 
                    label="Rent Price"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
            />
            <TextField 
                    label="Status Available"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
            />
            <Button type="button" variant="outlined">Save</Button>
        </form>
        </>
    )
}

export default AddCar
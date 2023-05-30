import {Box, Button, MenuItem, Select, Stack, TextField, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { createCarRent } from "../../fetches/carAxios"
import { detailCarBrand } from "../../fetches/brandAxios"
import { DataGrid } from "@mui/x-data-grid"
import EditBrand from "./EditBrand"

const ShowBrands = () => {
    const getRowId = (row) => row.rowIndex
    const getRowIdx = (params) => params.rowIndex + 1

    const [brands, SetBrands] = useState([])
    const rows = brands.map((brand, index) => ({...brand, rowIndex: index+1}))

    const getAllBrand = () => {
        try{
            detailCarBrand((response) => {
                SetBrands(response)
                console.log('response brand:', response)                
            })
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getAllBrand()
    },[])

    const [filterValue, setFilterValue] = useState('')
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value)
    }

    const filteredRows = rows.filter((row) => {
        const combinedValues = `${row.brandName}`

        if(combinedValues.toLowerCase().includes(filterValue.toLowerCase())){
            return true
        }

        return false
    })

    const columns = [
        {
            field: 'rowIndex',
            headerName: 'No.',
            width: 65
        },
        {
            field: 'idBrand',
            headerName: 'Id Brand',
            width: 100,
            renderCell: (params) => params.row.id
        },
        {
            field: 'imageBrand',
            headerName: 'Image Brand',
            width: 120,
            renderCell: (params) => <Box sx={styles.videoColumn}>
                <Box
                    component={'img'}
                    sx={styles.videoThumbnail}
                    src={params.row.brandImage}
                />

            </Box>
        },
        {
            field: 'nameBrand',
            headerName: 'Name Brand',
            width: 130,
            renderCell: (params) => params.row.brandName
        },
        {
            field: 'id',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => <Box>
                <Button variant="outlined" sx={{mr: 1}} onClick={() => handleShowEditBrand(params.row.id, true)}>
                    Edit
                </Button>
            </Box>
        },
    ]

    //Show edit request
    const [showEditBrand, setShowEditBrand] = useState(false)
    const [idBrand, setIdBrand] = useState('')
    const handleShowEditBrand = (id, result) => {
        setShowEditBrand(result)
        setIdBrand(id)
    }


    return(
        <>
            {
            showEditBrand?
            <EditBrand idBrand={idBrand} handleShowEditBrand={handleShowEditBrand} />:
            <Box>
                <Typography sx={styles.pageTitle} variant="h5">Show Brand</Typography>
                <TextField
                        label='Search'
                        value={filterValue}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        style={{marginBottom:10}}                
                />
                <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[25]}
                        autoHeight
                        rowHeight={70}
                        getRowId={getRowId}
                        getRowIdx={getRowIdx}
                        pagination={true}
                        pageSizeOptions={[10,25,50,100]}
                        style={{width:'600px', margin:'0 auto'}}
                    />
            </Box>
            }
        </>
    )
}

export default ShowBrands

/** @type {import("@mui/material").SxProps} */
const styles = {
    pageTitle:{
        mb:2
    },
    videoColumn:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    videoThumbnail:{
        width: 45        
    },
    carDetails:{
        ml:2,
    },
    carTitle:{
        fontSize:'0.8rem',
        width: 498,
        textOverflow:'ellipsis',
        whiteSPace:'nowrap',
        overflow:'hidden'
    },
    carDescription:{
        fontSize:'0.7rem',
        color:'neutral.normal',
        width: 490,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'

    }
}
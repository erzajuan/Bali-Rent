import {Box, Button, TextField, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { deleteCarRent, detailCarRent } from "../../fetches/carAxios"
import EditCar from "./EditCar"

const ShowCars = () => {
    const getRowId = (row) => row.rowIndex
    const getRowIdx = (params) => params.rowIndex + 1

    const [cars, setCars] = useState([])
    const detailCars = () => {
        try{
            detailCarRent((response) => {
                setCars(response)
                console.log('response cars rent:',response)
        })
        const idAddress = localStorage.getItem('id_address')
        console.log(idAddress)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        detailCars();
        // const interval = setInterval(detailCars, 1000)
        // return () => {
        //     clearInterval(interval)
        // }
    },[])

    const [renters, SetRenters] = useState([])

    const getAllRenter = () => {
        try{
            getAllEmployee((response) => {
                const allRenter = response.filter((data) => data.role !== 'admin')
                SetRenters(allRenter)
                // console.log('All Renter:',allRenter)
                // console.log('Length:',allRenter.length)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getAllRenter()
    },[])

    const rows = cars.map((car, index) => ({...car, rowIndex: index+1}))

    const [filterValue, setFilterValue] = useState('')
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value)
    }

    const filteredRows = rows.filter((row) => {
        let combinedValues
        try{
            combinedValues = `${row.id} ${row.username} ${row.name} 
            ${row.transmission} ${row.carYear} ${row.rentHouse.employeeId} ${row.status}
            ${row.brand.brandName} ${row.seatCount} ${row.fuelType} ${row.wdType} ${row.plateNumber}
            `

        }
        catch(err){
            combinedValues = `${row.id} ${row.username} ${row.name} 
            ${row.transmission} ${row.carYear} Not Found ${row.status}
            ${row.brand.brandName} ${row.seatCount} ${row.fuelType} ${row.wdType} ${row.plateNumber}
            `
        }
        

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
            field: 'idCar',
            headerName: 'Id Car',
            width: 65,
            renderCell: (params) => params.row.id
        },
        {
            field: 'idEmployee',
            headerName: 'Id Renter',
            width: 90,
            renderCell: (params) => params.row.rentHouse !== null ? params.row.rentHouse.employeeId:'Not Found'
        },
        {
            field: 'carImage',
            headerName: 'Car',
            minWidth: 350,
            renderCell: (params) => <Box sx={styles.videoColumn}>
                <Box
                    component={'img'}
                    sx={styles.videoThumbnail}
                    src={params.row.carImage}
                />
                <Box sx={styles.carDetails}>
                    <Typography sx={styles.carTitle}>{params.row.name}</Typography>
                    <Typography sx={styles.carDescription}>
                        {params.row.transmission} | {params.row.carYear} | {params.row.status}
                    </Typography>
                </Box>
            </Box>
        },
        {
            field: 'rentPrice',
            headerName: 'Rent Price',
            minWidth: 150,
            flex: 1
    
        },
        {
            field: 'brandId',
            headerName: 'Brand',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => params.row.brand.brandName
    
        },
        {
            field: 'seatCount',
            headerName: 'Seat Count',
            minWidth: 120,
            flex: 1
        },
        {
            field: 'fuelType',
            headerName: 'Fuel Type',
            minWidth: 150,
            flex: 1
        },
        {
            field: 'wdType',
            headerName: 'Weel Drive Type',
            minWidth: 150,
            flex: 1
        },
        {
            field: 'plateNumber',
            headerName: 'Plate Num',
            minWidth: 150,
            flex:1
        },
        {   
            field: 'id',
            headerName: 'Action',
            minWidth: 300,
            renderCell: (params) => <Box>
                <Box>
                    <Button variant="outlined" color="warning" onClick={() => deleteCarRent(params.row.id)}>
                        Delete
                    </Button>
                </Box>
    
            </Box>
        }
    
    ]
    return(
        <Box>
            <Typography sx={styles.pageTitle} variant="h5">Show Cars</Typography>
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
            />
            
        </Box>
    )
}

export default ShowCars

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
        width: 120        
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
import {Box, Button, TextField, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getAllEmployee } from "../../fetches/employeeAxios"

const ShowRenters = () => {
    const getRowId = (row) => row.rowIndex
    const getRowIdx = (params) => params.rowIndex + 1
    
    const [renters, SetRenters] = useState([])
    const rows = renters.map((renter, index) => ({...renter, rowIndex: index+1}))

    const getAllRenter = () => {
        try{
            getAllEmployee((response) => {
                const allRenter = response.filter((data) => data.role !== 'admin')
                SetRenters(allRenter)
                console.log('All Renter:',allRenter)
                console.log('Length:',allRenter.length)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getAllRenter()
    },[])

    const [filterValue, setFilterValue] = useState('')
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value)
    }
    // const filteredRows = rows.filter((row) => 
    //     Object.values(row).some((value) => 
    //         value && value.toString().toLowerCase().includes(filterValue.toLowerCase())
    //     )
    // )
    const filteredRows = rows.filter((row) => {
        let combinedValues
        try{
            combinedValues = `${row.id} ${row.username} ${row.name} 
            ${row.email} ${row.phoneNumber} ${row.rentHouse.address} ${row.role}`

        }
        catch(err){
            combinedValues = `${row.id} ${row.username} ${row.name} 
            ${row.email} ${row.phoneNumber} Kosong ${row.role}`
            
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
            field: 'idRenter',
            headerName: 'Id Renter',
            width: 80,
            renderCell: (params) => params.row.id
        },
        {
            field: 'nameRenter',
            headerName: 'Name',
            width: 200,
            renderCell: (params) => params.row.name
        },
        {
            field: 'usernameRenter',
            headerName: 'User Name',
            width: 200,
            renderCell: (params) => params.row.username
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            renderCell: (params) => params.row.email
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 150,
            renderCell: (params) => params.row.phoneNumber
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 400,
            renderCell: (params) => params.row.rentHouse !== null ? (params.row.rentHouse.address).replace(/-/g, " "):'Kosong' 
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 80,
            renderCell: (params) => params.row.role
        }
    ]

    return(
        <Box>
            <Typography sx={styles.pageTitle} variant="h5">Show Renter</Typography>
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

export default ShowRenters

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
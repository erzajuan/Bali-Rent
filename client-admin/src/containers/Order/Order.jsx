import {Box, Card, CardContent, Grid, Tab, Tabs, TextField, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { detailOrderRent } from "../../fetches/orderAxios"
import TabPanel from "../../components/TabPanel"
import { DataGrid } from "@mui/x-data-grid"

const Order = () => {
    // Get order data
    const getRowId = (row) => row.rowIndex
    const getRowIdx = (params) => params.rowIndex + 1
    const [orders, setOrders] = useState([])

    const detailOrders = () => {
        try{
            detailOrderRent((response) => {
                // const idAddress = localStorage.getItem('id_address')
                // const ordersById = response.filter((data) => data.rentHouseId === +idAddress)
                // console.log(ordersById)
                // console.log('id address detail:', idAddress)
                setOrders(response)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    // Get current date
    const currentDate = new Date() //date now
    const [dateNow, setDateNow] = useState('')
    const oneDayInMillis  = 24*60*60*1000

    // console.log('tanggal',new Date().getDate())

    useEffect(() => {
        detailOrders()
        setDateNow(currentDate.toString())
    },[orders])

    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const [filterValue, setFilterValue] = useState('')
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value)
    }
    // const filteredRows = rows.filter((row) => 
    //     Object.values(row).some((value) => 
    //         value && value.toString().toLowerCase().includes(filterValue.toLowerCase())
    //     )
    // )
    const filteredRows = (rows) => {
        return(
        rows.filter((row) => {
        let combinedValues
        try{
            combinedValues = `${row.carId} ${row.user.id || 'Not Found'} ${row.rentHouse.employeeId || 'Not Found'} 
            ${row.car.transmission} ${row.car.carYear} ${row.car.status} ${row.car.name} ${row.user.name}
            ${row.orderDate.split('T')[0]} ${row.paymentId} ${row.startDate.split('T')[0]}
            ${(row.transactionStatus === 'pending')? ((new Date(dateNow) < new Date(JSON.parse(row.responseMidtrans).expiry_time))? row.transactionStatus: 'Expired'):row.transactionStatus} 
            ${row.finishDate.split('T')[0]} ${JSON.parse(row.responseMidtrans).va_numbers[0].bank}
            ${JSON.parse(row.responseMidtrans).va_numbers[0].va_number}
            ${JSON.parse(row.responseMidtrans).expiry_time}
            ${row.user.phoneNumber}
            `

        }
        catch(err){
            console.log(err)  
        }
        

        if(combinedValues.toLowerCase().includes(filterValue.toLowerCase())){
            return true
        }

        return false
    }))
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }

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
            renderCell: (params) => params.row.carId
        },
        {
            field: 'idUser',
            headerName: 'Id User',
            width: 80,
            renderCell: (params) =>  params.row.user !== null ? params.row.user.id:'Not Found'
        },
        {
            field: 'idRenter',
            headerName: 'Id Renter',
            width: 80,
            renderCell: (params) =>  params.row.rentHouse !== null ? params.row.rentHouse.employeeId:'Not Found'
        },
        {
            field: 'reserved car & customer',
            headerName: 'Information Reserved Car & Customer ',
            minWidth: 700,
            renderCell: (params) => 
                    // console.log(JSON.parse(params.row.responseMidtrans).va_numbers[0].va_number) // va_number
                    // console.log(JSON.parse(params.row.responseMidtrans).va_numbers[0].bank) // bank
                    // console.log(JSON.parse(params.row.responseMidtrans).transaction_time) // transaction_time
                    // console.log(JSON.parse(params.row.responseMidtrans).expiry_time) // expiry_time
                    <>
                    <Box sx={styles.videoColumn}>
                        <Box sx={styles.videoColumn}>
                            <Box 
                                component={'img'}
                                sx={styles.videoThumbnail}
                                src={params.row.car.carImage}
                            />
                        </Box>
                        <Box sx={styles.carDetails}>
                            <Typography sx={styles.carTitle}>{params.row.car.name}</Typography>
                            <Typography sx={styles.carDescription}>
                                {params.row.car.transmission} | {params.row.car.carYear} | {params.row.car.status}
                            </Typography>
                        </Box>
                        <Box>
                            <Card sx={{height:120}}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item >
                                            <Typography sx={styles.titleComponentCard1}>
                                                Customer Name:
                                            </Typography>
                                            <Typography sx={styles.valueComponentCard}> 
                                                {params.row.user.name}
                                            </Typography>
                                            
                                            <Typography sx={styles.titleComponentCard2}>
                                                Order Date:
                                            </Typography>
                                            <Typography sx={styles.valueComponentCard}> 
                                                {params.row.orderDate.split('T')[0]}
                                            </Typography>
                                            
                                        </Grid>
                                        <Grid item >
                                            <Typography sx={styles.titleComponentCard1}>
                                                Payment Id:
                                                </Typography>
                                            <Typography sx={styles.valueComponentCard}> 
                                                {params.row.paymentId}
                                            </Typography>
                                            
                                            <Typography sx={styles.titleComponentCard2}>
                                                Start Rent: 
                                            </Typography>
                                            <Typography sx={styles.valueComponentCard}> {params.row.startDate.split('T')[0]}</Typography>
                                            
                                        </Grid>
                                        <Grid item >
                                            {
                                                params.row.transactionStatus === 'pending' ?
                                                    new Date(dateNow) < new Date(JSON.parse(params.row.responseMidtrans).expiry_time) ?
                                                    <>
                                                    <Box sx={styles.orderPendingStatusBox}>
                                                            <Typography sx={styles.orderStatusTitle} variant="h7">
                                                                Order Status:
                                                            </Typography>
                                                            <Typography sx={styles.orderStatus} variant="h6">
                                                                {capitalizeFirstLetter(params.row.transactionStatus)}
                                                            </Typography>
                                                    </Box>
                                                    </>
                                                    :
                                                    <Box sx={styles.orderExpiredStatusBox}>
                                                            <Typography sx={styles.orderExpiredStatusTitle} variant="h7">
                                                                Order Status:
                                                            </Typography>
                                                            <Typography sx={styles.orderExpiredStatus} variant="h6">
                                                                Expired
                                                            </Typography>
                                                    </Box>
                                                :
                                                <>
                                                <Box sx={styles.orderSuccessStatusBox}>
                                                        <Typography sx={styles.orderStatusTitle} variant="h7">
                                                            Order Status:
                                                        </Typography>
                                                        <Typography sx={styles.orderStatus} variant="h6">
                                                            {capitalizeFirstLetter(params.row.transactionStatus)}
                                                        </Typography>
                                                </Box>
                                                </>

                                            }
                                            <Typography sx={{fontSize: '13px', mt:0.7}}>
                                                Finish Rent:
                                            </Typography>
                                            <Typography sx={styles.valueComponentCard}> {params.row.finishDate.split('T')[0]}</Typography>
                                            
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                    </>
            },
            {
                field: 'Bank',
                headerName: 'Bank',
                minWidth: 50,
                renderCell: (params) =>
                    <>
                    <Typography sx={styles.valueComponentCard}>
                        {(JSON.parse(params.row.responseMidtrans).va_numbers[0].bank).toUpperCase()}
                    </Typography>
                    </> 
            },
            {
                field: 'Virtual Account Number',
                headerName: 'Virtual Account Number',
                minWidth: 200,
                renderCell: (params) =>
                    <>
                    <Typography sx={styles.valueComponentCard}>
                        {(JSON.parse(params.row.responseMidtrans).va_numbers[0].va_number).toUpperCase()}
                    </Typography>
                    </> 
            },
            {
                field: 'Expiry Time',
                headerName: 'Expiry Time',
                minWidth: 200,
                renderCell: (params) =>
                    <>
                    <Typography sx={styles.valueComponentCard}>
                        {JSON.parse(params.row.responseMidtrans).expiry_time}
                    </Typography>
                    </> 
            },
            {
                field: 'Phone Number Customer',
                headerName: 'Phone Number Customer',
                minWidth: 200,
                renderCell: (params) =>
                    <>
                    <Typography sx={styles.valueComponentCard}>
                        {params.row.user.phoneNumber}
                    </Typography>
                    </> 
            },
        
    ]

    const ordersAll = orders.map((order, index) => ({...order, rowIndex: index+1}))
    
    const ordersToday = ordersAll.filter((order) => new Date(order.createdAt).getDate() === new Date(dateNow).getDate())

    // console.log('order hari ini', ordersAll)

    return (       
        <>
        <Box sx={{borderBottom:1, borderColor:'divider'}}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label='Order Today' id='tab-0' />
                <Tab label='Order History' id='tab-1' />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Box>
                    <TextField
                        label='Search'
                        value={filterValue}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        style={{marginBottom:10}}                
                    />
                    <DataGrid
                        rows={filteredRows(ordersToday)}
                        columns={columns}
                        pageSize={25}
                        rowsPerPageOptions={[10]}
                        autoHeight
                        rowHeight={140}
                        getRowId={getRowId}
                        getRowIdx={getRowIdx}
                        pagination={true}
                        pageSizeOptions={[10,25,50,100]}
                        localeText={{
                            noRowsLabel: 'No Order Today'
                        }}
                    />
                </Box>                
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box>
                    <TextField
                        label='Search'
                        value={filterValue}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        style={{marginBottom:10}}                
                    />
                    <DataGrid
                        rows={filteredRows(ordersAll)}
                        columns={columns}
                        pageSize={25}
                        rowsPerPageOptions={[10]}
                        autoHeight
                        rowHeight={140}
                        getRowId={getRowId}
                        getRowIdx={getRowIdx}
                        pagination={true}
                        pageSizeOptions={[10,25,50,100]}
                    />
                </Box>                
            </TabPanel>
        </Box>
        </>

    )
}

export default Order

/** @type {import('@mui/material').SxProps} */
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
        fontSize:'1.5rem',
        width: 150,
        textOverflow:'ellipsis',
        whiteSPace:'nowrap',
        overflow:'hidden'
    },
    carDescription:{
        fontSize:'0.8rem',
        color:'neutral.normal',
        width: 150,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    orderPendingStatusBox:{
        backgroundColor:'#ffcc00', 
        width:100, 
        height:50, 
        borderRadius:'5px'
    },
    orderExpiredStatusBox:{
        backgroundColor:'#cc3300', 
        width:100, 
        height:50, 
        borderRadius:'5px'
    },
    orderSuccessStatusBox:{
        backgroundColor:'#99cc33', 
        width:100, 
        height:50, 
        borderRadius:'5px'
    },
    orderStatusTitle:{
        paddingLeft: 1, 
        paddingTop:1
    },
    orderExpiredStatusTitle:{
        paddingLeft: 1, 
        paddingTop:1,
        color:'neutral.light'
    },
    orderStatus:{
        paddingLeft: 1, 
        paddingTop:0
    },
    orderExpiredStatus:{
        paddingLeft: 1, 
        paddingTop:0,
        color:'neutral.light'
    },
    titleComponentCard1:{
        fontSize:'13px'
    },
    titleComponentCard2:{
        fontSize:'13px',
        mt:1.5
    },
    valueComponentCard:{
        fontSize:'16px', 
        fontWeight:'bold'
    },


}
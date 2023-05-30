import { Avatar, Box, Typography } from "@mui/material"
import {Sidebar, useProSidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar"
import { useTheme } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CarRentalOutlinedIcon from '@mui/icons-material/CarRentalOutlined';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./GetterValPage";
import { detailEmployee } from "../fetches/employeeAxios";

const SideNav = (props) => {
    const {handleDetailEmployee} = props
    const id_employee = localStorage.getItem('id')
    console.log(id_employee)

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
        // const interval = setInterval(detail, 1000)
        // return () => {
        //     clearInterval(interval)
        // }
    }, []);

    const firstNameEmployee = profile.firstName || "Un"
    const lastNameEmployee = profile.lastName.split(' ')[0] || "Known"
    const roleEmployee = profile.role || "Rent"

    const theme = useTheme()
    const {collapsed} = useProSidebar()
    const location = useLocation()
    
    return(
    <Sidebar
            style={{
                height: '100%',
                top:'auto'
            }}
                breakPoint="md"
                backgroundColor = {theme.palette.neutral.light}     
        >
        <Box sx={styles.avatarContainer}>
            <Avatar sx={{width:50, height:50}} alt="Name Profile">{`${firstNameEmployee.charAt(0)}${lastNameEmployee.charAt(0)}`}</Avatar>
            {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>{`${firstNameEmployee} ${lastNameEmployee}`}</Typography>:null}
            {!collapsed ? <Typography variant="overline">{roleEmployee}</Typography>:null}
        </Box>
        <Menu
            menuItemStyles={{
                button:({active}) => {
                    return{
                        backgroundColor: active? theme.palette.neutral.medium: undefined
                    }
                } 
            }}
        >
            <MenuItem active={location.pathname === '/'} component={<Link to={"/"}/>} onClick={() => handleDetailEmployee(id_employee)} icon={<AccountBoxOutlinedIcon></AccountBoxOutlinedIcon>}>
                <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <MenuItem active={location.pathname === '/showrenters'} component={<Link to={"/showrenters"}/>} icon={<PeopleOutlinedIcon/>}>
                <Typography variant="body2">Rents</Typography>
            </MenuItem>
            <MenuItem active={location.pathname === '/showcars'} component={<Link to={"/showcars"}/>} icon={<GarageOutlinedIcon/>}>
                <Typography variant="body2">Cars</Typography>
            </MenuItem>
            <SubMenu label="Brand List" icon={<ViewAgendaOutlinedIcon/>}>
                <MenuItem active={location.pathname === '/showbrands'} component={<Link to={"/showbrands"}/>} icon={<StorageOutlinedIcon/>}>
                    <Typography variant="body2">Show Brands</Typography>
                </MenuItem>
                <MenuItem active={location.pathname === '/addbrand'} component={<Link to={"/addbrand"}/>} icon={<AddBoxOutlinedIcon/>}>
                    <Typography variant="body2">Add Brand</Typography>
                </MenuItem>
            </SubMenu>
            <MenuItem active={location.pathname === '/orderrental'} component={<Link to={"/orderrental"}/>} icon={<BookOnlineOutlinedIcon/>}>
                <Typography variant="body2">Orders Rental</Typography>
            </MenuItem>
        </Menu>
    </Sidebar>)
}

export default SideNav

/** @type {import('@mui/material').SxProps} */
const styles={
    avatarContainer:{
        display:"flex",
        alignItems: "center",
        flexDirection: 'column',
        my: 5
    },
    yourChannel:{
        mt:1
    }
}
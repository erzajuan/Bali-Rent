import { Avatar, Box, Typography } from "@mui/material"
import {Sidebar, useProSidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar"
import { useTheme } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CarRentalOutlinedIcon from '@mui/icons-material/CarRentalOutlined';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const SideNav = () => {
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
            <Avatar sx={{width:50, height:50}} alt="Name Profile">ZP</Avatar>
            {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>Your Company</Typography>:null}
            {!collapsed ? <Typography variant="overline">Status</Typography>:null}
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
            <MenuItem active={location.pathname === '/'} component={<Link to={"/"}/>} icon={<AccountBoxOutlinedIcon></AccountBoxOutlinedIcon>}>
                <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <SubMenu label="Car List" icon={<CarRentalOutlinedIcon/>}>
                <MenuItem active={location.pathname === '/showcar'} component={<Link to={"/showcar"}/>} icon={<StorageOutlinedIcon/>}>
                    <Typography variant="body2">Show Cars</Typography>
                </MenuItem>
                <MenuItem active={location.pathname === '/addcar'} component={<Link to={"/addcar"}/>} icon={<AddBoxOutlinedIcon/>}>
                    <Typography variant="body2">Add Car</Typography>
                </MenuItem>
            </SubMenu>
            <MenuItem active={location.pathname === '/orderrental'} component={<Link to={"/orderrental"}/>} icon={<BookOnlineOutlinedIcon/>}>
                <Typography variant="body2">Order Rental</Typography>
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
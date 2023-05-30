import {AppBar, IconButton, Toolbar, Box, Badge, Typography} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import {useProSidebar} from 'react-pro-sidebar'
import { useNavigate } from "react-router-dom";

const AppHeader = (props) => {
    const {handleLoginCb} = props
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        handleLoginCb(false)
        navigate('/login')

    }

    const {collapseSidebar, toggleSidebar, broken} = useProSidebar()
    
    return(
        <AppBar position="sticky" sx={styles.appBar}>
            <Toolbar>
                <IconButton onClick={() => broken ? toggleSidebar():collapseSidebar()} color="secondary">
                    <MenuIcon/>
                </IconButton>
                <Box
                    component={'img'}
                    sx={styles.appLogo}
                    src="\src\assets\logo.png"
                />
                <Box sx={{
                    backgroundColor:'#FFEACE', 
                    borderRadius:'20px', 
                    width:'100px', 
                    justifyContent:"center", 
                    alignItems:"center",
                    display:'flex',
                    ml:'10px'
                }}>
                        <Typography variant="h6" sx={{color:'#7B3100'}}>Admin</Typography>
                </Box>
                <Box sx={{flexGrow:1}}></Box>
                {/* <IconButton>
                    <Badge badgeContent={4} color="success">
                        <NotificationsIcon color="secondary"/>
                    </Badge>
                </IconButton> */}
                <IconButton onClick={() => handleLogout()}>
                    <LogoutIcon color='secondary'/>
                </IconButton>
            </Toolbar>        
        </AppBar>
    )
    
}

export default AppHeader

/** @type {import("@mui/material").SxProps} */
const styles = {
    appBar: {
        bgcolor:'#8F7158'
    },
    appLogo: {
        borderRadius: 2,
        cursor: 'pointer',
        width: 200,
        ml: 2,
    },
    imgLogo: {
        height:'50%',
        width: 'auto'
    }

}
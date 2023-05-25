import Order from '../containers/Order/Order'
import Profile from '../containers/Profile/Profile'
import ShowCar from '../containers/Car/ShowCar'
import AddCar from '../containers/Car/AddCar'
import Login from '../containers/Login/Login'
import {Route, Routes} from "react-router-dom"

const AppRouter = (props) => {
    const {employee, handleLoginCb} = props

    return(
    <Routes>
        <Route path="/" element={<Profile employee={employee} handleLoginCb = {handleLoginCb}/>}/>
        <Route path="/showcar" element={<ShowCar/>}/>
        <Route path="/addcar" element={<AddCar/>}/>
        <Route path="/orderrental" element={<Order/>}/>
    </Routes>)        
}

export default AppRouter
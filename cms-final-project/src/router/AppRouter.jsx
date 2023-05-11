import Order from '../containers/Order/Order'
import Profile from '../containers/Profile/Profile'
import ShowCar from '../containers/Car/ShowCar'
import AddCar from '../containers/Car/AddCar'
import {Route, Routes} from "react-router-dom"

const AppRouter = () => {
    return(
    <Routes>
        <Route path="/" element={<Profile/>}/>
        <Route path="/showcar" element={<ShowCar/>}/>
        <Route path="/addcar" element={<AddCar/>}/>
        <Route path="/orderrental" element={<Order/>}/>
    </Routes>)        
}

export default AppRouter
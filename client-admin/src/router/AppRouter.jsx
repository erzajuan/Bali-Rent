import Order from '../containers/Order/Order'
import Profile from '../containers/Profile/Profile'
import ShowCar from '../containers/Car/ShowCar'
import AddCar from '../containers/Car/AddCar'
import Login from '../containers/Login/Login'
import {Route, Routes} from "react-router-dom"
import ShowRenters from '../containers/Employees/ShowRenters'
import ShowCars from '../containers/Car/ShowCars'
import AddBrand from '../containers/Brand/AddBrand'
import ShowBrands from '../containers/Brand/ShowBrand'

const AppRouter = (props) => {
    const {employee, handleLoginCb} = props

    return(
    <Routes>
        <Route path="/" element={<Profile employee={employee} handleLoginCb = {handleLoginCb}/>}/>
        <Route path="/showrenters" element={<ShowRenters/>}/>
        <Route path="/showbrands" element={<ShowBrands/>}/>
        <Route path="/addbrand" element={<AddBrand/>}/>
        <Route path="/orderrental" element={<Order/>}/>
        <Route path='/showcars' element={<ShowCars/>}/>
    </Routes>)        
}

export default AppRouter
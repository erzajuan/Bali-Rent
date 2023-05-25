import Login from "../containers/Login/Login"
import AddressRegister from "../containers/Register/AddressRegister"
import Register from "../containers/Register/Register"
import { Route, Routes } from "react-router-dom"

const LoginRegisterRouter = (props) => {
    const {handleLoginCb} = props
    return(
        <Routes>
            <Route path="/login" element={<Login handleLoginCb={handleLoginCb} />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/register-address" element={<AddressRegister/>} />
        </Routes>
    )

}

export default LoginRegisterRouter
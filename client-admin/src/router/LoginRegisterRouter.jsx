import Login from "../containers/Login/Login"
import Register from "../containers/Register/Register"
import { Route, Routes } from "react-router-dom"
import RegisterAdmin from "../containers/Register/RegisterAdmin"

const LoginRegisterRouter = (props) => {
    const {handleLoginCb} = props
    return(
        <Routes>
            <Route path="/login" element={<Login handleLoginCb={handleLoginCb} />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/register-admin" element={<RegisterAdmin/>} />
        </Routes>
    )

}

export default LoginRegisterRouter
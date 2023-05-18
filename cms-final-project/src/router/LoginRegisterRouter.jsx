import Login from "../containers/Login/Login"
import Register from "../containers/Register/Register"
import { Route, Routes } from "react-router-dom"

const LoginRegisterRouter = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>
        </Routes>
    )

}

export default LoginRegisterRouter
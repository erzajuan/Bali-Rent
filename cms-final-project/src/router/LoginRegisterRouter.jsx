import Login from "../containers/Login/Login"
import Register from "../containers/Register/Register"
import { Route, Routes } from "react-router-dom"

const LoginRegisterRouter = (props) => {
    const {handleLoginCb} = props
    return(
        <Routes>
            <Route path="/login" element={<Login handleLoginCb={handleLoginCb} />} />
            <Route path="/register" element={<Register />}/>
        </Routes>
    )

}

export default LoginRegisterRouter
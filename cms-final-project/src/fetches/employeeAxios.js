import axios from 'axios'
import Swal from 'sweetalert2'

const URL = "http://localhost:3000/api/employes"

const loginEmployee = async (employee, handleLoginCb) => {
    try{
        console.log('start login')
        let result = await axios({
            method:'POST',
            url:URL+'/login',
            data:employee
        })
        console.log('finish login')
        const access_token = result.data.access_token
        const id_employee = result.data.id
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('id', id_employee)
        console.log(result.data)
        handleLoginCb(true)
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Login Failed",
            text:err.response.data.message
        })
        console.log(err)
    } 
}

const registerEmployee = async (employee, handleRegisterCb) => {
    try{
        console.log('start register')
        let result = await axios({
            method:'POST',
            url:URL,
            data:employee
        })
        console.log('finish register')
        handleRegisterCb(true)

    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Register Failed",
            text:err.response.data.message
        })        
        console.log(err)
    }
}

const detailEmployee = async (id_employee, response) => {
    try{
        console.log('start get detail employee')
        const access_token = localStorage.getItem('access_token')
        console.log('id:',id_employee)
        let result = await axios({
            method:'GET',
            url:URL+`/detail/`,
            headers:{
                access_token
            }            
        })
        console.log(result.data.data)
        response(result.data.data)
        console.log('finsih get detail employee')
    }
    catch(err){
        console.log(err)
    }
}

const updateEmployee = async (id, response) => {
    try{
        console.log('start update employee')
        const access_token = localStorage.getItem('access_token')
        let result = await axios({
            method:'PUT',
            url:URL,
            data: response,
            headers:{
                access_token
            }
        })
        console.log(result.data)
        console.log('finish update employee')
        Swal.fire(
            "Update Profile Success", 
            "Your Profile Has Been Updated", 
            "success"
        ).then(() => {
            window.location.reload();
        });
            
    }
    catch(err){
        console.log(err)
    }
}

const changePasswordEmployee = async (response, handleChangePasswordCb) => {
    try{
        console.log('start change password')
        const access_token = localStorage.getItem('access_token')
        let result = await axios({
            method:'PUT',
            url:URL+'/changePassword',
            data: response,
            headers:{
                access_token
            }
        })
        console.log('finsih change password')
        handleChangePasswordCb(true)
        Swal.fire("Update Password Success", "Your Password Has Been Updated", "success")
        .then(() => {
            window.location.reload();
        });
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Change Password Failed",
            text:err.response.data.message
        })
        console.log(err)
    }
}

export {
    loginEmployee,
    registerEmployee,
    detailEmployee,
    updateEmployee,
    changePasswordEmployee
}
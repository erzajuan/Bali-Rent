import axios from 'axios'
import Swal from 'sweetalert2'

const URL = "http://localhost:3000/api/cars"

const createCarRent = async (data) => {
    try{
        console.log('start create car rent')
        const access_token = localStorage.getItem('access_token')
        const result = await axios.post(URL, data, {
            headers:{
                "Content-Type" : "multipart/form-data",
                access_token
            }
        })
        console.log(result.data)
        console.log('finish create car rent')
        Swal.fire("Create Car Success", "Your Car Has Been Created", "success")
        .then(() => {
            window.location.reload();
        });
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Create Car Failed",
            text:err.response.data.message
        })
        console.log(err)
    }
}

const detailCarRent = async (response) => {
    try{
        console.log('start get all car rent')
        const result = await axios({
            method:'GET',
            url:URL
        })
        response(result.data.data)
        console.log('finish get all car rent')
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Create Car Failed",
            text:err.response.data.message
        })
        console.log(err)
    }
}

const deleteCarRent = async (idCar) => {
    try{
        console.log('start delete car')
        const result = await axios({
            method:"DELETE",
            url:URL+`/${idCar}`
        })
        console.log('finsih delete car')
        Swal.fire("Delete Car", "Item Has Been Deleted", "success")
        .then(() => {
            window.location.reload();
        });
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Delete Car Failed",
            text:err.response.data.message
        })
        console.log(err)
    }
}

const updateCarRent = async (idCar, response, editFinishCb) => {
    try{
        console.log('start update car')
        const access_token = localStorage.getItem('access_token')
        const result = await axios.put(URL+`/${idCar}`, response, {
            headers:{
                "Content-Type":"multipart/form-data",
                access_token
            }
        })
        console.log('finish update car')
        editFinishCb(true)
        Swal.fire("Update Car Success", "Your Car Has Been Updated", "success")
        .then(() => {
            window.location.reload();
        });
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Update Car Failed",
            text:err.response.data.message
        })
        console.log(err)
    }
}


export {
    createCarRent,
    detailCarRent,
    deleteCarRent,
    updateCarRent
}
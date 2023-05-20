import axios from 'axios'
import Swal from 'sweetalert2'

const URL = "http://localhost:3000/api/rents"

const createRentHouse = async (data, handleHaveAddress) => {
    try{
        console.log('start create rent house!')
        const access_token = localStorage.getItem('access_token')
        let result = await axios({
            method:'POST',
            url:URL,
            data:data,
            headers:{
                access_token
            }
        })
        console.log(result.data);
        // const id_address = result.data.id
        // localStorage.setItem('id_address',id_address)
        console.log('finish create rent house!')
        Swal.fire("Create Address Success", "Your Address Has Been Created", "success");
        
    }
    catch(err){
        // console.log(err.response.data.message)
        if(err.response.data.message){
            handleHaveAddress(true)
        }else{
            console.log(err)
        }
    }
}

const updateRentHouse = async (id_address, response) => {
    try{
        console.log('start update rent house')
        const access_token = localStorage.getItem('access_token')
        let result = await axios({
            method:'PUT',
            url:URL+`/${id_address}`,
            data: response,
            headers:{
                access_token
            }
        })
        console.log('finish update rent house')
        Swal.fire("Update Address Success", "Your Address Has Been Updated", "success");
    }
    catch(err){
        console.log(err)
    }
}

const detailRentHouse = async (id_address, response) => {
    try{
        console.log('start get detail rent house')
        let result = await axios({
            method:'GET',
            url:URL
        })
        response(result.data.data)


    }
    catch(err){
        console.log(err)
    }
}


export {
    createRentHouse,
    updateRentHouse,
    detailRentHouse
}
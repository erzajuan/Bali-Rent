import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3000/api/brands"

const detailCarBrand = async (response) => {
    try{
        console.log('start get detail brand')
        const result = await axios({
            method:'GET',
            url:URL
        })
        response(result.data)
        console.log('finsih get detail brand')

    }
    catch(err){
        console.log(err)
    }
}

const createCarBrand = async (data) => {
    try{
        console.log('start create car brand')
        const result = await axios.post(URL, data, {
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })
        Swal.fire("Create Car Brand Success", "Your Car Brand Has Been Created", "success")
        .then(() => {
            window.location.reload();
        });
        console.log('finish create car brand')
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Update Car Brand Failed",
            text:"Please Check Your Input"
        })
        console.log(err)
    }
}

const updateCarBrand = async (idBrand, response, editFinishCb) => {
    try{
        console.log('start update car brand')
        const result = await axios.put(URL+`/${idBrand}`, response, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        Swal.fire("Update Car Brand Success", "Your Car Brand Has Been Updated", "success")
        .then(() => {
            window.location.reload();
        });
        editFinishCb(true)
        console.log('finish update car brand')
    }
    catch(err){
        Swal.fire({
            icon:"error",
            title:"Update Car Brand Failed",
            text:"Please Check Your Input"
        })
        console.log(err)
    }
}

export {
    detailCarBrand,
    createCarBrand,
    updateCarBrand
}
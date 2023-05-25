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

export {
    detailCarBrand
}
import axios from 'axios'
import Swal from 'sweetalert2'

const URL = "http://localhost:3000/api/orders"

const detailOrderRent = async (response) => {
    try{
        console.log('start get detail order')
        const result = await axios({
            method:'GET',
            url:URL
        })
        response(result.data.data)
        console.log('finish get detail order')

    }
    catch(err){
        console.log(err)
    }
}

// const updatePaymentStatus = async (id_paymnet, response) => {
//     try{
//         console.log('start update detail order')
//         const result = await axios({
//             method:'PUT',
//             url:URL+`/${id_paymnet}`
//         })


//         console.log('finish update detail order')

//     }
//     catch(err){
//         console.log(err)
//     }
// }

export {
    detailOrderRent
}
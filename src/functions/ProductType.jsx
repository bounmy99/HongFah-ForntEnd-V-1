import axios from "axios"

export const GetAllProductType = async (token) => await axios.get(`${import.meta.env.VITE_HONGFHA_API}/prodcategory/getall`,{
    headers :{
        'Authorization' : `Bearer ${token}`
    }
})

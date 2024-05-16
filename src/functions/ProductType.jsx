import axios from "axios"

export const GetAllProductType = async (token) => await axios.get(`${import.meta.env.VITE_HONGFHA_API}/prodcategory/getall`,{
    headers :{
        'Authorization' : `Bearer ${token}`
    }
})
export const GetOneProductType = async (token,id) => await axios.get(`${import.meta.env.VITE_HONGFHA_API}/prodcategory/getone/${id}`,{
    headers :{
        'Authorization' : `Bearer ${token}`
    }
})
export const InsertProductType = async (token,value) => await axios.post(`${import.meta.env.VITE_HONGFHA_API}/prodcategory/create`,value,{
    headers :{
        'Authorization' : `Bearer ${token}`
    }
})
export const DeleteProductType = async (token,id) => await axios.put(`${import.meta.env.VITE_HONGFHA_API}/prodcategory/delete/${id}`,{},{
    headers :{
        'Authorization' : `Bearer ${token}`
    }
})
export const UpdateProductType = async (token,id,value) => await axios.put(`${import.meta.env.VITE_HONGFHA_API}/prodcategory/update/${id}`,value,{
    headers :{
        'Authorization' : `Bearer ${token}`
    }
})

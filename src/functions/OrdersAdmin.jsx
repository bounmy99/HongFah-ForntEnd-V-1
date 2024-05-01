import axios from "axios";

export const CreateOrder = async(token,value)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/admin/order/create`,value,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllOrderAdmin = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/admin/order/getall`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllOrderAdminExport = async(token, status)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/admin/order/getall?toexport=${status}`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllOrderSaleExport = async(token, status)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/admin/order/getall?toexport=${status}`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetOneOrderAdmin = async(token,id)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/admin/order/getone/${id}`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    })
}

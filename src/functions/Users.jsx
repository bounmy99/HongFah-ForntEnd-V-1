import axios from "axios";

export const GetAllUsers  = async(token,values)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/user/getall?searchName=${values}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const Verify  = async(token,id)=>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/user/verify/${id}`,{},{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllNotVerify  = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/user/getall/notverified`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllVerify  = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/user/getall/verified`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetOneUser  = async(token,id)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/user/getone/${id}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const ResetPassword  = async(token,data)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/user/reset/password`,data,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const CounUserSubScript  = async(token,startDate,endDate)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/user/countuser?startDate=2024-03-11&endDate=2024-03-12`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const DeleteUsers  = async(token,id)=>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/user/delete/${id}`,{},{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}

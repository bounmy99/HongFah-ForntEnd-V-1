import axios from "axios";
import { values } from "lodash";

export const Login = async(value)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/admin/login`,value)
}
export const forgetPassword = async(value,token)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/admin/forgetpassword`,value)
} 

export const resetPassword = async(value,token)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/admin/reset/password`,value,{
        headers :{
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    })
} 


export const AdminSignStaff = async(token,value)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/admin/signstaff`,value,{
        headers :{
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const AdminSignSuperadmin = async(token,value)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/admin/superadmin/register`,value,{
        headers :{
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    })
}

export const GetAllUser = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/admin/getallstaff`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetOneUser = async(token,id)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/admin/getonestaff/${id}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const DeleteUser = async(token,id)=>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/admin/deletestaff/${id}`,{},{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const UpdateUser = async(token,data,id)=>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/admin/updatestaff/${id}`,data,{
        headers :{
            'Content-Type' : 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const Permission = async(token,role,id)=>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/admin/permission/${id}?role=${role}`,{},{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}

export const CountUsers = async(token,startDate,endDate) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/user/countuser?startDate=2024-03-11&endDate=2024-03-12`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}

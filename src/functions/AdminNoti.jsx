import axios from "axios";

export const GetAllNoti = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/noti/admin/getall`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetOneNoti = async(token,id)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/noti/getone/${id}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const ReadedNoti = async(token,notiID)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/noti/update/readed`,notiID,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}

import axios from "axios";

export const GetRootLineWork = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/linework/getroot`,{
        headers:{Authorization: `Bearer ${token}`}
    })
}
export const GetLineWorkTable = async(token,searchName)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/linework/getall?searchName=${searchName}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
}

export const GetAllEmployee = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/linework/getwithlevel?level=0&toLevel=4`,{
        headers:{Authorization: `Bearer ${token}`}
    })
}

export const GetOneEmployee = async(token,id)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/linework/getone/${id}`,{
        headers : {Authorization : `Bearer ${token}`}
    })
}
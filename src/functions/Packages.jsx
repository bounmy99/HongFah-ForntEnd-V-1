import axios from "axios";

export const CreatePackage = async (token,value) => {
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/package/insert`,value,{
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const GetAllPackage = async (token) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/package/getall`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const DeletePackage = async (token,id) => {
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/package/delete/${id}`,{},{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const GetOnePackage = async (token,id) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/package/getone/${id}`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const UpdatePackage = async (token,value,id) => {
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/package/update/${id}`,value,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
}
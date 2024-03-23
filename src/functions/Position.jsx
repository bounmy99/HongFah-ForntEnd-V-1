import axios from "axios";

export const CreatePosition = async (token,values) =>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/position/create`,values,{
        headers : {
            'Content-Type' : 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    });
} 
export const GetAllPosition = async (token) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/position/getall`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}

export const DeletePosition = async (token,id) =>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/position/delete/${id}`,{},{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
} 
export const GetOnePosition = async (token,id) =>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/position/getone/${id}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
} 

export const UpdatePosition = async (token,values,id) =>{
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/position/update/${id}`,values,{
        headers : {
            'Content-Type' : 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    });
}
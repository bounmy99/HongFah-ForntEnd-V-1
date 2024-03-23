import axios from "axios"

export const CreateProduct = async (token,product) =>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/product/create`,product,{
        headers : {
            'Content-Type' : 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    });
} 

export const GetAllProduct = async (token,productType,maxPrice,search) => {
        return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/product/getall?productType=${productType}&maxPrice=${maxPrice}&search=${search}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
}

export const GetOneProduct = async (token,id) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/product/getone/${id}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const UpdateProduct = async (token,id, value) => {
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/product/update/${id}`,value,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const DeleteProduct = async (token,id,) => {
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/product/delete/${id}`,{},{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}

export const BestSeller = async(token,startDate,endDate) =>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/product/bestseller?startDate=${startDate}&endDate=${endDate}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}
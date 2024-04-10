import axios from "axios";

export const GetAllBonus = async(token,isMaintainSales,toexport,isApproved,search)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/bonus/getbonuslist?isMaintainSales=${isMaintainSales}&toexport=${toexport}&isApproved=${isApproved}&search=${search}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllSuccess = async(token,Improved,search)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/bonus/getbonuslist?isApproved=${Improved}&search=${search}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllMaintain = async(token,isMaintainSales,search)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/bonus/getbonuslist?isMaintainSales=${isMaintainSales}&search=${search}`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const Paybonus = async(token,bonusListID)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/bonus/paybonus`,{bonusListID},{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const Deletebonus = async(token,bonusListID)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/bonus/delete`,{bonusListID},{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}


import axios from "axios";

export const GetAllBonus = async(token)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/bonus/getbonuslist?isMaintainSales=true&toexport=true`,{
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    })
}
export const GetAllMaintain = async(token,isMaintainSales)=>{
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/bonus/getbonuslist?isMaintainSales=${isMaintainSales}`,{
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


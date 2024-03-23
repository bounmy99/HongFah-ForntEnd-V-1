import axios from 'axios'

export const GetWalletWithUserCode = async (token,useCode) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/wallet/get?userCode=${useCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const WithDrawAdmin = async(token,data)=>{
    return await axios.post(`${import.meta.env.VITE_HONGFHA_API}/wallet/admin/withdraw`,data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export const GetWallet = async (token,status,type) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/transaction/wallet?status=${status}&type=${type}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const GetOneWithDraw = async (token,id) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/transaction/getone/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const ApprovedWithDraw = async (token,slip,id) => {
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/transaction/approved/${id}`,slip,{
        headers: {
            'Content-Type' :'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
}
export const RejectWithDraw = async (token,id) => {
    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/transaction/reject/${id}`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

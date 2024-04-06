import axios from 'axios'

export const GetWalletWithUserCode = async (token,useCode) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/wallet/get?userCode=${useCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


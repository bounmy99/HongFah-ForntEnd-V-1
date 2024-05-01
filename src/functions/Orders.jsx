import axios from 'axios'
export const GetAllOrders = async (token,startDate,endDate,values,status) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/order/getall?startDate=${startDate}&endDate=${endDate}&productName=${values}&status=${status}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const GetAllOrdersUsers = async (token,startDate,endDate,values,status) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/order/getall?startDate=${startDate}&endDate=${endDate}&productName=${values}&status=${status}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const GetAllOrdersExport = async (token,startDate,endDate,values,status) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/order/getall?startDate=${startDate}&endDate=${endDate}&productName=${values}&status=${status}&toexport=true`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const GetOneOrders = async (token, id) => {

    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/order/getone/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const ApprovedOrders = async (token, id) => {

    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/order/approved/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })


}
export const RejectOrders = async (token, id) => {

    return await axios.put(`${import.meta.env.VITE_HONGFHA_API}/order/reject/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

}

export const SalesPrices = async(token,startDate,endDate) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/order/salseprices?startDate=2024-03-01&endDate=2024-03-11`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const Overview = async(token,startDate,endDate) => {
    return await axios.get(`${import.meta.env.VITE_HONGFHA_API}/order/overview?startDate=2024-03-01&endDate=2024-03-11`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
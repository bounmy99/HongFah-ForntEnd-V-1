import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CancelOrders from './CancelOrders';
import HistoryOrders from './HistoryOrders';
import ListOrders from './ListOrders';
import { Overview } from '../../../functions/Orders';

const HomeOrders = () => {
  const { state } = useLocation();
  const { users } = useSelector((state) => ({ ...state }))
  const [orderStatus, setOrderStatus] = useState('');
  const [orderOverview, setOrderOverview] = useState('');

  console.log("State",state)

  useEffect(() => {
    setOrderStatus(1)
    if (state) {
      setOrderStatus(state.key);
    }
    Overview(users.token).then(res => {
      setOrderOverview(res.data.data)
    })
  }, [])
  // set value click
  const handleClick = (e) => {
    setOrderStatus(e)
  }
// format prices
  const formatPrice = (value) => {
    let val = (value / 1).toFixed(0).replace(",", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="list-order-container">
      <div className="orders-dashboard">
        <div className="order-boxes total">
          <div className="order-text">
            <h5 className="title">{formatPrice(orderOverview.salsePrice ? orderOverview.salsePrice : 0 )} ລ້ານ</h5>
            <h3>ມູນຄ່າລວມ</h3>
          </div>
          <div className="order-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#FA5A7D" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9999 11C11.8953 11 10.9999 11.8954 10.9999 13V27C10.9999 28.1046 11.8953 29 12.9999 29H26.9999C28.1044 29 28.9999 28.1046 28.9999 27V13C28.9999 11.8954 28.1044 11 26.9999 11H12.9999ZM15.9999 21C15.9999 20.4477 15.5522 20 14.9999 20C14.4476 20 13.9999 20.4477 13.9999 21V25C13.9999 25.5523 14.4476 26 14.9999 26C15.5522 26 15.9999 25.5523 15.9999 25V21ZM19.9999 17C20.5522 17 20.9999 17.4477 20.9999 18V25C20.9999 25.5523 20.5522 26 19.9999 26C19.4476 26 18.9999 25.5523 18.9999 25V18C18.9999 17.4477 19.4476 17 19.9999 17ZM25.9999 15C25.9999 14.4477 25.5522 14 24.9999 14C24.4476 14 23.9999 14.4477 23.9999 15V25C23.9999 25.5523 24.4476 26 24.9999 26C25.5522 26 25.9999 25.5523 25.9999 25V15Z" fill="white" />
            </svg>
          </div>
        </div>
        <div className="order-boxes order-total">
          <div className="order-text">
            <h5 className="title">{orderOverview.countOrder}</h5>
            <h3>ອໍເດີທັງໝົດ</h3>
          </div>
          <div className="order-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#FF947A" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C12 11.7909 13.7909 10 16 10H22V14C22 16.2091 23.7909 18 26 18H28V26C28 28.2091 26.2091 30 24 30H16C13.7909 30 12 28.2091 12 26V14ZM16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21H18C18.5523 21 19 20.5523 19 20C19 19.4477 18.5523 19 18 19H16ZM16 23C15.4477 23 15 23.4477 15 24C15 24.5523 15.4477 25 16 25H20C20.5523 25 21 24.5523 21 24C21 23.4477 20.5523 23 20 23H16ZM24.6818 12.1988L24.5509 14.1629C24.5106 14.7666 25.0115 15.2674 25.6152 15.2272L27.5792 15.0962C28.4365 15.0391 28.8274 13.9989 28.2198 13.3913L26.3867 11.5582C25.7792 10.9507 24.7389 11.3415 24.6818 12.1988Z" fill="white" />
            </svg>
          </div>
        </div>
        <div className="order-boxes order-approved">
          <div className="order-text">
            <h5 className="title">{orderOverview.approved}</h5>
            <h3>ອໍເດີອະນຸມັດ</h3>
          </div>
          <div className="order-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#3CD856" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6261 13.2653L21.3263 13.7367C20.8222 13.8087 20.4103 14.049 20.1161 14.3811L12.4167 22.0806C11.6357 22.8616 11.6356 24.1279 12.4167 24.909L15.2451 27.7374C16.0262 28.5185 17.2925 28.5185 18.0736 27.7374L25.773 20.038C26.1051 19.7439 26.3454 19.332 26.4174 18.8279L26.8888 15.528C27.0774 14.2081 25.946 13.0767 24.6261 13.2653ZM22.3162 17.8379C22.7067 18.2284 23.3399 18.2285 23.7304 17.8379C24.1209 17.4474 24.1209 16.8142 23.7304 16.4237C23.3399 16.0332 22.7067 16.0332 22.3162 16.4237C21.9257 16.8142 21.9257 17.4474 22.3162 17.8379Z" fill="white" />
            </svg>
          </div>
        </div>
        <div className="order-boxes order-cancel">
          <div className="order-text">
            <h5 className="title">{orderOverview.cancel}</h5>
            <h3>ອໍເດີຍົກເລີກ</h3>
          </div>
          <div className="order-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#BF83FF" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 16C22 18.2091 20.2091 20 18 20C15.7908 20 14 18.2091 14 16C14 13.7909 15.7908 12 18 12C20.2091 12 22 13.7909 22 16ZM18 21C14.134 21 11 23.2386 11 26C11 27.1046 11.8954 28 13 28H23C24.1046 28 25 27.1046 25 26C25 23.2386 21.866 21 18 21ZM26 14C26.5523 14 27 14.4477 27 15V16H28C28.5523 16 29 16.4477 29 17C29 17.5523 28.5523 18 28 18H27V19C27 19.5523 26.5523 20 26 20C25.4477 20 25 19.5523 25 19V18H24C23.4477 18 23 17.5523 23 17C23 16.4477 23.4477 16 24 16H25V15C25 14.4477 25.4477 14 26 14Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
      <div className="orders-button">
        <button type="button" className={`btn-order btn-waiting ${orderStatus === 1 ? 'active' : ''} `} onClick={() => handleClick(1)}>ລໍຖ້າອະນຸມັດ</button>
        <button type="button" className={`btn-order btn-order-cancel ${orderStatus === 2 ? 'active' : ''} `} onClick={() => handleClick(2)}>ອໍເດີທີຍົກເລີກ</button>
        <button type="button" className={`btn-order btn-order-success ${orderStatus === 3 ? 'active' : ''} `} onClick={() => handleClick(3)}>ປະຫວັດການຂາຍ</button>
      </div>

      {orderStatus === 1 && <ListOrders />}
      {orderStatus === 2 && <CancelOrders />}
      {orderStatus === 3 && <HistoryOrders />}
    </div>
  )
}

export default HomeOrders
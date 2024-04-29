import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import TableOrderUser from '../../../components/TableOrderUser';
import { GetAllOrders } from '../../../functions/Orders';
import { useSelector,useDispatch } from 'react-redux';
import { formatPrice } from "../../../functions/FormatPrices"
import moment from 'moment';
const CancelOrders = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [cancelOrder, setCancelOrder] = useState([]);
  const [cancelOrderEmpty, setCancelOrderEmpty] = useState("");
  const dispatch = useDispatch();


// customize style cell of table
   const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        fontSize: "15px",
        justifyContent: "center",
        fontWeight: "bold",
        backgroundColor: "#00A5E8",
        color: "white",
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        justifyContent: "center",
      },
    },
  };
// columns header of table
  const columns = [
    {
      name: "ຮູບພາບ",
      selector: (row) => (row.products[0].image),
      cell: row => (
        <div >
          <img className="image-product" src={row.products[0].image} alt={row.products[0].name} width={50} height={50} />
        </div>
      ),
      sortable: true,
      width: '100px'
    },
    {
      name: "ໍຊື່ສິນຄ້າ",
      selector: (row) => row.products[0].name,
      sortable: true,
      width: '130px'
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.products[0].qty,
      sortable: true,
      width: '100px'
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.products[0].price),
      width: '118px'
    },
    {
      name: "ຜູ້ຮັບ",
      sortable: true,
      selector: (row) => row.orderFor.firstName,
      cell: row => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.orderFor.firstName} ${row.orderFor.lastName}`}</p>
          </div>
        </div>
      ),
      width: '190px'
    },
    {
      name: "ວັນທີສັ່ງຊື້",
      sortable: true,
      selector: (row) => row.createdAt,
      cell: row => (<p>{moment(row.createdAt).format("DD-MM-YYYY")}</p>),
      width: '118px'
    },
    {
      name: "ຈຸດໝາຍ",
      sortable: true,
      selector: (row) => row.delivery.type,
      cell: row => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.delivery.type}</p>
            <span>{`${row.delivery.express}`}</span>
          </div>
        </div>
      ),
      width: '162px'
    },
    {
      name: "ສະຖານະ",
      sortable: true,
      selector: (row) => row.status,
      cell: row => (
        <div className="status-status">
          <p style={{ color: '#D85321', fontWeight: "bold" }}>{row.status}</p>
        </div>
      ),
      width: '162px'
    },
    {
      name: "ເພີ່ມເຕີມ",
      sortable: true,
      selector: (row) => row._id,
      cell: row => (
        <div className="status-status">
          <Link to={`/HomeOrders/infoCancel/${row._id}`} style={{ textDecoration: 'none' }}>
            <p style={{ color: '#00A4CD', fontWeight: "bold" }}>ລາຍລະອຽດ</p>
          </Link>
        </div>
      ),
      width: '162px'
    },
  
  ];

  // load all cancel orders
  useEffect(() => {
    GetAllOrders(users.token, "","","","cancel").then(res => {
      setCancelOrder(res.data.data);
    }).catch(err => {
      setCancelOrderEmpty(err.response.data.message);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: err.response.data.message,
      });
      
      if (err.response.data.message === "unauthorized") {
        dispatch({
          type: "USER_LOGOUT",
          payload: null,
        });
        navigate("/");
      }
    })
  }, []);


  return (
    <>
      {
        <div>
          <TableOrderUser cancelOrderEmpty={cancelOrderEmpty} Status={"cancel"} setCancelOrder={setCancelOrder} setCancelOrderEmpty={setCancelOrderEmpty} columns={columns} customStyles={customStyles} data={cancelOrder} />
        </div>
      }

    </>

  )
}

export default CancelOrders
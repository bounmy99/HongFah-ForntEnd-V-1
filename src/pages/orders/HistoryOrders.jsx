import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import TableComponent from '../../components/TableComponent';
import { Empty } from 'antd';
import { GetAllOrders } from '../../functions/Orders';
import { useSelector, useDispatch } from 'react-redux';


const HistoryOrders = () => {
  const { users } = useSelector((state) => ({ ...state }))
  const [successOrders, setSuccessOrders] = useState([]);
  const [successOrdersEmpty, setSuccessOrdersEmpty] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatPrice = (value)=>{
    let val = (value / 1).toFixed(0).replace(",", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");      
   }

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
  
  const columns = [
    {
      name: "ຮູບພາບ",
      selector: (row) => (row.products[0].image),
      cell: row => (
        <div className="name-product">
          <img src={row.products[0].image} alt={row.products[0].name} width={50} height={50} />
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
      cell: row => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.orderFor.firstName} ${row.orderFor.lastName}`}</p>
            <span>Daimonds</span>
          </div>
        </div>
      ),
      width: '190px'
    },
    {
      name: "ວັນທີສັ່ງຊື້",
      sortable: true,
      selector: (row) => row.createdAt,
      cell: row => (<p>{new Date(row.createdAt).toLocaleDateString()}</p>),
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
      name: "ຄະແນນ",
      sortable: true,
      selector: (row) => row.totalPoint,
      cell: row => (
        <div className="status-score-history">
          <p style={{ color: "#00B488", fontWeight: "bold", fontSize: 15 }}>{row.totalPoint}</p>
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
          <Link to={`/HomeOrders/infoHistory/${row._id}`} style={{ textDecoration: 'none' }}>
            <p style={{ color: '#00A4CD', fontWeight: "bold" }}>ລາຍລະອຽດ</p>
          </Link>
        </div>
      ),
      width: '162px'
    },
  ];

  useEffect(() => {
    GetAllOrders(users.token, "success").then(res => {
      setSuccessOrders(res.data.data);
    }).catch(err => {
      console.log(err)
      setSuccessOrdersEmpty(err.response.data.message);
      if(err.response.data.message === 'unauthorized'){
        dispatch({
          type: 'USER_LOGOUT',
          payload: null
        })
        navigate('/')
      }
    })
  }, []);

  console.log("Success Orders", successOrders)
  return (
    <>
      {
        successOrdersEmpty ?
          <div className="empty-card">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  <a>{successOrdersEmpty}</a>
                </span>
              }
            >
            </Empty>
          </div>
          :
          <div>
            <TableComponent columns={columns} customStyles={customStyles} data={successOrders} />
          </div>
      }

    </>

  )
}

export default HistoryOrders
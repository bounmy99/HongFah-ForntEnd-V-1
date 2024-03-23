import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Empty } from 'antd';

// Functions
import TableComponent from '../../components/TableComponent';
import { GetAllOrders } from '../../functions/Orders';



const ListOrders = () => {
  const { users } = useSelector((state) => ({ ...state }))
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderEmpty, setEmptyOrder] = useState('');
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
      name: "ສະຖານະ",
      selector: (row) => row.status,
      cell: row => (
        <div className="status-order">
          <Link to={`/HomeOrders/InfoOrders/${row._id}`} style={{ textDecoration: 'none' }}>
            <p className="success">{`ອະນຸມັດ`}</p>
            <p className="unsuccess">ປະຕິເສດ</p>
          </Link>
        </div>
      ),
      sortable: true,
      width: '100px'
    },
    {
      name: "ຮູບພາບ",
      selector: (row) => (row.products[0].image),
      cell: row => (
        <div className="name-product">
          <img src={row.products[0].image} alt="product" width={50} height={50} />
        </div>
      ),
      sortable: true,
      width: '88px'
    },
    {
      name: "ໍຊື່ສິນຄ້າ",
      selector: (row) => row.products[0].name,
      sortable: true,
      width: '110px'
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.products[0].qty,
      sortable: true,
      width: '90px'
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.products[0].price),
      width: '118px'
    },
    {
      name: "ຊ່ອງທາງສຳລະ",
      sortable: true,
      selector: (row) => row.paymentType,
      cell: row => (
        <>
          {row.paymentType === "BCEL ONE"
            ? <p style={{ color: '#FF0000' }}>{row.paymentType}</p>
            : <p style={{ color: '#00628A' }}>{row.paymentType}</p>
          }
        </>
      ),
      width: '110px'
    },
    {
      name: "ຜູ້ຮັບ",
      sortable: true,
      selector: (row) => row.delivery.address,
      cell: row => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.delivery.address}</p>
            <p>{row.delivery.phoneNumber}</p>
            <span>{row.delivery.express}</span>
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
            {/* <span>ເສດຖາ</span> */}
          </div>
        </div>
      ),
      width: '162px'
    }
  ];

  useEffect(() => {
    setLoading(true)
    GetAllOrders(users.token, "await").then(res => {
      setLoading(false)
      setOrders(res.data.data);
    }).catch(err => {
      setLoading(false)
      console.log(err)
      setEmptyOrder(err.response.data.message);
      if(err.response.data.message === 'unauthorized'){
        dispatch({
          type: 'USER_LOGOUT',
          payload: null
        })
        navigate('/')
      }
    })
  }, []);

  console.log(orders)

  return (
    <>
      {orderEmpty ?
        <div className="empty-card">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <a>{orderEmpty}</a>
              </span>
            }
          >
          </Empty>
        </div>
        :
        <div>
          <TableComponent columns={columns} customStyles={customStyles} data={orders} loading={loading} />
        </div>
      }
    </>

  )
}
export default ListOrders
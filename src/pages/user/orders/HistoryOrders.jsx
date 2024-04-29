import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import TableOrderUser from '../../../components/TableOrderUser';
import { GetAllOrdersExport } from '../../../functions/Orders';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from "../../../functions/FormatPrices"
import moment from "moment"
import { Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
const HistoryOrders = ({btnExport}) => {
  const { users } = useSelector((state) => ({ ...state }))
  const [successOrders, setSuccessOrders] = useState([]);
  const [successOrdersEmpty, setSuccessOrdersEmpty] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getData = JSON.parse(localStorage.getItem("data"));

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
      name: "ໍຊື່ສິນຄ້າ",
      selector: (row) => row.productname,
      sortable: true,
      width: "130px",
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.productqty,
      sortable: true,
      width: "100px",
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.productprice),
      width: "118px",
    },
    {
      name: "ລາຄາລວມ",
      sortable: true,
      selector: (row) => formatPrice(row.totalPrice),
      width: "118px",
    },
    {
      name: "ລະຫັດລູກຄ້າ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.customeruserCode}`}</p>
          </div>
        </div>
      ),
      width: "190px",
    },
    {
      name: "ຊື່ລູກຄ້າ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.customerfirstName}`}</p>
          </div>
        </div>
      ),
      width: "190px",
    },
    {
      name: "ວັນທີສັ່ງຊື້",
      sortable: true,
      selector: (row) => row.createdAt,
      cell: (row) => <p>{new Date(row.createdAt).toLocaleDateString()}</p>,
      width: "118px",
    },
    {
      name: "ປະເພດການຊຳລະ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.paymentType}</p>
          </div>
        </div>
      ),
      width: "162px",
    },
    {
      name: "ຄະແນນ",
      sortable: true,
      selector: (row) => row.productpoint,
      cell: (row) => (
        <div className="status-score-history">
          <p style={{ color: "#00B488", fontWeight: "bold", fontSize: 15 }}>
            {row.productpoint}
          </p>
        </div>
      ),
      width: "162px",
    },
    {
      name: "ຄະແນນລວມ",
      sortable: true,
      selector: (row) => row.totalPoint,
      cell: (row) => (
        <div className="status-score-history">
          <p style={{ color: "#00B488", fontWeight: "bold", fontSize: 15 }}>
            {row.totalPoint}
          </p>
        </div>
      ),
      width: "162px",
    },
    {
      name: "ສະຖານະ",
      sortable: true,
      cell: (row) => (
        <div className="status-score-history">
          {`${row.status}`}
        </div>
      ),
      width: "162px",
    },
    {
      name: "ເພີ່ມເຕີມ",
      sortable: true,
      cell: (row) => (
        <div className="status-status">
          <Tooltip
            title="ກົດເພື່ອເບິ່ງລາຍລະອຽດ"
            color="#00A5E8"
            placement="topRight"
          >
            <Link
              to={`/HomeOrders/infoHistory/${row.id}`}
              style={{ textDecoration: "none" }}
            >
              <EyeOutlined
                style={{ color: "#00A4CD", fontSize: 20, margin: 5 }}
              />
            </Link>
          </Tooltip>
        </div>
      ),
      width: "162px",
    },
  ];
// load all success orders
  useEffect(() => {
    GetAllOrdersExport(getData.token,"","","", "success").then(res => {
      setSuccessOrders(res.data.data);
    }).catch(err => {
      setSuccessOrdersEmpty(err.response.data.message);
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
          <div>
            <TableOrderUser btnExport={btnExport} successOrdersEmpty={successOrdersEmpty} Status={"success"} setSuccessOrders={setSuccessOrders}  setSuccessOrdersEmpty={setSuccessOrdersEmpty} columns={columns} customStyles={customStyles} data={successOrders} />
          </div>
    </>

  )
}

export default HistoryOrders
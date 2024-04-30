import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableOrderAdmin from "../../../components/TableOrderAdmin";
import { Empty, Spin, Image, Tooltip } from "antd";
import { GetAllOrderAdmin,GetAllOrderAdminExport } from "../../../functions/OrdersAdmin";
import { useSelector, useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { formatPrice } from "../../../functions/FormatPrices";
import EmptyContent from "../../../components/EmptyContent";

const HistoryProduct = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const [successOrders, setSuccessOrders] = useState([]);
  const [successOrdersEmpty, setSuccessOrdersEmpty] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  // customize style cell of table
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "15px",
        justifyContent: "center",
        fontWeight: "bold",
        backgroundColor: "#00A5E8",
        color: "white",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        justifyContent: "center",
      },
    },
  };
  // colums header of data
  const columns = [
    {
      name: "ລະຫັດແອັດມິນ",
      selector: (row) => row.adminuserCode,
      sortable: true,
      width: "100px",
    },
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
      name: "ຜູ້ຂາຍ",
      sortable: true,
      cell: (row) => (
        <div className="status-score-history">
          {`${row.adminfirstName}`}
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
              to={`/listProducts/DetailProductSale/${row.id}`}
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
  // load data
  useEffect(() => {
    setLoading(true);
    GetAllOrderAdminExport(users.token,"true").then((res) => {
        setLoading(false);
        setSuccessOrders(res.data.data);
      }).catch((err) => {
        setLoading(false);
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
      });
  }, []);

  return (
    <>
      {successOrdersEmpty ? (
        <EmptyContent Messages={successOrdersEmpty} />
      ) : (
        <div>
          {loading ? (
            <div className="empty-card">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    <a>loading.....</a> <Spin />
                  </span>
                }
              ></Empty>
            </div>
          ) : (
            <TableOrderAdmin
              columns={columns}
              customStyles={customStyles}
              data={successOrders}
            />

          )}
        </div>
      )}
    </>
  );
};

export default HistoryProduct;

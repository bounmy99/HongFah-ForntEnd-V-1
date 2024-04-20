import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../../../components/TableComponent";
import { Empty, Spin, Image, Tooltip } from "antd";
import { GetAllOrderAdmin } from "../../../functions/OrdersAdmin";
import { useSelector, useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { formatPrice } from "../../../functions/FormatPrices";

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
      name: "ຮູບພາບ",
      selector: (row) => row.products[0].image,
      cell: (row) => (
        <div className="name-product">
          <Image
            src={row.products[0] && row.products[0].image}
            alt={row.products.name}
            width={50}
            height={50}
          />
        </div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "ໍຊື່ສິນຄ້າ",
      selector: (row) => row.products[0] && row.products[0].name,
      sortable: true,
      width: "130px",
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.products[0] && row.products[0].qty,
      sortable: true,
      width: "100px",
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.products[0] && row.products[0].price),
      width: "118px",
    },
    {
      name: "ຊື່ລູກຄ້າ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.customer.firstName} ${row.customer.lastName}`}</p>
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
      selector: (row) => row.admin[0],
      cell: (row) => (
        <div className="status-score-history">
          {`${row.admin && row.admin.firstName} ${
            row.admin && row.admin.lastName
          }`}
        </div>
      ),
      width: "162px",
    },
    {
      name: "ເພີ່ມເຕີມ",
      sortable: true,
      selector: (row) => row._id,
      cell: (row) => (
        <div className="status-status">
          <Tooltip
            title="ກົດເພື່ອເບິ່ງລາຍລະອຽດ"
            color="#00A5E8"
            placement="topRight"
          >
            <Link
              to={`/listProducts/DetailProductSale/${row._id}`}
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
    GetAllOrderAdmin(users.token)
      .then((res) => {
        setLoading(false);
        setSuccessOrders(res.data.data);
      })
      .catch((err) => {
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
          ></Empty>
        </div>
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
            <TableComponent
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

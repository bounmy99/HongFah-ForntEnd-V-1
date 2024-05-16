import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableOrderAdmin from "../../../components/TableOrderAdmin";
import { Tooltip } from "antd";
import { GetAllOrderAdminExport } from "../../../functions/OrdersAdmin";
import { useSelector, useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { formatPrice } from "../../../functions/FormatPrices";
import EmptyContent from "../../../components/EmptyContent";
import moment from "moment";

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
      name: "ລະຫັດຜູ້ຂາຍ",
      selector: (row) => row.adminuserCode ? row.adminuserCode : "ບໍ່ມີ",
      sortable: true,
      width: "120px",
    },
    {
      name: "ຜູ້ຂາຍ",
      sortable: true,
      cell: (row) => (
        <div className="status-score-history">
          {`${row.adminfirstName ? row.adminfirstName : "ບໍ່ມີ"}`}
        </div>
      ),
      width: "162px",
    },
    {
      name: "ລະຫັດລູກຄ້າ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.customeruserCode ? row.customeruserCode : "ບໍ່ມີ"}`}</p>
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
            <p>{`${row.customerfirstName ? row.customerfirstName : "ບໍ່ມີ"}`}</p>
          </div>
        </div>
      ),
      width: "190px",
    },
    {
      name: "ໍຊື່ສິນຄ້າ",
      selector: (row) => row.productname ? row.productname : "ບໍ່ມີ",
      sortable: true,
      width: "130px",
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.productprice) ? formatPrice(row.productprice) : "ບໍ່ມີ",
      width: "118px",
    },
   
    {
      name: "ຄະແນນສິນຄ້າ",
      selector: (row) => row.productpoint ? row.productpoint : "ບໍ່ມີ",
      sortable: true,
      width: "100px",
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.productqty ? row.productqty : "ບໍ່ມີ",
      sortable: true,
      width: "100px",
    },
    {
      name: "ຈຳນວນລວມ",
      selector: (row) => row.totalQty ? row.totalQty : "ບໍ່ມີ",
      sortable: true,
      width: "110px",
    },
   
    {
      name: "ລາຄາລວມ",
      sortable: true,
      selector: (row) => formatPrice(row.totalPrice) ? formatPrice(row.totalPrice) : "ບໍ່ມີ",
      width: "118px",
    },
    {
      name: "ເງິນທີ່ໄດ້ຮັບທັງໝົດ",
      sortable: true,
      selector: (row) => formatPrice(row.totalCashback) ? formatPrice(row.totalCashback) : "ບໍ່ມີ",
      width: "150px",
    },
    {
      name: "ຄະແນນລວມທັງໝົດ",
      sortable: true,
      cell: (row) => (
        <div className="status-score-history">
          <p style={{ color: "#00B488", fontWeight: "bold", fontSize: 15 }}>
            {row.totalPoint ? row.totalPoint : "ບໍ່ມີ"}
          </p>
        </div>
      ),
      width: "162px",
    },

    {
      name: "ປະເພດການຊຳລະ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.paymentType ? row.paymentType : "ບໍ່ມີ"}</p>
          </div>
        </div>
      ),
      width: "162px",
    },

    {
      name: "ສະຖານະ",
      sortable: true,
      cell: (row) => (
        <div className="status-score-history">
             {`${row.status ? row.status  : <p style={{ color: "#fc1219", fontWeight: "bold", fontSize: 15 }}>ບໍ່ມີ</p> }`}
        </div>
      ),
      width: "162px",
    },
    {
      name: "ວັນທີສັ່ງຊື້",
      sortable: true,
      selector: (row) => row.createdAt,
      cell: (row) => <p>{moment(row.createdAt).format("DD-MM-YYYY")}</p>,
      width: "118px",
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
        setSuccessOrdersEmpty("ບໍ່ມີຂໍ້ມູນ");

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
          title: "ບໍ່ມີຂໍ້ມູນ",
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
            <EmptyContent Messages={"ກຳລັງໂຫຼດ..."} />
          ) : (
            <TableOrderAdmin
              columns={columns}
              customStyles={customStyles}
              data={successOrders}
              setSuccessOrders={setSuccessOrders}
              setSuccessOrdersEmpty={setSuccessOrdersEmpty}
              Status={"success"}
            />

          )}
        </div>
      )}
    </>
  );
};

export default HistoryProduct;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import Swal from "sweetalert2";
// Functions
import TableOrderUser from "../../../components/TableOrderUser";
import { GetAllOrders } from "../../../functions/Orders";
import { formatPrice } from "../../../functions/FormatPrices";
import EmptyContent from "../../../components/EmptyContent";

const ListOrders = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderEmpty, setEmptyOrder] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  // columns header of table
  const columns = [
    {
      name: "ສະຖານະ",
      selector: (row) => row.status,
      cell: (row) => (
        <div className="status-order">
          <Link
            to={`/HomeOrders/InfoOrders/${row._id}`}
            style={{ textDecoration: "none" }}
          >
            <p className="success">{`ອະນຸມັດ`}</p>
            <p className="unsuccess">ປະຕິເສດ</p>
          </Link>
        </div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "ຮູບພາບ",
      selector: (row) => row.products[0].image,
      cell: (row) => (
        <div>
          <img
            className="image-product"
            src={row.products[0].image}
            alt="product"
            width={50}
            height={50}
          />
        </div>
      ),
      sortable: true,
      width: "88px",
    },
    {
      name: "ໍຊື່ສິນຄ້າ",
      selector: (row) => row.products[0].name,
      sortable: true,
      width: "110px",
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.products[0].qty,
      sortable: true,
      width: "90px",
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.products[0].price),
      width: "118px",
    },
    {
      name: "ຊ່ອງທາງສຳລະ",
      sortable: true,
      selector: (row) => row.paymentType,
      cell: (row) => (
        <>
          {row.paymentType === "BCEL ONE" ? (
            <p style={{ color: "#FF0000" }}>{row.paymentType}</p>
          ) : (
            <p style={{ color: "#00628A" }}>{row.paymentType}</p>
          )}
        </>
      ),
      width: "110px",
    },
    {
      name: "ຜູ້ຮັບ",
      sortable: true,
      selector: (row) => row.delivery.address,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.delivery.address}</p>
            <p>{row.delivery.phoneNumber}</p>
            <span>{row.delivery.express}</span>
          </div>
        </div>
      ),
      width: "190px",
    },
    {
      name: "ວັນທີສັ່ງຊື້",
      sortable: true,
      selector: (row) => row.createdAt,
      cell: (row) => <p>{moment(row.createdAt).format("DD-MM-YYYY")}</p>,
      width: "118px",
    },
    {
      name: "ຈຸດໝາຍ",
      sortable: true,
      selector: (row) => row.delivery.type,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.delivery.type}</p>
            {/* <span>ເສດຖາ</span> */}
          </div>
        </div>
      ),
      width: "162px",
    },
  ];
  // load all cancel orders
  useEffect(() => {
    setLoading(true);
    GetAllOrders(users.token, "", "", "", "await")
      .then((res) => {
        setLoading(false);
        setOrders(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setEmptyOrder("ບໍ່ມີຂໍ້ມູນ");
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
    {
      <div>
        <TableOrderUser
          Status={"await"}
          orderEmpty={orderEmpty}
          setOrders={setOrders}
          setEmptyOrder={setEmptyOrder}
          columns={columns}
          customStyles={customStyles}
          data={orders}
          loading={loading}
        />
      </div>
    }
      
    </>
  );
};
export default ListOrders;

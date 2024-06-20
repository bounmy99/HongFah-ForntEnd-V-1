import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableOrderUser from "../../../components/TableOrderUser";
import { GetAllOrders } from "../../../functions/Orders";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../../functions/FormatPrices";
import Swal from "sweetalert2";
import moment from "moment";
import EmptyContent from "../../../components/EmptyContent";
const CancelOrders = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [cancelOrder, setCancelOrder] = useState([]);
  const [cancelOrderEmpty, setCancelOrderEmpty] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
      name: "ຮູບພາບ",
      cell: (row) => (
        <div>
          <img
            className="image-product"
            src={row.products[0].image}
            alt={row.products[0].name}
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
      selector: (row) => row.products[0].name ? row.products[0].name : "ບໍ່ມີ",
      sortable: true,
      width: "130px",
    },
    {
      name: "ຈຳນວນ",
      selector: (row) => row.products[0].qty ? row.products[0].qty : "ບໍ່ມີ",
      sortable: true,
      width: "100px",
    },
    {
      name: "ລາຄາ",
      sortable: true,
      selector: (row) => formatPrice(row.products[0].price) ? formatPrice(row.products[0].price) : "ບໍ່ມີ",
      width: "118px",
    },
    {
      name: "ຜູ້ຮັບ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{`${row.orderFor.firstName ? row.orderFor.firstName : "ບໍ່ມີ"} ${row.orderFor.lastName ? row.orderFor.lastName : "ບໍ່ມີ"}`}</p>
          </div>
        </div>
      ),
      width: "190px",
    },
    {
      name: "ວັນທີສັ່ງຊື້",
      sortable: true,
      cell: (row) => <p>{moment(row.createdAt).format("DD-MM-YYYY") ? moment(row.createdAt).format("DD-MM-YYYY") : "ບໍ່ມີ"}</p>,
      width: "118px",
    },
    {
      name: "ຈຸດໝາຍ",
      sortable: true,
      cell: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row.delivery.type ? row.delivery.type : "ບໍ່ມີ"}</p>
            <span>{`${row.delivery.express ? row.delivery.express : "ບໍ່ມີ"}`}</span>
          </div>
        </div>
      ),
      width: "162px",
    },
    {
      name: "ສະຖານະ",
      sortable: true,
      selector: (row) => row.status,
      cell: (row) => (
        <div className="status-status">
          <p style={{ color: "#D85321", fontWeight: "bold" }}>{row.status ? row.status : "ບໍ່ມີ"}</p>
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
          <Link
            to={`/HomeOrders/infoCancel/${row._id}`}
            style={{ textDecoration: "none" }}
          >
            <p style={{ color: "#00A4CD", fontWeight: "bold" }}>ລາຍລະອຽດ</p>
          </Link>
        </div>
      ),
      width: "162px",
    },
  ];

  // load all cancel orders
  useEffect(() => {
    setLoading(true)
    GetAllOrders(users.token, "", "", "", "cancel")
      .then((res) => {
        setCancelOrder(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setCancelOrderEmpty("ບໍ່ມີຂໍ້ມູນ");
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
        cancelOrder === null ?
        <EmptyContent Messages={"ບໍ່ມີຂໍ້ມູນ"}/>
        :
        <div>
          <TableOrderUser
            cancelOrderEmpty={cancelOrderEmpty}
            Status={"cancel"}
            setCancelOrder={setCancelOrder}
            setCancelOrderEmpty={setCancelOrderEmpty}
            columns={columns}
            customStyles={customStyles}
            data={cancelOrder}
            loading={loading}
          />
        </div>
      }
    </>
  );
};

export default CancelOrders;

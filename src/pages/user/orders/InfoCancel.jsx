import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Image } from "antd";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// functions
import { GetOneOrders } from "../../../functions/Orders";
import { formatPrice } from "../../../functions/FormatPrices";
import Loading from "../../../components/Loadding";

const InfoOrders = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSiize, setPageSiize] = useState(1);
  const [loading, setLoading] = useState(false);
  let getData = JSON.parse(localStorage.getItem("data"));
  // load one cancel orders
  useEffect(() => {
    setLoading(true);
    GetOneOrders(getData.token, id)
      .then((res) => {
        setLoading(false);
        setOrder(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
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
  // columns header of table
  const columns = [
    {
      title: "ລະຫັດສິນຄ້າ",
      dataIndex: "productCode",
      key: "productCode",
      width: "120px",
    },
    {
      title: "ຮູບສິນຄ້າ",
      dataIndex: "image",
      key: "image",
      render: (row) => <img src={row} alt={row} className="img-rounded" />,
      width: "60px",
    },

    {
      title: "ຊື່ສິນຄ້າ",
      dataIndex: "name",
      key: "name",
      width: "232px",
    },
    {
      title: "ຈຳນວນ",
      dataIndex: "qty",
      key: "qty",
      width: "50px",
    },
    {
      title: "ລາຄາ",
      dataIndex: "price",
      render: (price) => formatPrice(price),
      key: "price",
      width: "162px",
    },
  ];

  return (
    <div className="card-main">
      <div className="Card">
        <div className="card-header">
          <div className="text-tilte">
            <button
              onClick={() => {
                navigate("/HomeOrders/users", { state: { key: 2 } });
              }}
              className="text-link"
            >
              <i className="bx bx-chevron-left"></i>
              ກັບໄປໜ້າກ່ອນ
            </button>
          </div>
        </div>
        <div className="card-info-content">
          {loading ? (
                <Loading paragraph={13}/>
          ) : (
            <>
              <div className="info-left">
                <h3>ຊຳລະຜ່ານ BCEL ONE</h3>
                <div className="image-transfer">
                  {order.slip && order.slip[0] ? (
                    <img src={order.slip && order.slip[0]} alt="" />
                  ) : (
                    <div className="text-no-image">
                      <h3>ບໍ່ມີຮູບພາບ</h3>
                    </div>
                  )}
                </div>
              </div>
              <div className="info-right">
                <h3>ລາຍລະອຽດຜູ້ຮັບ</h3>
                <div className="infomation">
                  <div className="form-group">
                    <div className="input-group">
                      <label htmlFor="name">ຊື່ຜູ້ຮັບ:</label>
                      <div className="flex">
                        <i className="bx bx-user"></i>
                        <label>
                          {order.orderFor &&
                            `${order.orderFor.firstName} ${order.orderFor.lastName}`}
                        </label>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="name">ລະຫັດສະມາຊິກຜູ້ຮັບ:</label>
                      <div className="flex">
                        <i className="bx bx-user"></i>
                        <label>
                          {order.orderFor && order.orderFor.userCode}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <label htmlFor="name">ເບີໂທຜູ້ຮັບ:</label>
                      <div className="flex">
                        <i className="bx bxs-phone"></i>
                        <label>
                          {order.orderFor && order.orderFor.phoneNumber}
                        </label>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="name">ສະຖານທີຈັດສົ່ງ:</label>
                      <div className="flex">
                        <i className="bx bx-user"></i>
                        <label>
                          {order.delivery &&
                            `${order.delivery.address}, ${order.delivery.province}, ${order.delivery.district}, ${order.delivery.village}`}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail-products">
                  <div className="text-title">
                    <h5>ລາຍລະອຽດສິນຄ້າ</h5>
                  </div>
                  <div className="content-detail Card">
                    <Table
                      dataSource={order.products}
                      columns={columns}
                      pagination={{
                        current: page,
                        pageSize: pageSiize,
                        onChange: (page, pageSiize) => {
                          setPage(page);
                          setPageSiize(pageSiize);
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoOrders;

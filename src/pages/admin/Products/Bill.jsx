import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetOneOrderAdmin } from "../../../functions/OrdersAdmin";
import { Spin, Table, Image } from "antd";
import NoImage from "../../../assets/image/no-image.png";
import ImageLogo from "../../../assets/logo/Logo1.png"
import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
const Bill = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);


  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => users.role === "super" ? navigate("/listProducts/saleProducts", { state: { key: 3 } }) : navigate("/listProducts/saleProducts/users", { state: { key: 3 } }),
    removeAfterPrint: true,
    onPrintError:(error)=> console.log("Print Error...?",error)
  });

  // columns header of data
  const columns = [
    {
      title: "ລະຫັດສິນຄ້າ",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "ຮູບພາບ",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image style={{ width: 60, height: 55 }} src={image} />
      ),
    },
    {
      title: "ຊື່",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ຈຳນວນ",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "ລາຄາ",
      dataIndex: "price",
      key: "price",
    },
    ,
    {
      title: "ຈຳນວນເງິນ",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    ,
    {
      title: "ຈຳນວນຄະແນນ",
      dataIndex: "totalPoint",
      key: "totalPoint",
    },
    {
      title: "ເງິນທີ່ໄດ້ຮັບ",
      dataIndex: "totalCashback",
      key: "totalCashback",
    },
  ];
  // load data
  useEffect(() => {
    setLoading(true);
    GetOneOrderAdmin(users.token, id)
      .then((res) => {
        setDetail(res.data.data);
        setProduct(res.data.data.products);
        setLoading(false);
      })
      .catch((err) => {
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
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="card-main">
        <div className="button-print">
          <button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            ພິມບິນ <PrinterOutlined />
          </button>
        </div>

        <Spin spinning={loading}>
          <div className="detail-cart-sale" ref={contentToPrint}>
           <div className="logo-images">
            <img src={ImageLogo} alt="" />
            <h3 >ບໍລິສັດ ຫົງຟັາ ຈຳກັດ</h3>
           </div>
            <div className="detail-cart-top">
              <div className="detail-cart-top-left">
                <p>
                  ຜູ້ຂາຍ :
                  <span>
                    {detail.admin &&
                      `${
                        detail.admin.firstName
                          ? detail.admin.firstName
                          : "ບໍ່ມີ"
                      } ${
                        detail.admin.lastName ? detail.admin.lastName : "ບໍ່ມີ"
                      }`}
                  </span>
                </p>
                <p>
                  ປະເພດການຊຳລະ :{" "}
                  <span>
                    {detail.paymentType ? detail.paymentType : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ເງິນທອນທັງໝົດ :{" "}
                  <span>
                    {detail.totalCashback ? detail.totalCashback : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ຄະແນນລວມ :{" "}
                  <span>{detail.totalPoint ? detail.totalPoint : "ບໍ່ມີ"}</span>
                </p>
                <p>
                  ລາຍຈ່າຍລວມ :{" "}
                  <span>{detail.totalPrice ? detail.totalPrice : "ບໍ່ມີ"}</span>
                </p>
                <p>
                  ຈຳນວນທັງໝົດ :{" "}
                  <span>{detail.totalQty ? detail.totalQty : "ບໍ່ມີ"}</span>
                </p>
                <p>
                  ສະຖານະ :<span className="detail-status">{detail.status}</span>
                </p>
              </div>
              <div className="detail-cart-top-right">
                <div>
                  <span>
                    {detail.customer?.profile ? (
                      <Image
                        src={detail.customer?.profile}
                        className="image-custormer"
                      />
                    ) : (
                      <Image src={NoImage} className="image-custormer" />
                    )}
                  </span>
                </div>
                <p>ຮູບພາບ</p>
                <p>
                  ຊື່ :
                  <span>
                    {detail.customer?.firstName
                      ? detail.customer?.firstName
                      : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ນາມສະກຸນ :
                  <span>
                    {detail.customer?.lastName
                      ? detail.customer?.lastName
                      : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ລະຫັດພະນັກງານ :
                  <span>
                    {detail.customer?.userCode
                      ? detail.customer?.userCode
                      : "ບໍ່ມີ"}
                  </span>
                </p>
              </div>
            </div>
            <div className="detail-cart-bottom">
              <Table
                columns={columns}
                pagination={false}
                dataSource={products}
              />
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Bill;

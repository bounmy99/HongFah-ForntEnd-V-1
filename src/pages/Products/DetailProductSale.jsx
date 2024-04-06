import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetOneOrderAdmin } from "../../functions/OrdersAdmin";
import { Spin, Table, Image } from "antd";
import NoImage from "../../assets/image/no-image.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const DetailProductSale = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSiize, setPageSiize] = useState(2);

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
      render: (image) => <Image style={{ width: 60 }} src={image} />,
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

  //   console.log(products)

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
        <Spin spinning={loading}>
          <div className="detail-cart-sale">
            <div
              className="btn-back"
              onClick={() =>
                navigate("/listProducts/saleProducts", { state: { key: 3 } })
              }
            >
              <ArrowLeftOutlined className="icon-back" /> ຍ້ອນກັບ
            </div>
            <div className="detail-cart-top">
              <div className="detail-cart-top-left">
                <p>
                  ຜູ້ຂາຍ :{" "}
                  <span>
                    {detail.admin &&
                      `${detail.admin.firstName} ${detail.admin.lastName}`}
                  </span>
                </p>
                <p>
                  ປະເພດການຊຳລະ : <span>{detail.paymentType}</span>
                </p>
                <p>
                  ເງິນທອນທັງໝົດ : <span>{detail.totalCashback}</span>
                </p>
                <p>
                  ຄະແນນລວມ : <span>{detail.totalPoint}</span>
                </p>
                <p>
                  ລາຍຈ່າຍລວມ : <span>{detail.totalPoint}</span>
                </p>
                <p>
                  ຈຳນວນທັງໝົດ : <span>{detail.totalQty}</span>
                </p>
                <p>
                  ສະຖານະ :{" "}
                  <span className="detail-status">{detail.status}</span>
                </p>
              </div>
              <div className="detail-cart-top-right">
                <div>
                  <span>
                    {detail.customer && detail.customer.profile ? (
                      <Image
                        src={detail.customer && detail.customer.profile}
                        className="image-custormer"
                      />
                    ) : (
                      <Image src={NoImage} className="image-custormer" />
                    )}
                  </span>
                </div>
                <p>ຮູບພາບ</p>
                <p>
                  ຊື່ :{" "}
                  <span>{detail.customer && detail.customer.firstName}</span>
                </p>
                <p>
                  ນາມສະກຸນ :{" "}
                  <span>{detail.customer && detail.customer.lastName}</span>
                </p>
                <p>
                  ລະຫັດພະນັກງານ :{" "}
                  <span>{detail.customer && detail.customer.userCode}</span>
                </p>
              </div>
            </div>
            <div className="detail-cart-bottom">
              <Table
                columns={columns}
                pagination={{
                    total: 2,
                    current: page,
                    pageSize: pageSiize,
                    onChange: (page, pageSiize) => {
                      setPage(page);
                      setPageSiize(pageSiize);
                    },
                  }}
                dataSource={products}
              />
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default DetailProductSale;

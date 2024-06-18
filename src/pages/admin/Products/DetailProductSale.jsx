import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetOneOrderAdmin } from "../../../functions/OrdersAdmin";
import { Spin, Table, Image } from "antd";
import NoImage from "../../../assets/image/no-image.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../functions/FormatPrices";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
const DetailProductSale = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSiize, setPageSiize] = useState(2);

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
      render: (image) => <Image style={{ width: 60, height : 55 }} src={image} />,
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
      render : (row)=>formatPrice(row)
    },
    {
      title: "ລາຄາ",
      dataIndex: "price",
      key: "price",
      render : (row)=>formatPrice(row)
    },
    ,
    {
      title: "ຈຳນວນເງິນ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render : (row)=>formatPrice(row)
    },
    ,
    {
      title: "ຈຳນວນຄະແນນ",
      dataIndex: "totalPoint",
      key: "totalPoint",
      render : (row)=>formatPrice(row)
    },
    {
      title: "ເງິນທີ່ໄດ້ຮັບ",
      dataIndex: "totalCashback",
      key: "totalCashback",
      render : (row)=>formatPrice(row)
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
          title: "ບໍ່ມີຂໍ້ມູນ",
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
                users.role === "super" ? 
                navigate("/listProducts/saleProducts", { state: { key: 3 } })
                :
                navigate("/listProducts/saleProducts/users", { state: { key: 3 } })
              }
            >
              <ArrowLeftOutlined className="icon-back" /> ຍ້ອນກັບ
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
                    { detail?.paymentType == "transfer" ?  "ເງິນໂອນ" : detail?.paymentType == "cash" ? "ເງິນສົດ" : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ເງິນທອນທັງໝົດ :{" "}
                  <span>
                    {detail.totalCashback ? formatPrice(detail.totalCashback) : "0"} ກີບ
                  </span>
                </p>
                <p>
                  ຄະແນນລວມ :{" "}
                  <span>{detail.totalPoint ? formatPrice(detail.totalPoint) : "0"} ຄະແນນ</span>
                </p>
                <p>
                  ລາຍຈ່າຍລວມ :{" "}
                  <span>{detail.totalPrice ? formatPrice(detail.totalPrice) : "0"} ກິບ</span>
                </p>
                <p>
                  ຈຳນວນທັງໝົດ :{" "}
                  <span>{detail.totalQty ?formatPrice( detail.totalQty) : "0"}</span>
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
                pagination={{
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

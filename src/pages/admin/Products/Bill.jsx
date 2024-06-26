import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetOneOrderAdmin } from "../../../functions/OrdersAdmin";
import { Spin, Table, Image } from "antd";
import NoImage from "../../../assets/image/no-image.png";
import ImageLogo from "../../../assets/logo/Logo1.png";
import { PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { formatPrice } from "../../../functions/FormatPrices";
import Swal from "sweetalert2";
import moment from "moment";
const Bill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);

  // console.log(detail)

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "ພິມໃບບິນ",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () =>
      users.role === "super"
        ? navigate("/listProducts/saleProducts", { state: { key: 3 } })
        : navigate("/listProducts/saleProducts/users", { state: { key: 3 } }),

    removeAfterPrint: true,
    onPrintError: (error) => console.log("Print Error...?", error),
  });

  // columns header of data
  const columns = [
    {
      title: "ລະຫັດສິນຄ້າ",
      dataIndex: "productCode",
      key: "productCode",
      width: '70px',
      align : "center"
    },
    {
      title: "ຊື່ສິນຄ້າ",
      dataIndex: "name",
      key: "name",
      width: '100px',
      align : "center"
    },
    {
      title: "ຈຳນວນ",
      dataIndex: "qty",
      key: "qty",
      width: '40px',
      align : "center"
    },
    {
      title: "ລາຄາ",
      dataIndex: "price",
      key: "price",
      render: (row) => formatPrice(row),
      width: '60px',
      align : "center"
    },
    ,
    {
      title: "ຈຳນວນເງິນ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (row) => formatPrice(row),
      width: '60px',
      align : "center"
    },
    ,
    {
      title: "ຈຳນວນຄະແນນ",
      dataIndex: "totalPoint",
      key: "totalPoint",
      render: (row) => formatPrice(row),
      width: '70px',
      align : "center"
    },
    {
      title: "ເງິນທີ່ໄດ້ຮັບ",
      dataIndex: "totalCashback",
      key: "totalCashback",
      render: (row) => formatPrice(row),
      width: '70px',
      align : "center"
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
            <div className="border-print">
              <div className="logo-images">
                {/* <img src={ImageLogo} alt="" /> */}
                <h3>ບໍລິສັດ ຫົງຟັາ ຈຳກັດ</h3>
                <h2>====== ໃບບິນ ======</h2>
              </div>
              {/* <div className="print-content">
                <div className="card-print">
                  <p>================================</p>
                  <p>ລາຍລະອຽດຜູ້ຂາຍ</p>
                  <p>================================</p>
                  <div className="card-print-top-left">
                    <p>
                      ຜູ້ຂາຍ :{" "}
                      <span>
                        {detail.admin &&
                          `${
                            detail.admin.firstName
                              ? detail.admin.firstName
                              : "ບໍ່ມີ"
                          } ${
                            detail.admin.lastName
                              ? detail.admin.lastName
                              : "ບໍ່ມີ"
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
                        {formatPrice(detail.totalCashback)
                          ? formatPrice(detail.totalCashback)
                          : "ບໍ່ມີ"}
                      </span> 
                      {" "} ກີບ
                    </p>
                    <p>
                      ຄະແນນລວມ :{" "}
                      <span>
                        {detail.totalPoint ? detail.totalPoint : "ບໍ່ມີ"}
                      </span>
                    </p>
                    <p>
                      ລາຍຈ່າຍລວມ :{" "}
                      <span>
                        {formatPrice(detail.totalPrice)
                          ? formatPrice(detail.totalPrice)
                          : "ບໍ່ມີ"}
                      </span>
                      {" "} ກີບ
                    </p>
                    <p>
                      ຈຳນວນທັງໝົດ :{" "}
                      <span>{detail.totalQty ? detail.totalQty : "ບໍ່ມີ"}</span>
                    </p>
                    <p>
                      ສະຖານະ :{" "}
                      <span className="detail-status">{detail.status}</span>
                    </p>
                  </div>
                  <p>================================</p>
                  <p>ລາຍລະອຽດລູກຄ້າ</p>
                  <p>================================</p>
                  <div className="card-print-right">
                    <p>
                      ຊື່ :{" "}
                      <span>
                        {detail.customer?.firstName
                          ? detail.customer?.firstName
                          : "ບໍ່ມີ"}
                      </span>
                    </p>
                    <p>
                      ນາມສະກຸນ :{" "}
                      <span>
                        {detail.customer?.lastName
                          ? detail.customer?.lastName
                          : "ບໍ່ມີ"}
                      </span>
                    </p>
                    <p>
                      ລະຫັດພະນັກງານ :{" "}
                      <span>
                        {detail.customer?.userCode
                          ? detail.customer?.userCode
                          : "ບໍ່ມີ"}
                      </span>
                    </p>
                  </div>
                  <p>================================</p>
                  <p>ລາຍການສິນຄ້າ</p>
                  <p>================================</p>
                  <div className="card-print-right">
                    {products &&
                      products.map((p, idx) => (
                        <div key={idx}>
                          <p>
                            ລະຫັດສິນຄ້າ :{" "}
                            <span>
                              {p?.productCode ? p?.productCode : "ບໍ່ມີ"}
                            </span>
                          </p>
                          <p>
                            ຊື່ : <span>{p?.name ? p?.name : "ບໍ່ມີ"}</span>
                          </p>
                          <p>
                            ຈຳນວນ : <span>{p?.qty ? p?.qty : "ບໍ່ມີ"}</span>
                          </p>
                          <p>
                            ລາຄາ :{" "}
                            <span>
                              {formatPrice(p?.price)
                                ? formatPrice(p?.price)
                                : "ບໍ່ມີ"}
                            </span>
                            {" "} ກີບ
                          </p>
                          <p>
                            ຈຳນວນເງິນ :{" "}
                            <span>
                              {formatPrice(p?.totalPrice) ? formatPrice(p?.totalPrice) : "ບໍ່ມີ"}
                            </span>
                            {" "} ກີບ
                          </p>
                          <p>
                            ຈຳນວນຄະແນນ :{" "}
                            <span>
                              {p?.totalPoint ? p?.totalPoint : "ບໍ່ມີ"}
                            </span>
                          </p>
                          <p>
                            ເງິນທີ່ໄດ້ຮັບ :{" "}
                            <span>
                              {formatPrice(p?.totalCashback)
                                ? formatPrice(p?.totalCashback)
                                : "ບໍ່ມີ"}
                            </span>
                            {" "} ກີບ
                          </p>
                          <span>
                            -------------------------------------------------------
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div> */}
            </div>

            <div className="detail-cart-top">
              <div className="detail-cart-top-left">
              <p>
                  ເລກທີ : {" "}
                  <span>
                    {detail?.orderCode ? detail?.orderCode : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ຊື່ຜູ້ຂາຍ : {" "}
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
              </div>
              <div className="detail-cart-top-right">
                <p>
                  ວັນທີ : {" "}
                  <span>
                    {detail.createdAt
                      ? moment(detail.createdAt).format("DD-MM-YYYY")
                      : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ເວລາ : {" "}
                  <span>
                  {detail.createdAt
                      ? moment(detail.createdAt).format("h:mm:ss")
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
                bordered
                size="small"
              />
            </div>


            <div className="detail-cart-top">
              <div className="detail-cart-top-left">
                <p>
                  ລາຍທັງໝົດ : {" "}
                  <span>
                    {products ?products.length : "0"}
                  </span>
                </p>
                <p>
                  ລວມເປັນເງິນທັງໝົດ : {" "}
                  <span>
                    {detail.totalPrice ? formatPrice(detail.totalPrice) : "0"} ກີບ
                  </span>
                </p>
                <p>
                  ປະເພດການຊຳລະ : {" "}
                  <span>
                    {detail?.paymentType == "transfer" ?  "ເງິນໂອນ" : detail?.paymentType == "cash" ? "ເງິນສົດ" : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ລະຫັດຜູ້ຂາຍ : {" "}
                  <span>
                    {detail.admin ? detail?.admin?.userCode : "ບໍ່ມີ"} 
                  </span>
                </p>
                <p>
                  ຈຳນວນທັງໝົດ : {" "}
                  <span>
                    {detail.totalQty ? formatPrice(detail.totalQty) : "0"}
                  </span>
                </p>
              </div>
              <div className="detail-cart-top-right">
                <p>
                  ລາຍເຊັນ  {" "}
                  <span>
                   
                  </span>
                </p>
                 {/*<p>
                  ນາມສະກຸນ : {" "}
                  <span>
                    {detail.customer?.lastName
                      ? detail.customer?.lastName
                      : "ບໍ່ມີ"}
                  </span>
                </p>
                <p>
                  ລະຫັດພະນັກງານ : {" "}
                  <span>
                    {detail.customer?.userCode
                      ? detail.customer?.userCode
                      : "ບໍ່ມີ"}
                  </span>
                </p> */}
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Bill;

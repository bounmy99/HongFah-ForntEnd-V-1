import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetOneLineWork } from "../../../functions/LineWork";
import { formatPrice } from "../../../functions/FormatPrices";
import moment from "moment";
import Swal from "sweetalert2";

const DetailsEmp = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => ({ ...state }));
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // customize style cell of table

  // load detail
  useEffect(() => {
    setLoading(true);
    GetOneLineWork(users.token, id)
      .then((res) => {
        setDetail(res.data.data);
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



  console.log(detail);

  return (
    <div className="DetailLineWork">
      <div>
        <button
          className="btn"
          style={{ width: "100px" }}
          onClick={() => navigate("/lineWork", { state: { key: 2 } })}
        >
          ຍ້ອນກັບ
        </button>
      </div>
      <h1>ລາຍລະອຽດ</h1>
      <p>
        <span>Level : </span> {detail.level ? detail.level : "ບໍ່ມີ"}
      </p>
      <p>
        <span>LineUp : </span> {detail.lineUp ? detail.lineUp : "ບໍ່ມີ"}
      </p>
      <p>
        <span>PriceTotal : </span>{" "}
        {detail.priceTotal ? detail.priceTotal : "ບໍ່ມີ"}
      </p>
      <p>
        <span>PV Total : </span> {detail.pvTotal ? detail.pvTotal : "ບໍ່ມີ"}
      </p>
      <hr />
      <div className="images-lineWork">
        <span>IMAGE :</span>
        {detail.user_id?.profile ? (
          <img src={detail.user_id?.profile} alt="" />
        ) : (
          "loading..."
        )}
      </div>
      <p>
        <span>USER CODE : </span>
        {detail.user_id?.userCode ? detail.user_id?.userCode : "ບໍ່ມີ"}
      </p>
      <p>
        <span>PACKAGE : </span>
        {formatPrice(
          detail.user_id?.package_id?.price
            ? detail.user_id?.package_id?.price
            : "ບໍ່ມີ"
        )}
        ກີບ
      </p>
      <p>
        <span>POSITION : </span>
        {detail.user_id?.position_id ? detail.user_id?.position_id : "ບໍ່ມີ"}
      </p>
      <p>
        <span>FULL NAME : </span>
        {`${detail.user_id?.firstName ? detail.user_id?.firstName : "ບໍ່ມີ"}  ${
          detail.user_id?.lastName ? detail.user_id?.lastName : "ບໍ່ມີ"
        } `}
      </p>
      <hr />
      <h3>ລູກທີມ</h3>
      <p>
        <span>ຈຳນວນລູກທີມ : </span>
        {detail?.children_count ? detail?.children_count : "ບໍ່ມີ"} ຄົນ
      </p>
      {/* <DataTables columns={columns} progressPending={loading} data={detail.children} customStyles={customStyles} /> */}
      <hr />
      <h3>ເດືອນທີ່ແລ້ວ</h3>
      <p>
        <span>PV_Amount : </span> {detail.lastMonth?.PV_Amount ? detail.lastMonth?.PV_Amount : "ບໍ່ມີ"}
      </p>
      <p>
        <span>lineWork : </span> {detail.lastMonth?.lineWork ? detail.lastMonth?.lineWork : "ບໍ່ມີ"}
      </p>
      <p>
        <span>type :</span> {detail.lastMonth?.type ? detail.lastMonth?.type : "ບໍ່ມີ"}
      </p>
      <p>
        <span>isActive : </span> {detail.lastMonth?.isActive ? "true" : "false"}
      </p>
      <p>
        <span>user_id : </span> {detail.lastMonth?.user_id ? detail.lastMonth?.user_id : "ບໍ່ມີ"}
      </p>
      <p>
        <span>createdAt : </span>
        {moment(detail.lastMonth?.createdAt).format("DD-MM-YYYY")}
      </p>
      <hr />
      <h3>ເດືອນນີ້</h3>
      <p>
        <span>PV_Amount : </span> {detail.thisMonth?.PV_Amount ? detail.thisMonth?.PV_Amount : "ບໍ່ມີ"}
      </p>
      <p>
        <span>lineWork : </span> {detail.thisMonth?.lineWork ? detail.thisMonth?.lineWork : "ບໍ່ມີ"}
      </p>
      <p>
        <span>type :</span> {detail.thisMonth?.type ? detail.thisMonth?.type : "ບໍ່ມີ"}
      </p>
      <p>
        <span>isActive : </span> {detail.thisMonth?.isActive ? "true" : "false"}
      </p>
      <p>
        <span>user_id : </span> {detail.thisMonth?.user_id ? detail.thisMonth?.user_id : "ບໍ່ມີ"}
      </p>
      <p>
        <span>createdAt : </span>{" "}
        {moment(detail.thisMonth?.createdAt).format("DD-MM-YYYY")}
      </p>
      <hr />
      <h3>User Line Up</h3>
      <div className="images-lineWork">
        <span>IMAGE :</span>
        {detail.userLineUp?.profile ? (
          <img src={detail.userLineUp?.profile} alt="" />
        ) : (
          "loading..."
        )}
      </div>
      <p>
        <span>ReferralCode : </span> {detail.userLineUp?.ReferralCode ? detail.userLineUp?.ReferralCode : "ບໍ່ມີ"}
      </p>
      <p>
        <span>Full Name : </span>{" "}
        {`${
          detail.userLineUp?.firstName ? detail.userLineUp?.firstName : "ບໍ່ມີ"
        }  ${
          detail.userLineUp?.lastName ? detail.userLineUp?.lastName : "ບໍ່ມີ"
        } `}
      </p>
      <p>
        <span>User Code :</span> {detail.userLineUp?.userCode ? detail.userLineUp?.userCode : "ບໍ່ມີ" }
      </p>
    </div>
  );
};

export default DetailsEmp;

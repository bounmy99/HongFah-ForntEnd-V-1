import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { GetOneUser } from "../../functions/Users";
import { useSelector } from "react-redux";
import Loading from "../../components/Loadding";
import { ArrowLeftOutlined } from "@ant-design/icons";
import noImage from "../../assets/image/no-image.png"
import moment from "moment";
const UsersDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetOneUser(users.token, id)
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

  console.log(detail);

  return (
    <>
      {loading ? (
        <div className="users-detail card">
          <Loading paragraph={14} />
        </div>
      ) : (
        <div className="users-detail card">
          <div
            className="btn-back"
            onClick={() =>
              navigate("/users")
            }
          >
            <ArrowLeftOutlined className="icon-back" /> ຍ້ອນກັບ
          </div>
          <div className="users-detail-title">
            <h3>ລາຍລະອຽດຜູ້ໃຊ້</h3>
          </div>
          <div className="details-users-info">
            <div className="detail-images">
              <div className="image-users">
                {detail.profile ? <img src={detail.profile} alt="" />:<img src={noImage} alt="" />}
              </div>
              <div className="name-users">
                <h3>
                  ຊື່ ແລະ ນາມສະກຸນ : {`${detail.firstName} ${detail.lastName}`}
                </h3>
              </div>
            </div>
            <div className="informations">
              <div className="detail-information">
                <div className="detail-info">
                  <div className="title-info">
                    <h3>ຂໍ້ມຸນທົ່ວໄປ</h3>
                  </div>
                  <div className="item-name">
                    <p>
                      ລະຫັດພະນັກງານ : <span>{detail.userCode}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ເບີໂທ : <span>{detail.phoneNumber}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ສິດເຂົ້າໃຊ້ : <span>{detail.role}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ວັນເດືອນປີເກີດ :{" "}
                      <span>
                        {moment(detail.birthday).format("DD-MM-YYYY")}
                      </span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ອາຍຸ : <span>{detail.age}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ວັນທີເຂົ້າໃຊ້ :{" "}
                      <span>
                        {moment(detail.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="detail-address">
                  <div className="address-info">
                    <h3>ທີ່ຢູ່</h3>
                  </div>
                  <div className="item-name">
                    <p>
                      ບ້ານ :{" "}
                      <span>{detail.address && detail.address.village}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ເມືອງ :{" "}
                      <span>{detail.address && detail.address.district}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ແຂວງ :{" "}
                      <span>{detail.address && detail.address.province}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="account-title">
                <h3>ລາຍລະອຽດບັນຊີ</h3>
              </div>
              <div className="account-datail">
                <div className="image-account">
                  <img src={detail.bank && detail.bank.accountImage} alt="" />
                </div>
                <div className="info-account">
                  <div className="item-name">
                    <p>
                      ຊື່ທະນາຄານ :{" "}
                      <span>{detail.bank && detail.bank.bankName}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ຊື່ບັນຊີ :{" "}
                      <span>{detail.bank && detail.bank.accountName}</span>
                    </p>
                  </div>
                  <div className="item-name">
                    <p>
                      ເລກບັນຊີ :{" "}
                      <span>{detail.bank && detail.bank.accountNo}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersDetail;

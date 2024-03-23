import React, { useState, useEffect } from "react";
import iconImg from "../../assets/image/withdraw-icon.png";
import { GetWalletWithUserCode, WithDrawAdmin } from "../../functions/WithDraw";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Empty, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const CreateWithDraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const [useCode, setUserCode] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(false);
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSeach = (e) => {
    setUserCode(e.target.value);
  };
  const handleSeachData = () => {
    GetWalletWithUserCode(users.token, useCode)
      .then((res) => {
        setValue(res.data.data);
        setStatus(true);
      })
      .catch((err) => {
        if (err.response.data.message === "unauthorized") {
          dispatch({
            type: "USER_LOGOUT",
            payload: null,
          });
          navigate("/");
        }
      });
  };
  console.log(value);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    const isEmpty = values.includes("");
    if (isEmpty) {
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
        icon: "error",
        title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
      });
      return;
    }
    const Data = Object.fromEntries(formData);
    e.currentTarget.reset();
    console.log("Data In form", Data);
    WithDrawAdmin(users.token, Data).then((res) => {
        if (res.data.message === "success") {
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
            icon: "success",
            title: "ຖອນເງິນສຳເລັດແລ້ວ",
          });
          setLoading(false);
          setStatus(false);
          setValue([]);
          navigate("/withdraw", { state: { key: 3 } });
        }
      }).catch((err) => console.log(err));
  };
  return (
    <div className="card-main">
      <div className="CreateWithDraw-content">
        <div className="icons-print-withdraw">
          <img src={iconImg} alt="" />
        </div>
        <div className="CreateWithDraw-form-group">
          <div className="input-group-CreateWithDraw">
            <div>
              <label htmlFor="">ຄົ້ນຫາສະມາຊິກ</label>
            </div>
            <input
              type="text"
              value={useCode}
              className="form-modal-control-CreateWithDraw"
              onChange={handleSeach}
            />
            <i class="bx bx-search member" onClick={handleSeachData}></i>
          </div>
          {status ? (
            <form onSubmit={handleSubmit}>
              <div className="text-group-CreateWithDraw">
                <div className="group-text">
                  <h3>
                    {" "}
                    {`${value.user_id && value.user_id.firstName} ${
                      value.user_id && value.user_id.lastName
                    }`}
                  </h3>
                  <p>{`020 ${value.user_id && value.user_id.phoneNumber}`}</p>
                </div>
                <div className="group-text">
                  <p> ເງິນຄົງໃນ Wallet</p>
                  <h1>{value.balance} ກີບ</h1>
                </div>
              </div>
              <div className="input-group-CreateWithDraw">
                <input
                  type="text"
                  name="user_id"
                  value={`${value.user_id && value.user_id._id}`}
                  hidden
                  className="form-modal-control-CreateWithDraw"
                  onChange={handleChange}
                />
                <div>
                  <label htmlFor="">ບັນຊີທະນາຄານການຄ້າຕ່າງປະເທດລາວ</label>
                </div>
                <input
                  type="text"
                  name=""
                  value={`${
                    value.user_id &&
                    value.user_id.bank &&
                    value.user_id.bank.accountNo
                  }`}
                  className="form-modal-control-CreateWithDraw"
                  onChange={handleChange}
                />
                <i class="bx bxs-credit-card number-acount"></i>
              </div>

              <div className="input-group-CreateWithDraw">
                <div>
                  <label htmlFor="">ຊື່ບັນຊີ</label>
                </div>
                <input
                  type="text"
                  name=""
                  value={`${
                    value.user_id &&
                    value.user_id.bank &&
                    value.user_id.bank.accountName
                  }`}
                  className="form-modal-control-CreateWithDraw"
                  onChange={handleChange}
                />
                <i class="bx bx-user name-acount"></i>
              </div>

              <div className="input-group-CreateWithDraw">
                <div>
                  <label htmlFor="">ເງິນທີ່ຖອນ</label>
                </div>
                <input
                  type="text"
                  name="amount"
                  className="form-modal-control-CreateWithDraw"
                  onChange={handleChange}
                />
                <i class="bx bx-money withdraw"></i>
              </div>
              <div className="input-group-CreateWithDraw">
                <div>
                  <label htmlFor="">ປ້ອນລະຫັດແອັດມິນ</label>
                </div>
                <input
                  type="password"
                  name="adminPassword"
                  className="form-modal-control-CreateWithDraw"
                  onChange={handleChange}
                />
                <i class="bx bx-lock-alt password"></i>
              </div>
              <div className="Createwithdraw-btn">
                <button
                  type="button"
                  className="create-withdraw-btn btn-secondary"
                >
                  ຍົກເລີກ
                </button>
                <button type="submit" className="create-withdraw-btn btn-info">
                  {loading ? (
                    <>
                      <span>ກຳລັງ....</span>
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 24,
                              color: "white",
                            }}
                            spin
                          />
                        }
                      />
                    </>
                  ) : (
                    "ຖອນເງິນ"
                  )}
                  
                </button>
              </div>
            </form>
          ) : (
            <div className="empty-card">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    <a>ບໍ່ມີຂໍ້ມູນ</a>
                  </span>
                }
              ></Empty>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWithDraw;

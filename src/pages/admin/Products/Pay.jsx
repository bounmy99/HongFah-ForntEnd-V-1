import { useState } from "react";
import {
  ArrowLeftOutlined,
  DollarOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import Swal from "sweetalert2";

import { GetUserCode } from "../../../functions/GetUserWithUsercode";
import { CreateOrder } from "../../../functions/OrdersAdmin";
import EmptyContent from "../../../components/EmptyContent";
import { OnKeyDown } from "../../../functions/OnkeyDown";

const Pay = () => {
  const { users, orderItems } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [value, setValue] = useState([]);

  

  // set value search
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // search customer
  const handleClickSearch = () => {
    setLoadingSearch(true);
    GetUserCode(users.token, value.userCode)
      .then((res) => {
        setValueSearch(res.data.data);
        setLoadingSearch(false);
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
        setLoadingSearch(false);
      });
    setLoading(false);
  };
  // confrim payment
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("userCode", value.userCode);
    formData.append("paymentType", value.paymentType);
    formData.append("orderItems", JSON.stringify(orderItems));

    for (const [key, value] of formData.entries()) {
      // console.log(`${key}: ${value}`);
      if (value === "undefined") {
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
          title: "ກະລຸນາເລຶອກປະເພດຊຳລະ",
        });
        setLoading(false);
        return;
      }
    }

    CreateOrder(users.token, formData)
    .then((res) => {
      setLoading(false);
      let Id = res.data.data._id;
      // return
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
        title: "ສ້າງອໍເດີ້ສຳເລັດ",
      });

      dispatch({
        type: "EMPTY_CART",
        payload: [],
      });
      dispatch({
        type: "EMPTY_ORDER",
        payload: [],
      });
      navigate(`/listProducts/Bill/${Id}`);
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
      setLoading(false);
    });
  };
  
  
// ==============  Use OnKeyDown =================
  OnKeyDown(handleClickSearch,"Enter");

  return (
    <Spin spinning={loading}>
      <>
        <div className="pay-content">
          <div
            className="btn-back"
            onClick={() =>
              navigate("/listProducts/saleProducts", { state: { key: 2 } })
            }
          >
            <ArrowLeftOutlined className="icon-back" /> ຍ້ອນກັບ
          </div>
          <div className="pay-title">
            <h3 className="title">ໃສ່ລະຫັດສະມາຊິກ</h3>
          </div>
          <div className="pay-form">
            <div className="form-group">
              <div>
                <label htmlFor="">ລະຫັດສະມາຊິກ</label>
              </div>
              <div>
                <input
                  type="search"
                  name="userCode"
                  className="form-input-pay"
                  onChange={handleChange}
                />
                <UserOutlined className="icons user1" />
                <SearchOutlined
                  className="icons search"
                  onClick={handleClickSearch}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <div>
                  <label htmlFor="">ລະຫັດສະມາຊິກ</label>
                </div>
                <div>
                  <input
                    type="search"
                    name="userCode"
                    className="form-input-pay"
                    onChange={handleChange}
                  />
                  <UserOutlined className="icons user1" />
                  <SearchOutlined
                    className="icons search"
                    onClick={handleClickSearch}
                  />
                </div>
              </div> */}
              {valueSearch ? (
                <>
                  <div className="form-group">
                    <div>
                      <label htmlFor="">ຊື່ຜູ້ຮັບ</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={
                          valueSearch.user_id &&
                          `${valueSearch.user_id.firstName}   ${valueSearch.user_id.lastName}`
                        }
                        className="form-input-pay"
                        onChange={handleChange}
                      />
                      <UserOutlined className="icons user2" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <label htmlFor="">ເບີໂທ</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        value={
                          valueSearch.user_id && valueSearch.user_id.phoneNumber
                        }
                        className="form-input-pay"
                        onChange={handleChange}
                      />
                      <PhoneOutlined className="icons phone" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <label htmlFor="">ເລືອກປະເພດຊຳລະ</label>
                    </div>
                    <div>
                      <select
                        className="form-input-pay"
                        name="paymentType"
                        onChange={handleChange}
                      >
                        <option selected disabled>
                          ກະລຸນາເລຶອກ
                        </option>
                        <option value="transfer">ໂອນ</option>
                        <option value="cash">ເງິນສົດ</option>
                      </select>
                      <DollarOutlined className="icons dollar" />
                    </div>
                  </div>
                  <div className="button-gruop">
                    <button className="btns-confirm" type="submit">
                      ຢືນຢັນ
                    </button>

                    {/* <Invoice /> */}

                    <button className="btns-cancel" type="reset">
                      ຍົກເລິກ
                    </button>
                  </div>
                </>
              ) : (
                <div className="">
                  <Spin spinning={loadingSearch}>
                    <EmptyContent Messages={"ບໍ່ທັນມີຂໍ້ມູນ"} />
                  </Spin>
                </div>
              )}
            </form>
          </div>
        </div>
      </>
    </Spin>
  );
};

export default Pay;

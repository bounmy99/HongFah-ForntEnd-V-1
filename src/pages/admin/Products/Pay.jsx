import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeftOutlined,
  DollarOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Empty } from "antd";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";

import { GetUserCode } from "../../../functions/GetUserWithUsercode";
import { CreateOrder } from "../../../functions/OrdersAdmin";
import Invoice from "../../../components/invoice/Invoice";

const Pay = () => {
  const { users, carts, orderItems } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [value, setValue] = useState([]);



  const orders = [];
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

    Swal.fire({
      title: "ພິມໃບບິນ",
      text: "ທ່ານຕ້ອງການພິມໃບບິນບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#00a5e8",
      confirmButtonText: "ພິມບິນ",
      cancelButtonText: "ບັນທຶກ",
    }).then((result) => {
      if (result.isConfirmed) {
        // return
        CreateOrder(users.token, formData)
          .then((res) => {
            setLoading(false);
            let Id = res.data.data._id
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
              title: res.data.message,
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
      } else {
        setLoading(false);
        CreateOrder(users.token, formData)
          .then((res) => {
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
              icon: "success",
              title: res.data.message,
            });

            dispatch({
              type: "EMPTY_CART",
              payload: [],
            });
            dispatch({
              type: "EMPTY_ORDER",
              payload: [],
            });
            navigate("/listProducts/saleProducts", { state: { key: 3 } });
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
            setLoading(true);
          });
      }
    });
  };

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
            <form onSubmit={handleSubmit}>
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
                    onKeyUp={handleClickSearch}
                  />
                  <UserOutlined className="icons user1" />
                  <SearchOutlined
                    className="icons search"
                    onClick={handleClickSearch}
                  />
                </div>
              </div>
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
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={
                        <span>
                          <a>ບໍ່ທັນມີຂໍ້ມູນ</a>
                        </span>
                      }
                    ></Empty>
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

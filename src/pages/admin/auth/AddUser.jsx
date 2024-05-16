import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  AdminSignStaff,
  GetAllUser,
  AdminSignSuperadmin,
} from "../../../functions/Authentication";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Tabs, Select } from "antd";

const AddUser = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [roles, setRoles] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
  });
  const [erroMessage, setErrorMessage] = useState({});

  console.log("Roles", roles);

  // function show hide password
  const showHide = () => {
    setIsPasswordShow((isPasswordShow) => !isPasswordShow);
  };

  // load all users
  useEffect(() => {
    GetAllUser(users.token)
      .then((res) => {
        const roles = [...new Set(res.data.data.map((item) => item.role))];
        setRoleList(roles);
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
      });
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleChangeRole = (e) => {
    setRoles(e);
  };

  // signin admin
  const handleSubmitAdmin = (e) => {
    e.preventDefault();

    const validationError = {};

    if (!value.firstName.trim()) {
      validationError.firstName = "ກະລຸນາປ້ອນຊື່";
    }
    if (!value.lastName.trim()) {
      validationError.lastName = "ກະລຸນາປ້ອນນາມສະກຸນ";
    }
    if (!value.password.trim()) {
      validationError.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
    } else if (value.password.length < 8) {
      validationError.password = "ລະຫັດຜ່ານຕ້ອງ 8 ຕົວອັກສອນຂື້ນໄປ";
    }
    if (!value.phoneNumber.trim()) {
      validationError.phoneNumber = "ກະລຸນາປ້ອນເບີໂທ";
    } else if (value.phoneNumber.length < 8) {
      validationError.phoneNumber = "ເບີໂທ 8 ຕົວອັກສອນຂື້ນໄປ";
    }

    setErrorMessage(validationError);

    if (Object.keys(validationError).length === 0) {
      setLoading(true);
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
        setLoading(false);
        return;
      }

      const Data = Object.fromEntries(formData);
      e.currentTarget.reset();
      const FinalData = { ...Data, role: roles };

      AdminSignStaff(users.token, FinalData)
        .then((res) => {
          setLoading(false);
          if (res.data.data) {
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
              title: "ສ້າງຜູ້ໃຊ້ສຳເລັດ",
            });
            navigate("/auth");
          }
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
            icon: "error",
            title: "ບໍ່ສາມາດສ້າງຜູ້ໃຊ້ໄດ້",
          });
          setLoading(false);
        });
    }
  };
  // signin supper admin
  const handleSubmitSuperAdmin = (e) => {
    e.preventDefault();

    const validationError = {};

    if (!value.firstName.trim()) {
      validationError.firstName = "ກະລຸນາປ້ອນຊື່";
    }
    if (!value.lastName.trim()) {
      validationError.lastName = "ກະລຸນາປ້ອນນາມສະກຸນ";
    }
    if (!value.password.trim()) {
      validationError.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
    } else if (value.password.length < 8) {
      validationError.password = "ລະຫັດຜ່ານຕ້ອງ 8 ຕົວອັກສອນຂື້ນໄປ";
    }
    if (!value.phoneNumber.trim()) {
      validationError.phoneNumber = "ກະລຸນາປ້ອນເບີໂທ";
    } else if (value.phoneNumber.length < 8) {
      validationError.phoneNumber = "ເບີໂທ 8 ຕົວອັກສອນຂື້ນໄປ";
    }

    setErrorMessage(validationError);

    if (Object.keys(validationError).length === 0) {
      setLoading(true);

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
        setLoading(false);
        return;
      }

      const Data = Object.fromEntries(formData);
      e.currentTarget.reset();
      console.log(Data);
      AdminSignSuperadmin(users.token, Data)
        .then((res) => {
          if (res.data.data) {
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
              title: "ສ້າງຜູ້ໃຊ້ສຳເລັດ",
            });
            navigate("/auth");
          }
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
            icon: "error",
            title: "ບໍ່ສາມາດສ້າງຜູ້ໃຊ້ໄດ້",
          });
          setLoading(false);
        });
    }
  };

  const SignupAdmin = () => (
    <form onSubmit={handleSubmitAdmin}>
      <div className="card-user-add-content">
        <div className="user-add-form">
          <div className="form-group">
            <div className="input-group">
              <label htmlFor="">ຊື່</label>
              <input
                type="text"
                name="firstName"
                className="form-controls-md"
                placeholder="ກະລຸນາປ້ອນຊື່"
                onChange={handleChange}
              />
              {erroMessage && (
                <span className="error__validation">
                  {erroMessage.firstName}
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="">ນາມສະກຸນ</label>
              <input
                type="text"
                name="lastName"
                className="form-controls-md"
                placeholder="ກະລຸນາປ້ອນນາມສະກຸນ"
                onChange={handleChange}
              />
              {erroMessage && (
                <span className="error__validation">
                  {erroMessage.lastName}
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="">ລະຫັດຜ່ານ</label>
              <input
                type={`${isPasswordShow ? "text" : "password"}`}
                name="password"
                className="form-controls-md"
                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                onChange={handleChange}
              />
              {erroMessage && (
                <span className="error__validation">
                  {erroMessage.password}
                </span>
              )}
              {value.password && (
                <div className="icon-right-auth" onClick={showHide}>
                  <i
                    className={`bx ${
                      isPasswordShow ? "bx-show-alt" : "bx-low-vision"
                    }`}
                  ></i>
                </div>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="">ເບີໂທ</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-controls-md"
                placeholder="9xxx xxxx"
                onChange={handleChange}
              />
              {erroMessage && (
                <span className="error__validation">
                  {erroMessage.phoneNumber}
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="">ສິດເຂົ້າໃຊ້</label>
              <Select
                name="role"
                className="form-select-input"
                placeholder="ກະລຸນາເລຶອກ"
                optionFilterProp="children"
                onChange={handleChangeRole}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={
                  roleList &&
                  roleList.map((item) => ({
                    value: item,
                    label: item,
                  }))
                }
              />
            </div>
          </div>
          <div className="user-btn">
            <button type="submit" className="btn-add-user">
              ບັນທຶກ
            </button>
            <button type="reset" className="btn-cancel-user">
              ຍົກເລິກ
            </button>
          </div>
        </div>
      </div>
    </form>
  );
  const SignupSpperAdmin = () =>
    users.role === "super" ? (
      <form onSubmit={handleSubmitSuperAdmin}>
        <div className="card-user-add-content">
          <div className="user-add-form">
            <div className="form-group">
              <div className="input-group">
                <label htmlFor="">ຊື່</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-controls-md"
                  placeholder="ກະລຸນາປ້ອນຊື່"
                  onChange={handleChange}
                />
                {erroMessage && (
                  <span className="error__validation">
                    {erroMessage.firstName}
                  </span>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="">ນາມສະກຸນ</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-controls-md"
                  placeholder="ກະລຸນາປ້ອນນາມສະກຸນ"
                  onChange={handleChange}
                />
                {erroMessage && (
                  <span className="error__validation">
                    {erroMessage.lastName}
                  </span>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="">ລະຫັດຜ່ານ</label>
                <input
                  type="password"
                  name="password"
                  className="form-controls-md"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                  onChange={handleChange}
                />
                {erroMessage && (
                  <span className="error__validation">
                    {erroMessage.password}
                  </span>
                )}
                {value.password && (
                  <div className="icon-right-auth" onClick={showHide}>
                    <i
                      className={`bx ${
                        isPasswordShow ? "bx-show-alt" : "bx-low-vision"
                      }`}
                    ></i>
                  </div>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="">ເບີໂທ</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-controls-md"
                  placeholder="9xxx xxxx"
                  onChange={handleChange}
                />
                {erroMessage && (
                  <span className="error__validation">
                    {erroMessage.phoneNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="user-btn">
              <button type="submit" className="btn-add-user">
                ບັນທຶກ
              </button>
              <button type="reset" className="btn-cancel-user">
                ຍົກເລິກ
              </button>
            </div>
          </div>
        </div>
      </form>
    ) : (
      "ທ່ານບໍ່ແມ່ນ super admin ບໍ່ສາມາດເຂົ້າເຖິງໜ້ານີ້ໄດ້"
    );

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Sigup Admin",
      children: SignupAdmin(),
    },
    {
      key: "2",
      label: "Sigup Supper Admin",
      children: SignupSpperAdmin(),
    },
  ];

  return (
    <div className="card-main">
      <Spin spinning={loading}>
        <div className="card-add-user">
          <div className="card-user-header" id="add-user">
            <div className="text-tilte">
              <button onClick={() => navigate("/auth")} className="text-link">
                <i className="bx bx-chevron-left"></i>
                ກັບໄປໜ້າກ່ອນ
              </button>
            </div>
          </div>
          <Tabs
            centered
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
      </Spin>
    </div>
  );
};

export default AddUser;

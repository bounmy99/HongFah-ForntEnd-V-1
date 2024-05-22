import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Spin } from "antd";



// image
import Logo from "../assets/logo/logo.png";
import LogoHeadLeft from "../assets/logo/logo-head-left.png";
import LogoHeadRight from "../assets/logo/logo-head-right.png";
import Logo1 from "../assets/logo/Logo1.png";
import Logo2 from "../assets/logo/Logo2.png";
// function
import { Login } from "../functions/Authentication";
const LoginPages = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    userCode: "super82915",
    password: "12345678",
  });

  useEffect(() => {
    const keyDownHandle = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", keyDownHandle);
    return () => {
      document.removeEventListener("keydown", keyDownHandle);
    };
  }, []);

  // function show hide password
  const showHide = () => {
    setIsPasswordShow((isPasswordShow) => !isPasswordShow);
  };
  // function submit login
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (value.userCode === "" && value.password === "") {
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
        title: "ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
      });
      return;
    }
    Login(value)
      .then((res) => {
        setLoading(false);
        dispatch({
          type: "USER_LOGIN",
          payload: {
            id : res.data.data._id,
            token: res.data.data.token,
            resfresToken: res.data.data.refresToken,
            email: res.data.data.email,
            phoneNumber: res.data.data.phoneNumber,
            username: `${res.data.data.firstName} ${res.data.data.lastName}`,
            profile: res.data.data.profile,
            role: res.data.data.role,
            userCode: res.data.data.userCode,
            tokenExpiresAt: res.data.data.tokenExpiresAt,
          },
        });
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
          title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
        });
        navigate("/dashboard");
        localStorage.setItem("data", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.message) {
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
            title: err.response.data.message,
          });
        }
      });
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <Spin spinning={loading} style={{ marginTop: 80 }}>
      <div className="login-pages">
        <div className="card-login-border">
          <div className="card-login">
            <div className="logo-login">
              <img src={Logo} alt={"images"} />
              <div className="text">
                <h5>ບໍລິສັດ ຫົງຟ້າ ຈຳກັດ</h5>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="">AdminID</label>
              <div className="input-group">
                <input
                  type="text"
                  name="userCode"
                  value={value.userCode}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜູ້ໃຊ້"
                />
                <div className="icon">
                  <i className="bx bx-user"></i>
                </div>
              </div>
              <label htmlFor="">Password</label>
              <div className="input-group">
                <input
                  type={`${isPasswordShow ? "text" : "password"}`}
                  value={value.password}
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                />
                <div className="icon-left">
                  <i className="bx bxs-key bx-rotate-180"></i>
                </div>
                {value.password && (
                  <div className="icons-right" onClick={showHide}>
                    <i
                      className={`bx ${
                        isPasswordShow ? "bx-show-alt" : "bx-low-vision"
                      }`}
                    ></i>
                  </div>
                )}
              </div>
              <div className="input-check">
                <div className="remember-check">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="checkedYes"
                    defaultChecked={false}
                  />
                  <span>remember me</span>
                </div>
                <div>
                  <Link to={"/forgetPassword"} className="forget-password">
                    ລືມລະຫັດຜ່ານ
                  </Link>
                </div>
              </div>
              <button
                type={`${value.password.length <= 4 ? "button" : "submit"}`}
                className={`${value.password.length <= 4 ? "disable" : "btn"}`}
              >
                ເຂົ້າສູ່ລະບົບ
              </button>
            </form>
          </div>
        </div>
        <div className="image-logo">
          <div className="image-right">
            <div className="logo-head-right">
              <img src={LogoHeadLeft} alt={"images"} />
            </div>
            <img src={Logo1} alt={"images"} />
          </div>
          <div className="image-left">
            <div className="logo-head-left">
              <img src={LogoHeadRight} alt={"images"} />
            </div>
            <img src={Logo2} alt={"images"} />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default LoginPages;

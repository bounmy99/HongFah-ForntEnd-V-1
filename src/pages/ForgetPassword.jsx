import  { useState } from 'react'
import  Logo  from '../assets/logo/logo.png';
import  LogoHeadLeft  from '../assets/logo/logo-head-left.png';
import  LogoHeadRight  from '../assets/logo/logo-head-right.png';
import Logo1 from '../assets/logo/Logo1.png'
import Logo2 from '../assets/logo/Logo2.png';
import { forgetPassword } from '../functions/Authentication';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Spin } from "antd"

const ForgetPassword = () => {
  const [value, setValue] = useState({
    userCode : "",
    phoneNumber : "",
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleSubmit = (e) => {
    setLoading(true)
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
    forgetPassword(Data).then(res=>{

      if(res.data.message === "success"){
        navigate("/ResetPassword")
        dispatch({
          type : "ACCESS_TOKEN",
          payload : res.data.data.accessToken
        })
        setLoading(false)
      }

    }).catch(err=>{
      if(err.response.data.message){
        setLoading(false)
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: err.response.data.message
        });
      }
    })
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return (
    <Spin spinning={loading} style={{marginTop : 80}}>
    <div className="login-pages">
      <div className="card-login-border">
        <div className="card-login">
          <div className="logo-login">
            <img src={Logo} alt={'images'} />
            <div className="text">
              <h5>Forget Password</h5>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">ລະຫັດຜູ້ໃຊ້</label>
            <div className="input-group">
              <input type="text" name="userCode" className="form-control" onChange={handleChange} placeholder="ກະລຸນາປ້ອນລະຫັດຜູ້ໃຊ້" />
              <div className="icon">
                <i className='bx bx-user' ></i>
              </div>
            </div>
            <label htmlFor="">ເບີໂທ</label>
            <div className="input-group">
              <input type="text" name="phoneNumber" className="form-control" onChange={handleChange} placeholder="9xxx xxxx" />
              <div className="icon">
                <i className='bx bx-user' ></i>
              </div>
            </div>
            <button type={`${value.phoneNumber.length <= 4 ? 'button' : 'submit'}`} className={`${value.phoneNumber.length <= 4 ? 'disable' : 'btn'}`} >ສົ່ງ</button>
            {/* <div>
              <div>
                <Link to={'/'} className="forget--password">ເຂົ້າສູ່ລະບົບ</Link>
              </div>
            </div> */}
          </form>
        </div>
      </div>
      <div className="image-logo">
        <div className="image-right">
          <div className="logo-head-right">
            <img src={LogoHeadLeft} alt={'images'} />
          </div>
          <img src={Logo1} alt={'images'} />
        </div>
        <div className="image-left">
          <div className="logo-head-left">
            <img src={LogoHeadRight} alt={'images'} />
          </div>
          <img src={Logo2} alt={'images'} />
        </div>
      </div>
    </div>
    </Spin>
  )
}

export default ForgetPassword

import React, { useState, useEffect } from 'react'
import  Logo  from '../assets/logo/logo.png'
import  LogoHeadLeft  from '../assets/logo/logo-head-left.png'
import  LogoHeadRight  from '../assets/logo/logo-head-right.png'
import Logo1 from '../assets/logo/Logo1.png'
import Logo2 from '../assets/logo/Logo2.png'

const ForgetPassword = () => {
  
  const [value, setValue] = useState({
    emailOrphone : "",
  })
 

  const handleSubmit = (e) => {
    e.preventDefault()
    if(value.emailOrphone === ''){
      alert("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ")
      return
    }
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return (
    <div className="login-pages">
      <div className="card-login-border">
        <div className="card-login">
          <div className="logo-login">
            <img src={Logo} alt={'images'} />
            <div className="text">
              <h5>ບໍລິສັດ ຫົງຟ້າ ຈຳກັດ</h5>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">ອີເມວ ຫຼື ເບີໂທ</label>
            <div className="input-group">
              <input type="text" name="contact" className="form-control" onChange={handleChange} placeholder="ກະລຸນາປ້ອນອີເມວ ຫຼື ເບີໂທຂອງທ່ານ" />
              <div className="icon">
                <i className='bx bx-user' ></i>
              </div>
            </div>
            {/* <button type={`submit`} className={`btn`} >ເຂົ້າສູ່ລະບົບ</button> */}
            <button type={`${value.emailOrphone.length <= 4 ? 'button' : 'submit'}`} className={`${value.emailOrphone.length <= 4 ? 'disable' : 'btn'}`} >ສົ່ງ</button>
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
  )
}

export default ForgetPassword

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AdminSignStaff, GetAllUser, AdminSignSuperadmin } from '../../functions/Authentication';
import { useSelector } from 'react-redux';
import previewImage from '../../assets/image/upload.png'
import { Spin, Tabs } from 'antd';

const AddUser = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);

  // load all users
  useEffect(() => {
    GetAllUser(users.token).then(res => {
      const roles = [...new Set(res.data.data.map(item => item.role))]
      setRoleList(roles)
    }).catch(err => {
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
    })
  }, [])

  const handleChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
  }
// signin admin
  const handleSubmitAdmin = (e) => {
    setLoading(true);
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    const isEmpty = values.includes('');
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
        }
      });
      Toast.fire({
        icon: "error",
        title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ"
      });
      return;
    }

    const Data = Object.fromEntries(formData);
    e.currentTarget.reset();
    console.log("Data from Input", Data)

    AdminSignStaff(users.token, Data).then(res => {
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
          }
        });
        Toast.fire({
          icon: "success",
          title: "ສ້າງຜູ້ໃຊ້ສຳເລັດ"
        });
        navigate("/auth")
      }
    }).catch(err => {
      console.log(err)
      setLoading(false);
    })

  }
// signin supper admin
  const handleSubmitSuperAdmin = (e) => {
    setLoading(true);
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    const isEmpty = values.includes('');
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
        }
      });
      Toast.fire({
        icon: "error",
        title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ"
      });
      return;
    }

    const Data = Object.fromEntries(formData);
    e.currentTarget.reset();
    console.log("Data from Input", Data)

    AdminSignSuperadmin(users.token, Data).then(res => {
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
          }
        });
        Toast.fire({
          icon: "success",
          title: "ສ້າງຜູ້ໃຊ້ສຳເລັດ"
        });
        navigate("/auth")
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    })

  }

  const SignupAdmin = ()=>(<form onSubmit={handleSubmitAdmin} >
  <div className="card-user-add-content">
    <div className="user-add-form">
      <div className="form-group">
        <div className="input-group">
          <label htmlFor="">ຊື່</label>
          <input type="text" name="firstName" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ນາມສະກຸນ</label>
          <input type="text" name="lastName" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ລະຫັດຜ່ານ</label>
          <input type="password" name="password" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ເບີໂທ</label>
          <input type="text" name="phoneNumber" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ສິດເຂົ້າໃຊ້</label>
          <select name="role" className="form-controls-md" onChange={handleChange} >
            <option selected disabled>ເລຶອກສິດ</option>
            {roleList.map((item, i) => (
              <option value={item} key={i}>{item}</option>
            ))}
          </select>
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
</form>)
  const SignupSpperAdmin = ()=>(<form onSubmit={handleSubmitSuperAdmin} >
  <div className="card-user-add-content">
    <div className="user-add-form">
      <div className="form-group">
        <div className="input-group">
          <label htmlFor="">ຊື່</label>
          <input type="text" name="firstName" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ນາມສະກຸນ</label>
          <input type="text" name="lastName" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ລະຫັດຜ່ານ</label>
          <input type="password" name="password" className="form-controls-md" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="">ເບີໂທ</label>
          <input type="text" name="phoneNumber" className="form-controls-md" onChange={handleChange} />
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
</form>)

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Sigup Admin',
      children: SignupAdmin(),
    },
    {
      key: '2',
      label: 'Sigup Supper Admin',
      children: SignupSpperAdmin(),
    },
  ];

  return (
    <div className="card-main">
      <Spin spinning={loading} >
      <div className="card-add-user">
        <div className="card-user-header" id="add-user">
          <div className="text-tilte">
            <button
              onClick={() => navigate('/auth')}
              className="text-link">
              <i className='bx bx-chevron-left'></i>
              ກັບໄປໜ້າກ່ອນ
            </button>
          </div>
        </div>
        <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      </Spin>
    </div>
  )
}

export default AddUser
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { CreateTrip } from '../../../functions/Trip';
import ImagePreviews from '../../../assets/image/upload.png';
import { Spin } from 'antd';
const AddTravels = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("");
  const [value, setValue] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // set value trip
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  //  insert trip
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
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

    CreateTrip(Data, users.token).then(res => {
      if (res.status === 200) {
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
          icon: "success",
          title: "ບັນທຶກສຳເລັດແລ້ວ"
        });
        navigate("/travels");
        setImage("");
        setFileName("");
      }
    }).catch(err => {
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
      setImage("");
      setFileName("");
      return;
    })
  }

  return (
    <div className="card-main">
      <Spin spinning={loading}> 
      <div className="card-add-detail">
        <div className="card-detail-header" id="add-detail">
          <div className="text-tilte">
            <button
              onClick={() => navigate('/travels')}
              className="text-link">
              <i class='bx bx-chevron-left'></i>
              ກັບໄປໜ້າກ່ອນ
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" >
          <div className="card-detail-add-title">
            <div className="title-text">
              <h3>ລາຍລະອຽດ ແລະ ຜູ້ໂຊກດີ</h3>
            </div>
          </div>
          <div className="card-detail-add-content">
            <div className="detail-add-img">
              <div className="img-add">
                <div className="border-img" onClick={() => document.querySelector(".input-file").click()}>

                  {image
                    ? <img src={image} alt={fileName} className="img-fluid" />
                    : <><img src={ImagePreviews} className="img-fluid" /> <h3>ຮູບພາບສະຖານທີ</h3></>}

                  <input type="file" name="coverImage" className="input-file" hidden
                    onChange={({ target: { files } }) => {
                      files[0] && setFileName(files[0].name)
                      if (files) {
                        setImage(URL.createObjectURL(files[0]))
                      }
                    }} />
                </div>
              </div>
              <div className="save-btn">
                <button type="submit" className="btn-info"> ເພີ່ມ </button>
              </div>
            </div>
            <div className="detail-add-form">
              <div className="form-group">
                <div className="input-group">
                  <label htmlFor="">ຊື່ສະຖານທີ່</label>
                  <input type="text" name="placeName" className="form-controls-md" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="">ມື້ເດີນທາງ</label>
                  <input type="date" name="departureDate" className="form-controls-md" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="">ໄລຍະເວລາ</label>
                  <input type="text" name="period" className="form-controls-md" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="">ຈຳນວນຜູ້ເດີນທາງ</label>
                  <input type="text" name="amount" className="form-controls-md" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="">ເງືອນໄຂຄະແນນ PV</label>
                  <input type="text" name="conditionPv" className="form-controls-md" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="">ເງຶ່ອນໄຂຜຸ້ເຂົ້າຮ່ວມ</label>
                  <textarea name="condition" cols="30" rows="10" onChange={handleChange}>
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      </Spin>
    </div>
  )
}

export default AddTravels

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import previewImage from "../../../assets/image/upload.png";
import Swal from "sweetalert2";
// fucntion
import {
  GetOneUser,
  GetAllUser,
  UpdateUser,
} from "../../../functions/Authentication";
import { Spin, Select } from "antd";

const EditUser = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [fileName, setFileName] = useState("");
  const [userEdit, setUserEdit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [roles,setRoles]= useState("")

  useEffect(() => {
    GetOneUser(users.token, id)
      .then((res) => {
        setUserEdit(res.data.data);
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
    loadData();
  }, []);

  // load one user
  const loadData = () => {
    GetAllUser(users.token)
      .then((res) => {
        setLoading(false);
        const roles = [...new Set(res.data.data.map((item) => item.role))];
        setRoleList(roles);
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
  };
  // set value edtit
  const handleChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  const handleChangeRole = (e) => {
    setRoles(e);
    setUserEdit({ ...userEdit, role: e });
  };

  // update users
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
    const FinalData = ({...Data, role : roles})

    UpdateUser(users.token, FinalData, id)
      .then((res) => {
        if (res.status === 200) {
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
            title: "ອັບເດດຂໍ້ມູນສຳເລັດ",
          });
          setLoading(false);
          navigate("/auth");
        }
      })
      .catch((err) => {
        console.log(err);
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
          title: "ອັບເດດຂໍ້ມູນບໍ່ໄດ້",
        });

        if (err.response.data.message === "unauthorized") {
          dispatch({
            type: "USER_LOGOUT",
            payload: null,
          });
          navigate("/");
        }
      });
  };

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
          <form onSubmit={handleSubmit}>
            <div className="card-user-update-content">
              <div className="user-update-img">
                <div className="img-add">
                  <div
                    className="border-img"
                    onClick={() =>
                      document.querySelector(".input-file").click()
                    }
                  >
                    {image[0] ? (
                      <img src={image} alt={fileName} className="img-fluid" />
                    ) : (
                      <>
                        <img
                          src={
                            userEdit && userEdit.profile
                              ? userEdit.profile
                              : previewImage
                          }
                          className="img-fluid"
                        />
                      </>
                    )}

                    <input
                      type="file"
                      name="profile"
                      className="input-file"
                      hidden
                      onChange={({ target: { files } }) => {
                        files[0] && setFileName(files[0].name);
                        if (files) {
                          setImage(URL.createObjectURL(files[0]));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-update-form">
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຊື່</label>
                    <input
                      type="text"
                      value={userEdit && userEdit.firstName}
                      name="firstName"
                      className="form-controls-md"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ນາມສະກຸນ</label>
                    <input
                      type="text"
                      value={userEdit && userEdit.lastName}
                      name="lastName"
                      className="form-controls-md"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ເບີໂທ</label>
                    <input
                      type="text"
                      value={userEdit && userEdit.phoneNumber}
                      name="phoneNumber"
                      className="form-controls-md"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ສິດເຂົ້າໃຊ້</label>
                    <Select
                      name="role"
                      style={{
                        width: 650,
                        height: 40,
                      }}
                      value={userEdit && userEdit.role}
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
                        roleList.map((item, idx) => ({
                          value: item,
                          label: item,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="user-add-btn">
              <button type="submit" className="btn-add-user">
                {loading ? "ກຳລັງ...." : "ບັນທຶກ"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="btn-cancel-user"
              >
                ຍົກເລິກ
              </button>
            </div>
          </form>
        </div>
      </Spin>
    </div>
  );
};

export default EditUser;

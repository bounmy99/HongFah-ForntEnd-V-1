import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// function
import {
  GetAllUser,
  Permission,
  DeleteUser,
} from "../../functions/Authentication";
import LoadingInfo from "../../components/LoadingInfo";
import Swal from "sweetalert2";
import { Button, Tooltip, Empty, Spin } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

import PaginationComponent from "../../components/PaginationComponent"

const Auth = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChangeRole, setLoadingChangeRole] = useState(false);
  const [visible, setVisible] = useState(6);
  const [count, setCount] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [authEmpty, setAuthEmpty] = useState("");
  const [pages,setPages] = useState(1);
  const [pageSize,setPageSize] = useState(6)

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const indexOfLastPages = pages * pageSize;
  const indexOfFirstPages = indexOfLastPages - pageSize;
  const currentPages = user.slice(indexOfFirstPages, indexOfLastPages);

  const loadData = () => {
    GetAllUser(users.token)
      .then((res) => {
        setLoading(false);
        setUser(res.data.data);
        setCount(res.data.data.length);
        const roles = [...new Set(res.data.data.map((item) => item.role))];
        setRoleList(roles);
      })
      .catch((err) => {
        setLoading(false);
        setAuthEmpty(err.response.data.message);
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
  };

  const handleShowMore = () => {
    setVisible((show) => show + 3);
  };

  const handleRoles = (e, id) => {
    setLoadingChangeRole(true);
    e.preventDefault();
    const value = {
      id: id,
      role: e.target.value,
    };
    Permission(users.token, value.role, value.id)
      .then((res) => {
        if (res.data.message === "success") {
          setLoadingChangeRole(false);
          loadData();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ອັບເດດສຳເລັດ",
            showCancelButton: false,
            // timer : 3500
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "ຢືນຢັນການລົບ",
      text: "ທ່ານຕ້ອງການລລົບແທ້ບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteUser(users.token, id)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "ສຳເລັດ",
                text: "ລົບສຳເລັດແລ້ວ.",
                icon: "success",
                confirmButtonText: "ຕົກລົງ",
              });
              loadData();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <Spin spinning={loadingChangeRole} >
    <div className="card-main">
      <div className="auth-title">
        <div className="text-title">
          <h5>ຄົນທີ່ມີສິດໃນການເຂົ້າເຖິງເວັບແອັດມິນ ຫົງຟ້າ</h5>
        </div>
        <div className="btn-add">
          <Link to={"/auth/addUser"}>
            <button type="button" className="btn-success">
              ເພີ່ມໃໝ່
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        // <Loading paragraph={15}/>
        <LoadingInfo count={5} />
      ) : authEmpty ? (
        <div className="empty-card">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <a>{authEmpty}</a>
              </span>
            }
          ></Empty>
        </div>
      ) : (
        <div className="auth-list">
          <table cellPadding={0} cellSpacing={1}>
            {/* {user &&
              user.slice(0, visible).map((u, i) => ( */}
            {currentPages &&
              currentPages.map((u, i) => (
                <tr>
                  <td>
                    <Link to={`/auth/EditUser/${u._id}`}>
                      <Tooltip
                        placement="topLeft"
                        color={"#00A5E8"}
                        title={"ເບິ່ງລາຍລະອຽດ"}
                      >
                        <img
                          src={u.profile}
                          alt="image"
                          className="image-auth"
                        />
                      </Tooltip>
                    </Link>
                    <div className="username">
                      <h4>{`${u.firstName} ${u.lastName}`}</h4>
                      <p>
                        ສິດໃນການອະນຸຍາດ,ລົບສະມາຊິກ,ເພີ່ມເງື່ອນໄຂ,ຈັດການຄະແນນ
                      </p>
                    </div>
                  </td>
                  <td>{u.phoneNumber}</td>
                  <td>{u.email}</td>
                  <td>{u.userCode}</td>
                  <td>
                    <select
                      name="role"
                      defaultValue={u.role}
                      className="select-roles"
                      onChange={(e) => handleRoles(e, u._id)}
                    >
                      {roleList.map((role, index) => (
                        <option value={role} index={index}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="btn-auth-action">
                      <Link to={`/auth/EditUser/${u._id}`}>
                        <Tooltip
                          placement="top"
                          color={"#00A5E8"}
                          title={"ເບິ່ງລາຍລະອຽດ"}
                        >
                          <button className="btn-user-detail">
                            <EyeOutlined />
                          </button>
                        </Tooltip>
                      </Link>

                      <Tooltip
                        placement="top"
                        color={"#00A5E8"}
                        title={"ລົບຂໍ້ມູນ"}
                      >
                        <button
                          className="btn-user-delete"
                          onClick={() => handleDelete(u._id)}
                        >
                          <DeleteOutlined />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
          </table>
          { count > 6 &&
          <PaginationComponent
          count={count}
          setPageSize={setPageSize}
          pageSize={pageSize}
          setPages={setPages}
          pages={pages}
          />
          }
          {/* {user.length > 0 ? (
            visible >= count ? (
              ""
            ) : (
              <div className="load-more">
                <button className="btn" onClick={handleShowMore}>
                  ສະແດງເພີ່ມເຕີມ
                </button>
              </div>
            )
          ) : (
            <h1>ບໍ່ມີຂໍ້ມູນ</h1>
          )} */}
        </div>
      )}
    </div>
    </Spin>
  );
};

export default Auth;

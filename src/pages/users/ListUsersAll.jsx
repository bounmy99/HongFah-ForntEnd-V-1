import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Empty, Flex, Spin, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import DataTables from "../../components/DataTable";
import { GetAllUsers, ResetPassword, DeleteUsers } from "../../functions/Users";
import noImage from "../../assets/image/no-image.png";

const ListUsersAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({ ...state }));
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAwait, setLoadingAwait] = useState(false);
  const [usersAll, setUsersAll] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [userEmpty, setUserEmpty] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  // function forst load when open pages
  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);
  // function load data
  const loadData = () => {
    GetAllUsers(users.token, "")
      .then((res) => {
        setUsersAll(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setUserEmpty(err.response.data.message);
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
        setLoading(false);
      });
  };
  // function open button
  const handleModal = () => {
    setOpenModal(true);
  };
  // function update password
  const handleSubmit = (e) => {
    setLoadingAwait(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    const isEmpty = values.includes("");
    if (isEmpty) {
      setOpenModal(false);
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
    ResetPassword(users.token, Data)
      .then((res) => {
        if (res.data.message === "success") {
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
            title: "ອັບເດດລະຫັດຜ່ານສຳເລັດ",
          });
          loadData();
          setLoadingAwait(false);
          setOpenModal(false);
        }
      })
      .catch((err) => {
        setLoadingAwait(false);
        if (err) {
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
            title: err.response.data.message,
          });
          loadData();
        }
      });
  };
  // function cancel button
  const handleModalCancel = () => {
    setOpenModal(false);
    setFormType(true);
    setInfoUser([]);
  };
  // function delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "ຢືນຢັນລົບ",
      text: "ທ່ານຕ້ອງລົບແທ້ບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingSearch(true);
        DeleteUsers(users.token, id)
          .then((res) => {
            if (res.status === 200) {
              setLoadingSearch(false);
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
                title: "ລົບສຳເລັດແລ້ວ",
              });
              loadData();
            }
          })
          .catch((err) => {
            setLoadingSearch(false);
            setUserEmpty(err.response.data.message);
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
            setLoading(false);
          });
      }
    });
  };

  let openModals = openModal ? "open" : "";

  // customize style header of table
  const customStyles = {
    rows: {
      style: {
        minHeight: "60px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "15px",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#00A5E8",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
  };

  // colunms headers of table
  const columns = [
    {
      name: "ຮູບພາບ",
      cell: (row) => (
        <div className="images-users">
          <Tooltip title="ກົດເພື່ອເບິ່ງລະອຽດ" color="#00A5E8">
            <Link to={`/users/detail/${row._id}`}>
              {row.profile ? (
                <img src={row.profile} alt={row.userCode} />
              ) : (
                <img src={noImage} alt={row.userCode} />
              )}
            </Link>
          </Tooltip>
        </div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "ລະຫັດສະມາຊິກ",
      selector: (row) => row.userCode,
      cell: (row) => <p>{row.userCode}</p>,
      sortable: true,
      width: "120px",
    },
    {
      name: "ຊື່ແລະນາມສະກຸນ",
      cell: (row) => (
        <div>
          <p className="posit-gold">{`${row.firstName} ${row.lastName}`}</p>
        </div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "ເບີໂທ",
      selector: (row) => row.phoneNumber,
      cell: (row) => (
        <p className="posit-text-acount-name">{row.phoneNumber}</p>
      ),
      sortable: true,
      width: "210px",
    },
    {
      name: "ທີ່ຢູ່",
      cell: (row) => (
        <p className="posit-text-acount-name">
          {row.address &&
            `${row.address.village}, ${row.address.district}, ${row.address.province}`}
        </p>
      ),
      sortable: true,
      width: "210px",
    },
    {
      name: "ສະຖານະ",
      sortable: true,
      selector: (row) => row.role,
      cell: (row) => <p>{row.role}</p>,
      width: "100px",
    },
    {
      name: "ຈັດການ",
      cell: (row) => (
        <>
          <button
            style={{ width: "50px", height: "30px", margin: "5px" }}
            className="btn-success"
            onClick={() => handleModal(row._id)}
          >
            ແກ້ໄຂ
          </button>
          <button
            style={{ width: "50px", height: "30px", margin: "5px" }}
            className="btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            ລົບ
          </button>
        </>
      ),
      width: "180px",
    },
  ];

  // set value change passwprd
  const handleChange = (e) => {
    setInfoUser({ ...infoUser, [e.target.name]: e.target.value });
  };

  // set value input search
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };

  // function search data
  useEffect(() => {
    setLoadingSearch(true);
    GetAllUsers(users.token, valueSearch)
      .then((res) => {
        setLoadingSearch(false);
        setUsersAll(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoadingSearch(false);
        setUserEmpty(err.response.data.message);
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
        setLoading(false);
      });
  }, [valueSearch]);

  const handleClickSearch = () => {
    setLoadingSearch(true);
    GetAllUsers(users.token, valueSearch)
      .then((res) => {
        setLoadingSearch(false);
        setUsersAll(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoadingSearch(false);
        setUserEmpty(err.response.data.message);
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
        setLoading(false);
      });
  };

  return (
    <div className="card-main">
      {loading ? (
        <div className="empty-card">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <a>ກຳລັງໂຫຼດ....</a>
                <Spin spinning={loading} />
              </span>
            }
          ></Empty>
        </div>
      ) : (
        <>
          <Spin spinning={loadingSearch}>
            <div className="user-table">
              <div className="user-card-header">
                <div className="search">
                  <div className="input-search">
                    <input
                      type="search"
                      placeholder="ຄົ້ນຫາລູກຄ້າ ຕາມຊື່, ເບີໂທ ຫຼື ລະຫັດພະນັກງານ"
                      onChange={handleChangeSearch}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <circle
                        cx="7.27273"
                        cy="7.27273"
                        r="6.27273"
                        stroke="#00A5E8"
                        stroke-width="2"
                      ></circle>
                      <line
                        x1="14.5858"
                        y1="16"
                        x2="11.6364"
                        y2="13.0506"
                        stroke="#00A5E8"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></line>
                    </svg>
                  </div>
                  <div className="btn-search">
                    <button type="button" onClick={handleClickSearch}>
                      ຄົ້ນຫາ
                    </button>
                  </div>
                </div>
              </div>
              {
                <DataTables
                  columns={columns}
                  data={usersAll}
                  customStyles={customStyles}
                  userEmpty={userEmpty}
                />
              }
            </div>
          </Spin>
        </>
      )}

      {/* ================================Modal============================= */}
      <div className={`modal-user ${openModals}`}>
        <div className="modal-user-card Card">
          <form onSubmit={handleSubmit}>
            <div className="modal-user-card-content">
              <div className="modal-input-user">
                <div className="modal-user-input">
                  <div className="user-title">
                    <h3>Reset Password</h3>
                  </div>
                  <div className="modal-user-form-group">
                    <div className="input-group-user">
                      <label htmlFor="">ລະຫັດສະມາຊິກ</label>
                      <input
                        type="text"
                        name="userCode"
                        className="form-modal-control-user"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group-user">
                      <label htmlFor="">ລະຫັດຜ່ານ</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-modal-control-user"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modals-user-btn">
                <button
                  type="button"
                  className="modal-user-btn btn-secondary"
                  onClick={handleModalCancel}
                >
                  ຍົກເລີກ
                </button>
                <button type="submit" className="modal-user-btn btn-info">
                  {loadingAwait ? (
                    <>
                      <span>ກຳລັງ....</span>
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 24,
                              color: "white",
                            }}
                            spin
                          />
                        }
                      />
                    </>
                  ) : (
                    "ຢືນຢັນ"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListUsersAll;

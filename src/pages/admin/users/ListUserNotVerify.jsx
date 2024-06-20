import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Spin, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DataTables from "../../../components/DataTable";
import {
  GetAllNotVerify,
  ResetPassword,
  DeleteUsers,
  Verify,
} from "../../../functions/Users";
import noImage from "../../../assets/image/no-image.png";
import EmptyContent from "../../../components/EmptyContent";
const ListUserNotVerify = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [userNotVerify, setUserNotVerify] = useState([]);
  const [infoUsers, setinfoUsers] = useState([]);
  const [userEmpty, setUserEmpty] = useState(null);
  const [valueSearch, setValueSearch] = useState("");

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  // function show hide password
  const showHide = () => {
    setIsPasswordShow((isPasswordShow) => !isPasswordShow);
  };

  // function first load when open pages
  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  // load all data
  const loadData = () => {
    GetAllNotVerify(users.token, "")
      .then((res) => {
        setUserNotVerify(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setUserEmpty("ບໍ່ມີຂໍ້ມູນ");
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
        setLoading(false);
      });
  };

  // function open modal
  const handleModal = () => {
    setOpenModal(true);
  };
  let openModals = openModal ? "open" : "";

  // function reset password
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    const isEmpty = values.includes("");
    if (isEmpty) {
      // setOpenModal(false);
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

    console.log("Data In form", Data);

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
            title: "ອັບເດດສຳເລັດແລ້ວ",
          });
          setOpenModal(false);
          loadData();
          navigate("/users", { state: { key: 2 } });
        }
      })
      .catch((err) => {
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
            title: "ບໍ່ສາມາດອັບເດດຂໍ້ມູນໄດ້",
          });
          if (err.response.data.message === "unauthorized") {
            dispatch({
              type: "USER_LOGOUT",
              payload: null,
            });
            navigate("/");
          }
          loadData();
        }
      });
  };

  // function cancel button modal
  const handleModalCancel = () => {
    setOpenModal(false);
    setinfoUsers([]);
  };

  // function delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "ລົບຂໍ້ມູນ",
      text: "ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ບໍ່ ?",
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
              title: "ບໍ່ສາມາດລົບຂໍ້ມູນໄດ້",
            });

            if (err.response.data.message === "unauthorized") {
              dispatch({
                type: "USER_LOGOUT",
                payload: null,
              });
              navigate("/");
            }
          });
      }
    });
  };

  // function verify users
  const handleVerify = (id) => {
    Swal.fire({
      title: "ຢືນຢັນການ Verify",
      text: "ທ່ານຕ້ອງການ Verify ແທ້ບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        Verify(users.token, id)
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
                title: "Verify ສຳເລັດແລ້ວ",
              });
              loadData();
              navigate("/users", { state: { key: 3 } });
              setValueSearch("")
            }
          })
          .catch((err) => {
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
                title: "ບໍ່ສາມາດ Verify ໄດ້",
              });
            }
          });
      }
    });
  };
  // customize header of table
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
  // colums header of table
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
      name: "verify",
      cell: (row) => (
        <div className="user-status">
          {row.status === "success" ? (
            <div className="status-approved">
              <p>ຢືນຢັນສຳເລັດ</p>
            </div>
          ) : (
            <>
              <div
                className="status-success"
                onClick={() => handleVerify(row._id)}
              >
                <p>verify</p>
              </div>
              {/* <div
                className="status-danger"
                onClick={() => handleReject(row._id)}
              >
                <p>ປະຕິເສດ</p>
              </div> */}
            </>
          )}
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
        row.phoneNumber ?
        <Tooltip title="ກົດໃສ່ເບີໂທເພື່ອໄປທີ່ Whatsapp" color="#00A5E8">
          <p className="posit-text-acount-name">
            <Link
              to={`https://wa.me/${row.phoneNumber}?text=ສົ່ງການແຈ້ງເຕືອນການອະນຸມັດໃຫ້ກັບບຸກຄົນນີ້`}
              target="_blank"
            >
              {row.phoneNumber}
            </Link>
          </p>
        </Tooltip>
        : "ບໍ່ມີ"
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
  // set value
  const handleChange = (e) => {
    setinfoUsers({ ...infoUsers, [e.target.name]: e.target.value });
  };
  // set value input search
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };

  // function handle Search
  useEffect(() => {
    setLoadingSearch(true);
    GetAllNotVerify(users.token, valueSearch)
      .then((res) => {
        setUserNotVerify(res.data.data);
        setLoading(false);
        setLoadingSearch(false);
      })
      .catch((err) => {
        setLoadingSearch(false);
        setUserEmpty("ບໍ່ມີຂໍ້ມູນ");
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
        setLoading(false);
      });
  }, [valueSearch]);

  const handleClickSearch = () => {
    setLoadingSearch(true);
    GetAllNotVerify(users.token, valueSearch)
      .then((res) => {
        setUserNotVerify(res.data.data);
        setLoading(false);
        setLoadingSearch(false);
      })
      .catch((err) => {
        setLoadingSearch(false);
        setUserEmpty("ບໍ່ມີຂໍ້ມູນ");
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
        setLoading(false);
      });
  };
  return (
    <div className="card-main">
      <Spin spinning={loadingSearch}>
            <div className="user-table">
              <div className="user-card-header">
                <div className="search">
                  <div className="input-search">
                    <input
                      type="search"
                      placeholder="ຄົ້ນຫາລູກຄ້າ ຕາມຊື່, ເບີໂທ ຫຼື ລະຫັດພະນັກງານ"
                      onChange={handleChangeSearch}
                      value={valueSearch}
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
                        strokeWidth="2"
                      ></circle>
                      <line
                        x1="14.5858"
                        y1="16"
                        x2="11.6364"
                        y2="13.0506"
                        stroke="#00A5E8"
                        strokeWidth="2"
                        strokeLinecap="round"
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

                !userNotVerify ?
                <EmptyContent Messages={"ບໍ່ມີຂໍ້ມູນ"} />
                 :
                <DataTables
                  columns={columns}
                  data={userNotVerify}
                  customStyles={customStyles}
                  userEmpty={userEmpty}
                  loading={loading}
                />
              }
            </div>
      </Spin>
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
                        type={`${isPasswordShow ? "text" : "password"}`}
                        name="newPassword"
                        className="form-modal-control-user"
                        onChange={handleChange}
                      />
                      {userNotVerify?.newPassword && (
                        <div className="icon-right" onClick={showHide}>
                          <i
                            className={`bx ${
                              isPasswordShow ? "bx-show-alt" : "bx-low-vision"
                            }`}
                          ></i>
                        </div>
                      )}
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
                  ຢືນຢັນ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListUserNotVerify;

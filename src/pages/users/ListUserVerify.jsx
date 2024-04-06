import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { read, writeFileXLSX, utils } from "xlsx";
import { Empty, Flex, Spin, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import DataTables from "../../components/DataTable";
import { GetAllVerify,ResetPassword,DeleteUsers } from "../../functions/Users";
import noImage from "../../assets/image/no-image.png"
const ListVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({ ...state }));
  const [startDate, setStartDate] = useState(new Date());
  const [isActiveDropdownFilter, setIsActiveDropdownFilter] = useState(false);
  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAwait, setLoadingAwait] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [withDraw, setWithDraw] = useState([]);
  const [infoWithDraw, setinfoWithDraw] = useState([]);
  const [withdrawEmpty, setWithWrawEmpty] = useState(null);

  // const DataFilter = [15000, 30000, 50000, 100000];

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = () => {
    GetAllVerify(users.token)
      .then((res) => {
        console.log(res.data)
        setWithDraw(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setWithWrawEmpty(err.response.data.message);
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

  // const handleClickOpenDrop = () => {
  //   setIsActiveDropdownFilter(
  //     (isActiveDropdownFilter) => !isActiveDropdownFilter
  //   );
  // };
  // let openDrop = isActiveDropdownFilter ? "active" : "";

  // const handleClick = (e) => {
  //   setSelected(e.target.textContent);
  //   setIsActiveDropdownFilter(false);
  // };

  const handleModal = () => {
    setOpenModal(true);
  };
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
            title: "ອັບເດດລະຫັດຜ່ານສຳເລັດ",
          });
          setImage("");
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

  const handleModalCancel = () => {
    setOpenModal(false);
    setFormType(true);
    setImage("");
    setinfoWithDraw([]);
  };

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
        DeleteUsers(users.token, id)
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
                title: "ລົບສຳເລັດແລ້ວ",
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


  let openModals = openModal ? "open" : "";


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

  const columns = [
    {
      name: "ຮູບພາບ",
      cell: (row) => (
        <div className="images-users"> 
          <Tooltip title="ກົດເພື່ອເບິ່ງລະອຽດ" color="#00A5E8">
            <Link to={`/users/detail/${row._id}`}>
               {row.profile ?<img src={row.profile} alt={row.userCode} /> :<img src={noImage} alt={row.userCode} />}
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
        <p className="posit-text-acount-name">{row.address && `${row.address.village}, ${row.address.district}, ${row.address.province}`}</p>
      ),
      sortable: true,
      width: "210px",
    },
    {
      name: "ສະຖານະ",
      sortable: true,
      selector: (row) => row.role,
      cell: (row) => (<p>{row.role}</p>),
      width: "180px",
    },
    {
      name: "ຈັດການ",
      cell: (row) => (
            <>
              <button
                style={{width:"50px", height:"30px", margin:"5px"}}
                className="btn-success"
                onClick={() => handleModal(row._id)}
              >
                ແກ້ໄຂ
              </button>
              <button
                style={{width:"50px", height:"30px", margin:"5px"}}
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

  // const handleExport = () => {
  //   const heading = [
  //     [
  //       "ລະຫັດສະມາຊິກ",
  //       "ຕຳແໜ່ງ",
  //       "ບັນຊີ",
  //       "ຊື່ບັນຊີ",
  //       "ເລກບັນຊີທະນາຄານ",
  //       "ເງິນທີ່ຖອນ",
  //       "ວັນທີຮ້ອງຂໍ",
  //       "ສະຖານະ",
  //     ],
  //   ];
  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //   utils.sheet_add_aoa(ws, heading);
  //   utils.sheet_add_json(ws, withDraw, { origin: "A4", skipHeader: true });
  //   utils.book_append_sheet(wb, ws, "ການຖອນເງິນ");
  //   writeFileXLSX(wb, "ການຖອນເງິນ.xlsx");
  // };

  const handleChange = (e) => {
    setinfoWithDraw({ ...infoWithDraw, [e.target.name]: e.target.value });
  };
  // console.log("file", infoWithDraw)

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
                <a>ກຳລັງໂຫຼດ....</a><Spin/>
              </span>
            }
          ></Empty>
        </div>
      ) : (
        <>
          <div className="withdraw-table">
            <div className="withdraw-card-header">
              <div className="search">
                <div className="input-search">
                  <input
                    type="text"
                    placeholder="ຄົ້າຫາລູກຄ້າ ຕາມຊື່, ເບີໂທ ຫຼື ລະຫັດພະນັກງານ"
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
              </div>
              {/* <div class="button">
                <div className="datepicker">
                  <i className="bx bx-calendar icons-left"></i>
                  <span className="text-date">ວັນທີ</span>
                  <DatePicker
                    className="btn-datepicker"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setIsActiveDropdownFilter(false);
                    }}
                  />
                  <i className="bx bx-chevron-down icons-right"></i>
                </div>
                <div className="withdraw-filter">
                  <div className="withdraw-filter-menu">
                    <div
                      className={`withdraw-filter-btn ${openDrop}`}
                      onClick={handleClickOpenDrop}
                    >
                      <i className="bx bx-filter"></i>{" "}
                      {selected ? (
                        <span className="sBtn-text">{selected}</span>
                      ) : (
                        <span className="sBtn-text">ຕົວກອງ</span>
                      )}
                      <i className="bx bx-chevron-down"></i>
                    </div>
                    {isActiveDropdownFilter && (
                      <ul className="options-withdraw-filter">
                        {DataFilter.map((item, idx) => (
                          <li
                            className="option-withdraw-filter"
                            key={idx}
                            onClick={handleClick}
                          >
                            <span className="option-withdraw-filter-text">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    className="btn-show"
                    type="button"
                    onClick={handleExport}
                  >
                    <i class="bx bxs-file-export bx-rotate-90"></i> ນຳອອກຂໍ້ມູນ
                  </button>
                </div>
              </div> */}
            </div>
            {withdrawEmpty ? (
              <div className="empty-card">
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span>
                      <a>{withdrawEmpty}</a>
                    </span>
                  }
                ></Empty>
              </div>
            ) : (
              <DataTables
                columns={columns}
                data={withDraw}
                customStyles={customStyles}
              />
            )}
          </div>
        </>
      )}

      {/* ================================Modal============================= */}
      <div className={`modal-withdraw ${openModals}`}>
        <div className="modal-withdraw-card Card">
          <form onSubmit={handleSubmit}>
            <div className="modal-withdraw-card-content">
              <div className="modal-input-withdraw">
                <div className="modal-withdraw-input">
                  <div className="withdraw-title">
                    <h3>Reset Password</h3>
                  </div>
                  <div className="modal-withdraw-form-group">
                    <div className="input-group-withdraw">
                      <label htmlFor="">ລະຫັດສະມາຊິກ</label>
                      <input
                        type="text"
                        name="userCode"
                        className="form-modal-control-withdraw"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group-withdraw">
                      <label htmlFor="">ລະຫັດຜ່ານ</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-modal-control-withdraw"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modals-withdraw-btn">
                <button
                  type="button"
                  className="modal-withdraw-btn btn-secondary"
                  onClick={handleModalCancel}
                >
                  ຍົກເລີກ
                </button>
                <button type="submit" className="modal-withdraw-btn btn-info">
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

export default ListVerify;

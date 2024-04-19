import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Empty, Button, Drawer, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import moment from "moment";
// function and component
import PaginationComponent from "../../components/PaginationComponent";
import { GetUserCode } from "../../functions/GetUserWithUsercode";
import {
  GetOneTrip,
  UpdateTrip,
  AddmemberTrip,
  DeleteMemberTrip,
} from "../../functions/Trip";
import ImageTravel from "../../assets/image/no-image.png";

const DetailTravels = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [value, setValue] = useState([]);
  const [valueSearch, setValueSearch] = useState([]);
  const [status, setStatus] = useState(false);
  const [useCode, setUserCode] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState([]);
  const [count, setCount] = useState("");
  const [pageSize, setPageSize] = useState(4);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  // function load data
  const loadData = () => {
    GetOneTrip(users.token, id)
      .then((res) => {
        setValue(res.data.data);
        setMember(res.data.data.members);
        setCount(res.data.data.members.length);
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

  // ===========pagination antd =============
  const indexOfLastPages = pages * pageSize;
  const indexOfFirstPages = indexOfLastPages - pageSize;
  const currentPages = member.slice(indexOfFirstPages, indexOfLastPages);

  // ================ end pagination antd ===========

  // open sidebar insert member
  const showDrawer = () => {
    setOpen(true);
  };

  // close sidebar inset member
  const onClose = () => {
    setOpen(false);
    setUserCode("");
    setValueSearch("");
    setStatus(false);
  };
  // set value search
  const handleSeach = (e) => {
    setUserCode(e.target.value);
  };
  // function search data
  const handleSeachData = () => {
    setLoadingSearch(true);
    GetUserCode(users.token, useCode)
      .then((res) => {
        setValueSearch(res.data.data);
        setStatus(true);
        setLoadingSearch(false);
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
          title: err.response.data.message,
        });
        setOpen(false);
        setUserCode("");

        if (err.response.data.message === "unauthorized") {
          dispatch({
            type: "USER_LOGOUT",
            payload: null,
          });
          navigate("/");
        }
      });
  };
  // function delete member
  const handleDelete = (memberId) => {
    const Member = {
      trip_id: value._id,
      user_id: memberId,
    };
    Swal.fire({
      title: "ທ່ານຕ້ອງການລົບແທ້ບໍ່",
      text: "ຖ້າທ່ານລົບໄປແລ້ວບໍ່ສາມາດກູ້ຄືນໄດ້ອີກ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteMemberTrip(users.token, Member).then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              title: "ສຳເລັດ",
              text: "ການລົບຂໍ້ມູນສຳເລັດ.",
              icon: "success",
              confirmButtonText: "ຕົກລົງ",
            });
            loadData();
          }
        });
      }
    });
  };

  // set value trip
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // function insert member
  const handleMember = (e) => {
    setLoadingSearch(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Data = Object.fromEntries(formData);
    e.currentTarget.reset();
    console.log("Data from Input", Data);
    AddmemberTrip(users.token, Data)
      .then((res) => {
        setOpen(false);
        loadData();
        setValueSearch("");
        setStatus(false);
        setLoadingSearch(false);
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
  // function update trip
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
    console.log("Data from Input update trip", Data);

    UpdateTrip(Data, id, users.token)
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
            title: "ອັບເດດສຳເລັດແລ້ວ",
          });
          navigate("/travels");
          setImage("");
          setFileName("");
          setLoading(false);
        }
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
        setLoading(false);
        return;
      });
  };

  const styleInput = {
    width: 280,
    padding: 6,
    margin: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
    outline: "none",
    paddingLeft: 35,
    borderColor: "1px solid #00A4CD",
  };
  return (
    <div className="card-main">
      <Spin spinning={loading}>
        <div className="card-detail">
          <div className="card-detail-header">
            <div className="text-tilte">
              <button
                onClick={() => navigate("/travels")}
                className="text-link"
              >
                <i class="bx bx-chevron-left"></i>
                ກັບໄປໜ້າກ່ອນ
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-detail-title">
              <div className="title-text">
                <h3>ລາຍລະອຽດ ແລະ ຜູ້ໂຊກດີ</h3>
              </div>
            </div>
            <div className="card-detail-content">
              <div className="detail-img">
                <div className="img">
                  <div
                    onClick={() =>
                      document.querySelector(".input-file").click()
                    }
                  >
                    {image ? (
                      <img src={image} alt={fileName} className="img-fluid" />
                    ) : (
                      <img
                        src={value.cover ? value.cover : ImageTravel}
                        alt=""
                      />
                    )}

                    <input
                      type="file"
                      name="coverImage"
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
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຊື່ສະຖານທີ່</label>
                    <input
                      type="text"
                      name="placeName"
                      className="form-controls-md"
                      value={value.placeName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ມື້ເດີນທາງ</label>
                    <input
                      type="text"
                      name="departureDate"
                      className="form-controls-md"
                      value={moment(value.departureDate).format("DD-MM-YYYY")}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ໄລຍະເວລາ</label>
                    <input
                      type="text"
                      name="period"
                      className="form-controls-md"
                      value={value.period}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ເງືອນໄຂຄະແນນ PV</label>
                    <input
                      type="text"
                      name="level"
                      className="form-controls-md"
                      value={value.conditionPv}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ຈຳນວນຜູ້ເດີນທາງ</label>
                    <input
                      type="text"
                      name="amount"
                      className="form-controls-md"
                      value={value.amount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="detail-table">
                <Button type="primary" onClick={showDrawer}>
                  ເພີ່ມສະມາຊິກ
                </Button>
                <div className="card-table">
                  {member.length ? (
                    <div className="table-show-member">
                      <div>
                        <table cellPadding={0} cellSpacing={0}>
                          <thead>
                            <tr>
                              <th>ໂປຣຟາຍ</th>
                              <th>ຊື່ສະມາຊິກ</th>
                              <th>ລະຫັດສະມາຊິກ</th>
                              <th>ຕຳແໜ່ງ</th>
                              <th>ຈັດການ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPages &&
                              currentPages.map((item, i) => (
                                <tr key={i}>
                                  <td>
                                    <img
                                      style={{ width: 50, height: 50 }}
                                      src={item.profile}
                                      alt=""
                                    />
                                  </td>
                                  <td>{`${item.firstName} ${item.lastName}`}</td>
                                  <td>{item.userCode}</td>
                                  <td>
                                    {item.position && item.position.title
                                      ? item.position.title
                                      : "ບໍ່ທັນມີ"}
                                  </td>
                                  <td>
                                    <DeleteOutlined
                                      onClick={() => handleDelete(item._id)}
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {count > 1 && (
                          <div className="pagination-member">
                            <PaginationComponent
                              count={count}
                              setPageSize={setPageSize}
                              pageSize={pageSize}
                              setPages={setPages}
                              pages={pages}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="empty-card">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 100,
                        }}
                        description={
                          <span>
                            <a>ບໍ່ທັນມີລາຍການສະມາຊິກ</a>
                          </span>
                        }
                      ></Empty>
                    </div>
                  )}
                </div>
                <div className="datail-conditional">
                  <h3>ລາຍລະອຽດ</h3>
                  <textarea
                    name="condition"
                    value={value.condition}
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="save-btn">
              <button type="submit" className="btn-info">
                {" "}
                ບັນທຶກ{" "}
              </button>
              <button
                onClick={() => navigate("/travels")}
                className="btn-danger"
              >
                {" "}
                ຍົກເລິກ{" "}
              </button>
            </div>
          </form>

          <div className="form-add-member">
            <Drawer title="ເພີ່ມສະມາຊິກ" onClose={onClose} open={open}>
              <div className="add-member-form-group">
                <div className="input-group-add-member">
                  <div>
                    <label htmlFor="">ຄົ້ນຫາສະມາຊິກ</label>
                  </div>
                  <input
                    type="text"
                    value={useCode}
                    style={styleInput}
                    className="form-modal-control-add-member"
                    onChange={handleSeach}
                  />
                  <i
                    class="bx bx-search member"
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={handleSeachData}
                  ></i>
                </div>
                {status ? (
                  <form onSubmit={handleMember}>
                    <div className="input-group-add-member">
                      <input
                        type="text"
                        name="trip_id"
                        value={value._id}
                        hidden
                      />
                      <input
                        type="text"
                        name="user_id"
                        value={`${
                          valueSearch.user_id && valueSearch.user_id._id
                        }`}
                        hidden
                      />
                      <div>
                        <label htmlFor="">ຊື່</label>
                      </div>
                      <input
                        type="text"
                        name=""
                        style={styleInput}
                        value={`${
                          valueSearch.user_id && valueSearch.user_id.firstName
                        }`}
                        className="form-modal-control-add-member"
                      />
                    </div>
                    <div className="input-group-add-member">
                      <div>
                        <label htmlFor="">ນາມສະກຸນ</label>
                      </div>
                      <input
                        type="text"
                        name=""
                        style={styleInput}
                        value={`${
                          valueSearch.user_id && valueSearch.user_id.lastName
                        }`}
                        className="form-modal-control-add-member"
                      />
                    </div>
                    <div className="input-group-add-member">
                      <div>
                        <label htmlFor="">ເບີໂທ</label>
                      </div>
                      <input
                        type="text"
                        name=""
                        style={styleInput}
                        value={`${
                          valueSearch.user_id && valueSearch.user_id.phoneNumber
                        }`}
                        className="form-modal-control-add-member"
                      />
                    </div>
                    <div
                      className="add-member-btn"
                      style={{ justifyContent: "center" }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setStatus(false);
                          setValueSearch([]);
                        }}
                        style={{
                          width: 50,
                          padding: 3,
                          marginTop: 5,
                          marginLeft: 100,
                        }}
                        className="add-member-btn btn-secondary"
                      >
                        ຍົກເລີກ
                      </button>
                      <button
                        type="submit"
                        style={{
                          width: 50,
                          padding: 3,
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                        className="add-member-btn btn-info"
                      >
                        ເພີ່ມ
                      </button>
                    </div>
                  </form>
                ) : loadingSearch ? (
                  <div className="empty-card">
                    <Spin />
                  </div>
                ) : (
                  <div className="empty-card">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={
                        <span>
                          <a>ບໍ່ມີຂໍ້ມູນ</a>
                        </span>
                      }
                    ></Empty>
                  </div>
                )}
              </div>
            </Drawer>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default DetailTravels;

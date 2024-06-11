import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip, notification } from "antd";
import { Badge, Drawer } from "antd";
import { io } from "socket.io-client";
import addNotification from "react-push-notification";
import moment from "moment";
import {
  CloseOutlined,
  DollarOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

// ======================= images =======================
import images from "../assets/logo/Logo1.png";
import UserImage from "../assets/image/profile-1.jpg";
import Breadcrumbs from "../components/Breadcrumbs";
import imageWarning from "../assets/image/warning.png";
import EmptyContent from "../components/EmptyContent";
import { formatPrice } from "../functions/FormatPrices";
import { ReadedNoti, GetOneNoti, GetAllNoti } from "../functions/AdminNoti";

const Headers = () => {
  const { users, Notification } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNoti, setOpenNoti] = useState(false);
  const [dataNotiOne, setDataNotiOneOne] = useState([]);
  const [notifications, setNotifications] = useState(null);

  const CallNotification = () => {
    GetAllNoti(users?.token)
      .then((res) => {
        dispatch({
          type: "NEW_USER",
          payload: res.data.data,
        });
      })
      .catch((err) => {
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "top-end",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.onmouseenter = Swal.stopTimer;
        //     toast.onmouseleave = Swal.resumeTimer;
        //   },
        // });
        // Toast.fire({
        //   icon: "warning",
        //   title: "ບໍ່ມີຂໍ້ມູນການແຈ້ງເຕືອນ",
        // });

        if (err.response.data.message === "unauthorized") {
          dispatch({
            type: "USER_LOGOUT",
            payload: null,
          });
          navigate("/");
        }
      });
  };

  // ====================== connect to socket io start =========================
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const socket = io(
    `wss://hongfah-server.onrender.com?user_id=${users.id}`,
    config
  );
  socket.emit("join_room_admin");

  socket.on("notification", (data) => {
    setNotifications({ ...notifications, data });
  });

  // ============ connect socket io end =============

  useEffect(() => {
    if (Notification) {
      const item = Notification.map((noti) => noti.type);
      addNotification({
        title: "ການແຈ້ງເຕືອນ",
        message: item,
        theme: "darkblue",
        duration: 3000,
        position: "top-middle",
        icon: images,
        colorTop: "green",
        colorBottom: "darkgreen",
        onClick: () => console.log("eeee"),
        native: true,
      });
    }
    CallNotification();
  }, [notifications]);

  const [open, setOpen] = useState(false);
  const showDrawer = (id) => {
    setOpen(true);
    setOpenNoti(false);
    GetOneNoti(users.token, id)
      .then((res) => {
        setDataNotiOneOne(res.data.data);
        CallNotification();
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
    ReadedNoti(users.token, { notiID: id }).then((res) => {
      if (res) {
        CallNotification();
      }
    });
  };
  const onClose = () => {
    setOpen(false);
  };

  const [toggle, setToggle] = useState("");

  const ToggleNoti = () => {
    setOpenNoti((openNoti) => !openNoti);
  };
  const Toggles = openNoti ? "open" : "";

  const BonusDirection = (notiID) => {
    navigate("/Bonus", { state: { key: 1 } });
    ReadedNoti(users.token, { notiID: notiID }).then((res) => {
      if (res) {
        CallNotification();
      }
    });
  };
  const UserDirection = (notiID) => {
    navigate("/users", { state: { key: 2 } });
    ReadedNoti(users.token, { notiID: notiID }).then((res) => {
      if (res) {
        CallNotification();
      }
    });
  };
  const OrdersDirection = (notiID) => {
    navigate("/homeOrders", { state: { key: 1 } });
    ReadedNoti(users.token, { notiID: notiID }).then((res) => {
      if (res) {
        CallNotification();
      }
    });
  };

  const DirectionPages = (type, notiID) => {
    type === "paidBonus" && BonusDirection(notiID);
    type === "newUserSub" && UserDirection(notiID);
    type === "newOrder" && OrdersDirection(notiID);
    // dispatch({
    //   type: "READ_USER",
    //   payload: [],
    // });
    setOpenNoti(false);
  };

  const openInforUser = () => {
    notification.open({
      message: "ຂໍ້ມູນທົ່ວໄປ",
      description: (
        <>
          <div className="image-auth">
            <img
              src={users && users.profile ? users.profile : UserImage}
              alt={`image`}
            />
          </div>
          <p>Username : {users.username ? users.username : "ບໍ່ມີ"}</p>
          <p>Email : {users.email ? users.email : "ບໍ່ມີ"}</p>
          <p>PhoneNumber : {users.phoneNumber ? users.phoneNumber : "ບໍ່ມີ"}</p>
          <p>UserCode : {users.userCode ? users.userCode : "ບໍ່ມີ"}</p>
        </>
      ),
    });
  };

  const logout = () => {
    dispatch({
      type: "USER_LOGOUT",
      payload: [],
    });
    navigate("/");
    window.location.reload();
  };

  const handToggle = () => {
    setToggle((pre) => !pre);
  };

  const ToggleSides = toggle
    ? dispatch({
        type: "OPEN",
        payload: true,
      })
    : dispatch({
        type: "CLOSE",
        payload: false,
      });

// ================== read All Noti ==================
      const All_id = Notification?.map((n)=>n._id)
      const readAll = ()=>{
        console.log(All_id)
        ReadedNoti(users.token, { notiID: All_id }).then((res) => {
          if (res) {
            CallNotification();
          }
          });
        setOpenNoti(false);
      }

  return (
    <div>
      <div className="top">
        <div className="nav-left">
          <div className="nav-icons-toggle" onClick={handToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="sidebar-toggle"
              width="35"
              height="29"
              viewBox="0 0 35 29"
              fill="none"
            >
              <path
                d="M32.4317 26.6499L2.56833 26.6499C2.2542 26.6499 2 26.3963 2 26.0836C2 25.7709 2.2542 25.5176 2.56833 25.5176L32.4317 25.5176C32.7458 25.5176 33 25.7706 33 26.0836C33 26.3966 32.7458 26.6499 32.4317 26.6499ZM24.6817 18.9274L2.56834 18.9274C2.2542 18.9274 2 18.6738 2 18.3611C2 18.0485 2.2542 17.7952 2.56834 17.7952L24.6817 17.7952C24.9958 17.7952 25.25 18.0485 25.25 18.3611C25.25 18.6738 24.9958 18.9274 24.6817 18.9274ZM2.56834 11.205L32.4317 11.205C32.7458 11.205 33 10.9517 33 10.6387C33 10.326 32.7458 10.0724 32.4317 10.0724L2.56834 10.0724C2.2542 10.0724 2 10.326 2 10.6387C2 10.9517 2.2542 11.205 2.56834 11.205ZM24.6817 3.48287L2.56834 3.48287C2.2542 3.48287 2 3.22958 2 2.91656C2 2.60354 2.2542 2.3499 2.56834 2.3499L24.6817 2.3499C24.9958 2.3499 25.25 2.60354 25.25 2.91656C25.25 3.22958 24.9958 3.48287 24.6817 3.48287Z"
                fill="#1F263E"
              />
              <path
                d="M2.56833 26.6499L2.56833 25.1499L2.56833 26.6499ZM32.4317 26.6499L32.4317 28.1499L32.4317 26.6499ZM2.56833 25.5176L2.56833 24.0176L2.56833 25.5176ZM32.4317 25.5176L32.4317 27.0176L32.4317 25.5176ZM2.56833 28.1499L32.4317 28.1499L32.4317 25.1499L2.56833 25.1499L2.56833 28.1499ZM0.5 26.0836C0.5 27.2291 1.43023 28.1499 2.56833 28.1499L2.56833 25.1499C3.07818 25.1499 3.5 25.5634 3.5 26.0836L0.5 26.0836ZM2.56833 24.0176C1.43141 24.0176 0.5 24.9369 0.5 26.0836L3.5 26.0836C3.5 26.605 3.07699 27.0176 2.56833 27.0176L2.56833 24.0176ZM32.4317 24.0176L2.56833 24.0176L2.56833 27.0176L32.4317 27.0176L32.4317 24.0176ZM34.5 26.0836C34.5 24.9359 33.568 24.0176 32.4317 24.0176L32.4317 27.0176C31.9236 27.0176 31.5 26.6052 31.5 26.0836L34.5 26.0836ZM32.4317 28.1499C33.5692 28.1499 34.5 27.2301 34.5 26.0836L31.5 26.0836C31.5 25.5631 31.9224 25.1499 32.4317 25.1499L32.4317 28.1499ZM2.56834 20.4274L24.6817 20.4274L24.6817 17.4274L2.56834 17.4274L2.56834 20.4274ZM0.500001 18.3611C0.500001 19.5067 1.43022 20.4274 2.56834 20.4274L2.56834 17.4274C3.07818 17.4274 3.5 17.8409 3.5 18.3611L0.500001 18.3611ZM2.56834 16.2952C1.43141 16.2952 0.500001 17.2144 0.500001 18.3611L3.5 18.3611C3.5 18.8825 3.07699 19.2952 2.56834 19.2952L2.56834 16.2952ZM24.6817 16.2952L2.56834 16.2952L2.56834 19.2952L24.6817 19.2952L24.6817 16.2952ZM26.75 18.3611C26.75 17.2144 25.8186 16.2952 24.6817 16.2952L24.6817 19.2952C24.173 19.2952 23.75 18.8825 23.75 18.3611L26.75 18.3611ZM24.6817 20.4274C25.8198 20.4274 26.75 19.5067 26.75 18.3611L23.75 18.3611C23.75 17.8409 24.1718 17.4274 24.6817 17.4274L24.6817 20.4274ZM32.4317 9.70499L2.56834 9.70499L2.56834 12.705L32.4317 12.705L32.4317 9.70499ZM31.5 10.6387C31.5 10.1182 31.9224 9.70499 32.4317 9.70499L32.4317 12.705C33.5692 12.705 34.5 11.7851 34.5 10.6387L31.5 10.6387ZM32.4317 11.5724C31.9218 11.5724 31.5 11.1589 31.5 10.6387L34.5 10.6387C34.5 9.49314 33.5698 8.57236 32.4317 8.57236L32.4317 11.5724ZM2.56834 11.5724L32.4317 11.5724L32.4317 8.57236L2.56834 8.57236L2.56834 11.5724ZM3.5 10.6387C3.5 11.1589 3.07818 11.5724 2.56834 11.5724L2.56834 8.57236C1.43023 8.57236 0.500001 9.49313 0.500001 10.6387L3.5 10.6387ZM2.56834 9.70499C3.07758 9.70499 3.5 10.1182 3.5 10.6387L0.500001 10.6387C0.500001 11.7852 1.43082 12.705 2.56834 12.705L2.56834 9.70499ZM2.56834 4.98287L24.6817 4.98287L24.6817 1.98287L2.56834 1.98287L2.56834 4.98287ZM0.500002 2.91656C0.500002 4.06303 1.43081 4.98287 2.56834 4.98287L2.56834 1.98287C3.07759 1.98287 3.5 2.39612 3.5 2.91656L0.500002 2.91656ZM2.56834 0.8499C1.42963 0.8499 0.500002 1.77126 0.500002 2.91656L3.5 2.91656C3.5 3.43582 3.07877 3.8499 2.56834 3.8499L2.56834 0.8499ZM24.6817 0.849902L2.56834 0.8499L2.56834 3.8499L24.6817 3.8499L24.6817 0.849902ZM26.75 2.91656C26.75 1.77126 25.8204 0.849902 24.6817 0.849902L24.6817 3.8499C24.1712 3.8499 23.75 3.43582 23.75 2.91656L26.75 2.91656ZM24.6817 4.98287C25.8192 4.98287 26.75 4.06304 26.75 2.91656L23.75 2.91656C23.75 2.39612 24.1724 1.98287 24.6817 1.98287L24.6817 4.98287Z"
                fill="#01A5E8"
              />
            </svg>
          </div>
          <div className="pagetitle">
            <Breadcrumbs />
          </div>
        </div>

        <div className="nav-right">
          {Notification?.length ? (
            <Badge count={Notification?.length} size="small" className="bages">
              <div
                className="bell-notification"
                // onClick={() => {
                //   openNotification("top")
                // }}
                onClick={ToggleNoti}
              >
                <i className="bx bxs-bell"></i>
              </div>
            </Badge>
          ) : (
            <Badge count={""} size="small" className="bages">
              <div className="bell-notification" onClick={ToggleNoti}>
                <i className="bx bxs-bell"></i>
              </div>
            </Badge>
          )}

          <div className="image-auth" onClick={openInforUser}>
            <img
              src={users && users.profile ? users.profile : UserImage}
              alt={`image`}
            />
          </div>
          <div className="name-auth">
            <h5>{users && users.username}</h5>
          </div>
          <Tooltip
            placement="bottomRight"
            color={"#2db7f5"}
            title="ກົດເພື່ອອອກຈາກລະບົບ"
          >
            <div className="icon-logout" onClick={logout}>
              <i className="bx bx-log-in"></i>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* ================================ Modal ============================= */}
      <div className={`modal-notification ${Toggles}`}>
        <div className="modal-notification-card genealogy-scroll">
          <div className="card-header-noti">
            <div className="close-button" onClick={() => setOpenNoti(false)}>
              <CloseOutlined />
            </div>
            <div className="images-noti">
              <img src={imageWarning} alt="" className="img-noti" />
            </div>
            <div className="text-noti">
              <h3 className="text">ການແຈ້ງເຕືອນ</h3>
            </div>
          </div>
          <div className="card-body-noti">
            {Notification?.length ? (
              Notification &&
              Notification.map((noti, i) => (
                <div className="body-noti" key={i}>
                  <div
                    className="name-noti"
                    onClick={() => DirectionPages(noti.type, noti._id)}
                  >
                    {noti.type === "newUserSub" && (
                      <span className="user-new-noti">
                        <UserOutlined />
                      </span>
                    )}
                    {noti.type === "newOrder" && (
                      <span className="order-new-noti">
                        <ProfileOutlined />
                      </span>
                    )}
                    {noti.type === "paidBonus" && (
                      <span className="paidBonus-new-noti">
                        <DollarOutlined />
                      </span>
                    )}
                    {noti.type === "newUserSub" && (
                      <span className="user-new-noti">{noti.type}</span>
                    )}
                    {noti.type === "paidBonus" && (
                      <span className="paidBonus-new-noti">{noti.type}</span>
                    )}
                    {noti.type === "newOrder" && (
                      <span className="order-new-noti">{noti.type}</span>
                    )}
                  </div>
                  <div
                    className="link-noti"
                    // onClick={() => DirectionPages(noti.type)}
                    onClick={() => showDrawer(noti._id)}
                  >
                    ເບິ່ງລາຍລະອຽດ
                  </div>
                </div>
              ))
              ) : (
                <div className="no-noti">
                <EmptyContent Messages={"ບໍ່ມີລາຍການແຈ້ງເຕືອນ"} />
              </div>
            )}
          </div>
          {Notification?.length >= 2 && <Button type="primary" onClick={readAll} style={{marginLeft:200, marginBottom:20}}>ອ່ານທັງໝົດ</Button>}
        </div>
      </div>

      {/* ================================ Drawer ========================== */}
      <Drawer title="ລາຍລະອຽດ" onClose={onClose} open={open}>
        <div className="card-detail-noti">
          <div className="detail-noti-title">
            <h3></h3>
          </div>
          <div className="detail-noti-content">
            <div>ຈາກ : {dataNotiOne.to ? dataNotiOne.to : "ບໍ່ມີ"}</div>
            <div>ປະເພດ : {dataNotiOne.type ? dataNotiOne.type : "ບໍ່ມີ"}</div>
            <div>
              ວັນທີສ້າງ :{" "}
              {dataNotiOne.createdAt
                ? moment(dataNotiOne.createdAt).format("DD-MM-YYYY")
                : "ບໍ່ມີ"}
            </div>
          </div>
          <div className="detail-noti-title">
            <h3>ຂໍ້ມູນຜູ້ໃຊ້</h3>
          </div>
          <div className="detail-noti-content">
            <div>
              ຮູບພາບ :{" "}
              {dataNotiOne.user_id?.profile ? (
                <img
                  src={dataNotiOne.user_id?.profile}
                  className="images-detail-noti"
                />
              ) : (
                "ບໍ່ມີ"
              )}
            </div>
            <div>
              ຊື່ ແລະ ນາມສະກຸນ :{" "}
              {`${
                dataNotiOne.user_id?.firstName
                  ? dataNotiOne.user_id?.firstName
                  : "ບໍ່ມີ"
              } ${
                dataNotiOne.user_id?.lastName
                  ? dataNotiOne.user_id?.lastName
                  : "ບໍ່ມີ"
              }`}
            </div>
            <div>
              ລະຫັດຜູ້ໃຊ້ :{" "}
              {dataNotiOne.user_id?.userCode
                ? dataNotiOne.user_id?.userCode
                : "ບໍ່ມີ"}
            </div>
          </div>
          <div className="detail-noti-title">
            <h3>ຂໍ້ມູນທົ່ວໄປ</h3>
          </div>
          {/* ======================== users ====================== */}
          {dataNotiOne.type === "newUserSub" && (
            <div className="detail-noti-content">
              <div>
                ຊື່ :{" "}
                {dataNotiOne.content?.name
                  ? dataNotiOne.content?.name
                  : "ບໍ່ມີ"}
              </div>
              <div>
                ເບີໂທ :{" "}
                {`${
                  dataNotiOne.content?.phone
                    ? dataNotiOne.content?.phone
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ປະເພດ :{" "}
                {dataNotiOne.content?.type
                  ? dataNotiOne.content?.type
                  : "ບໍ່ມີ"}
              </div>
            </div>
          )}
          {/* ======================== users ====================== */}
          {dataNotiOne.type === "paidBonus" && (
            <div className="detail-noti-content">
              <div>
                ຊື່ :{" "}
                {dataNotiOne.content?.name
                  ? dataNotiOne.content?.name
                  : "ບໍ່ມີ"}
              </div>
              <div>
                ເບີໂທ :{" "}
                {`${
                  dataNotiOne.content?.phone
                    ? dataNotiOne.content?.phone
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ປະເພດ :{" "}
                {dataNotiOne.content?.type
                  ? dataNotiOne.content?.type
                  : "ບໍ່ມີ"}
              </div>
            </div>
          )}
          {/* ========================== orders ===================== */}
          {dataNotiOne.type === "newOrder" && (
            <div className="detail-noti-content">
              <div>
                ລະຫັດອໍເດີ້ :{" "}
                {dataNotiOne.content?.orderCode
                  ? dataNotiOne.content?.orderCode
                  : "ບໍ່ມີ"}
              </div>
              <div>
                ປະເພດການຊຳລະ :{" "}
                {`${
                  dataNotiOne.content?.paymentType
                    ? dataNotiOne.content?.paymentType
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ສະຖານະ :{" "}
                {dataNotiOne.content?.status
                  ? dataNotiOne.content?.status
                  : "ບໍ່ມີ"}
              </div>
              <div>
                ຈຳນວນ :{" "}
                {`${
                  dataNotiOne.content?.totalQty
                    ? dataNotiOne.content?.totalQty
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ລວມຄະແນນ :{" "}
                {dataNotiOne.content?.totalPoint
                  ? dataNotiOne.content?.totalPoint
                  : "ບໍ່ມີ"}
              </div>
              <div>
                ລວມຄະລາຄາ :{" "}
                {dataNotiOne.content?.totalPrice
                  ? formatPrice(dataNotiOne.content?.totalPrice)
                  : "ບໍ່ມີ"}
              </div>
              <div>
                ໄດ້ຮັບເງິນຄືນ :{" "}
                {`${
                  dataNotiOne.content?.totalCashback
                    ? formatPrice(dataNotiOne.content?.totalCashback)
                    : "ບໍ່ມີ"
                }`}
              </div>

              {/* ================ delivery =================== */}
              <div>
                ທີ່ຢູ່ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.address
                    ? dataNotiOne.content?.delivery?.address
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ບ້ານ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.village
                    ? dataNotiOne.content?.delivery?.village
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ເມືອງ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.district
                    ? dataNotiOne.content?.delivery?.district
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ແຂວງ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.province
                    ? dataNotiOne.content?.delivery?.province
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ເບີໂທ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.phoneNumber
                    ? dataNotiOne.content?.delivery?.phoneNumber
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ບໍລິສັດຂົນສົ່ງ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.express
                    ? dataNotiOne.content?.delivery?.express
                    : "ບໍ່ມີ"
                }`}
              </div>
              <div>
                ປະເພດຮັບເຄື່ອງ :{" "}
                {`${
                  dataNotiOne.content?.delivery?.type
                    ? dataNotiOne.content?.delivery?.type
                    : "ບໍ່ມີ"
                }`}
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Headers;

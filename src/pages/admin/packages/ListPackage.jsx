import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
// function
import {
  GetAllPackage,
  CreatePackage,
  DeletePackage,
  GetOnePackage,
  UpdatePackage,
} from "../../../functions/Packages";
// components
import LoadingCard from "../../../components/LoadingCard";
import BtnAddPkg from "../../../assets/image/btn-add-package.png";
import Swal from "sweetalert2";
import FormUpdate from "./FormUpdate";
import FormCreate from "./FormCreate";
import { formatPrice } from "../../../functions/FormatPrices";
import EmptyContent from "../../../components/EmptyContent";
import ImageNull from "../../../assets/image/no-image.png"

const ListPackage = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [packageEdit, setPackageEdit] = useState([]);
  const [packageAdd, setPackageAdd] = useState([]);
  const [visible, setVisible] = useState(7);
  const [packageEmpty, setPackageEmpty] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    LoadAllPackage();
  }, []);

  // load all package
  const LoadAllPackage = () => {
    setLoading(true);
    GetAllPackage(users.token)
      .then((res) => {
        setLoading(false);
        setPackageList(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setPackageEmpty("ບໍ່ມີຂໍ້ມູນ");
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

  // open add modal package
  const handleModal = () => {
    setOpenModal(true);
    setLoadingSave(false);
    setPackageEdit([]);
  };

  // set edit value
  const handleChangeUpdate = (e) => {
    setPackageEdit({ ...packageEdit, [e.target.name]: e.target.value });
  };
  // set add value
  const handleChangeAdd = (e) => {
    setPackageAdd({ ...packageAdd, [e.target.name]: e.target.value });
  };

  // insert and update package
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingSave(true);

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
        icon: "warning",
        title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
      });
      // setOpenModal(false);
      setLoading(false);
      setLoadingSave(false)
      return;
    }
    const Data = Object.fromEntries(formData);
    // console.log("Data Modal Form Add", Data);

    // return

    // Check before Save and Update
    packageEdit._id
      ? // update package
        UpdatePackage(users.token, Data, packageEdit._id)
          .then((res) => {
            // console.log("Data Edit From Database", res.data);
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
                title: "ອັບເດດແພັກເກດສຳເລັດ",
              });
              setLoadingSave(false);
              LoadAllPackage();
              setOpenModal(false);
              setPackageEdit([]);
              // window.location.reload();
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
              title: "ບໍ່ສາມາດອັບເດດແພັກເກດໄດ້",
            });

            if (err.response.data.message === "unauthorized") {
              dispatch({
                type: "USER_LOGOUT",
                payload: null,
              });
              navigate("/");
            }
            setLoading(false);
          })
      : // crete package
        CreatePackage(users.token, Data)
          .then((res) => {
            try {
              if (res.status === 200) {
                setLoadingSave(false);

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
                  title: "ເພີ່ມແພັກເກດສຳເລັດ",
                });
                LoadAllPackage();
                setLoadingSave(false);
                setOpenModal(false);
                setPackageEdit([]);
              }
            } catch (err) {
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
                title: "ບໍ່ສາມາດເພີ່ມແພັກເກດໄດ້",
              });
              setOpenModal(false);
            }
          })
          .catch((err) => {
            setLoadingSave(false);
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
              title: "ບໍ່ສາມາດເພີ່ມແພັກເກດໄດ້",
            });

            if (err.response.data.message === "unauthorized") {
              dispatch({
                type: "USER_LOGOUT",
                payload: null,
              });
              navigate("/");
            }
          });
    setOpenModal(false);

    e.currentTarget.reset();
  };

  // open edit modal package
  const handleModalEdit = (id) => {
    setOpenModal(true);
    setLoadingSave(false);
    GetOnePackage(users.token, id)
      .then((res) => {
        console.log(res.data.data);
        setPackageEdit({ ...packageEdit, ...res.data.data });
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
  // cancel button
  const handleModalCancel = () => {
    setPackageEdit([]);
    setOpenModal(false);
    setLoading(false);
    setLoadingSave(false);
    // window.location.reload();
  };

  let openModals = openModal ? "open" : "";
  // delete package
  const handleDelete = (id) => {
    Swal.fire({
      title: "ຢືນຢັນການລົບ",
      text: "ທ່ານຕ້ອງການລົບແພັກເກດນີ້ແທ້ບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        DeletePackage(users.token, id)
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
              LoadAllPackage();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const style = {
    width: 300,
    height: 400,
    margin: 10,
  };
  const styles = {
    width: 250,
    height: 255,
    margin: 10,
  };
  const small = {
    width: 250,
    height: 255,
    margin: 10,
  };

  // show more package
  const handleShowMore = () => {
    setVisible((show) => show + 7);
  };

  return (
    <div className="card-main">
      <Spin spinning={loadingSave}>
        {packageEmpty ? (
          <EmptyContent Messages={packageEmpty} />
        ) : (
          <div className="package-container">
            {loading ? (
              <>
                <div className="PackageMinimum">
                  <LoadingCard count={6} styles={style} />
                </div>
                <div className="PackageMaximum">
                  <LoadingCard count={8} styles={styles} />
                </div>
                <div className="PackageSmall">
                  <LoadingCard count={3} styles={small} />
                </div>
              </>
            ) : (
              <>
                {/* Add Package card */}
                <div className="package-card" onClick={handleModal}>
                  <div className="package-add">
                    <div className="package-add-btn">
                      <div className="icon-btn-add">
                        <img
                          src={BtnAddPkg}
                          alt="images-package"
                          className="img-package-add"
                        />
                      </div>
                      <div className="text-btn-add">
                        <h3>ເພີ່ມແພັກເກດ</h3>
                      </div>
                    </div>
                    <div className="package-add-icon-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="50"
                        viewBox="0 0 42 50"
                        fill="none"
                      >
                        <path
                          d="M-9.42305 43.8294C-2.41527 48.9253 6.29916 50.9858 14.8032 49.5577C23.3072 48.1296 30.9042 43.3298 35.9229 36.2142C40.9416 29.0986 42.9709 20.2501 41.5644 11.6152C40.1579 2.9804 35.4308 -4.73346 28.4231 -9.82937L22.4975 -1.42807C27.3109 2.07212 30.5578 7.37047 31.5238 13.3014C32.4899 19.2324 31.096 25.3101 27.6489 30.1975C24.2017 35.0849 18.9836 38.3817 13.1425 39.3626C7.30147 40.3436 1.31585 38.9283 -3.49752 35.4281L-9.42305 43.8294Z"
                          fill="#D4FAFF"
                        />
                      </svg>
                    </div>
                    <div className="package-add-icon-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="90"
                        height="69"
                        viewBox="0 0 90 69"
                        fill="none"
                      >
                        <path
                          d="M108.384 12.8087C97.3693 4.92041 84.2628 0.47549 70.7219 0.0360441C57.181 -0.403402 43.8139 3.18236 32.3109 10.3399C20.8079 17.4974 11.6857 27.9052 6.09783 40.2472C0.509958 52.5892 -1.2926 66.311 0.918093 79.6775L22.0806 76.1774C20.5621 66.9965 21.8002 57.5715 25.6383 49.0942C29.4764 40.617 35.7421 33.4683 43.6431 28.552C51.544 23.6358 60.7254 21.1729 70.0261 21.4747C79.3268 21.7766 88.3292 24.8296 95.8948 30.2478L108.384 12.8087Z"
                          fill="#D4FAFF"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {packageList &&
                  packageList.slice(0, visible).map((item, idx) => (
                    <div className="package-card" key={idx}>
                      <div className="package-header">
                        <div className="package-header-icon-left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="37"
                            height="36"
                            viewBox="0 0 37 36"
                            fill="none"
                          >
                            <path
                              d="M-2.56078 35.2951C2.78242 36.3356 8.29968 36.0437 13.5032 34.445C18.7067 32.8464 23.4362 29.9903 27.2736 26.1293C31.1109 22.2682 33.9378 17.5212 35.5044 12.308C37.0709 7.09469 37.3289 1.57573 36.2555 -3.76095L26.0839 -1.71502C26.8212 1.95054 26.644 5.7413 25.568 9.32211C24.4919 12.9029 22.5502 16.1634 19.9145 18.8154C17.2788 21.4674 14.0303 23.4292 10.4562 24.5272C6.88211 25.6253 3.09251 25.8258 -0.577529 25.1111L-2.56078 35.2951Z"
                              fill="white"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </div>
                        <div className="package-header-content">
                          {/* <div className="package-headers-img">
                            { item?.image ?
                            <img src={item.image} alt={item.image} />
                            :
                             <img src={ImageNull} alt={ImageNull} />
                            }
                            
                          </div> */}
                          <div className="package-title">
                            <h3 >
                             {item.packageName.substring(0, 10)}
                            </h3>
                          </div>
                        </div>
                        <div className="package-header-icon-right">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="68"
                            height="51"
                            viewBox="0 0 68 51"
                            fill="none"
                          >
                            <path
                              d="M76.0508 4.70739C67.9524 1.08461 59.0862 -0.487061 50.2359 0.131347C41.3857 0.749754 32.8242 3.53919 25.3083 8.25302C17.7924 12.9669 11.5537 19.4599 7.14376 27.158C2.73382 34.8561 0.288501 43.5222 0.0240037 52.3901L16.9259 52.8942C17.1076 46.8032 18.7872 40.8508 21.8162 35.5633C24.8453 30.2757 29.1304 25.8159 34.2928 22.5781C39.4551 19.3404 45.3357 17.4244 51.4146 16.9997C57.4935 16.5749 63.5834 17.6544 69.1459 20.1428L76.0508 4.70739Z"
                              fill="white"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="package-content">
                        <div className="content-title-image">
                          <div className="content-title">
                            <div className="package-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="20"
                              viewBox="0 0 19 20"
                              fill="none"
                            >
                              <path
                                d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z"
                                fill="url(#paint0_linear_1548_3417)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1548_3417"
                                  x1="10.5134"
                                  y1="-2.9888"
                                  x2="9.5767"
                                  y2="19.8897"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#0DB3E7" />
                                  <stop offset="1" stopColor="#028FCE" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="package-text">
                            <h3>ເງື່ອນໄຂໃນການເລື່ອນຂັນ</h3>
                          </div>
                          </div>
                          
                          <div className="package-header-img">
                            { item?.image ?
                            <img src={item.image} alt={item.image} />
                            :
                             <img src={ImageNull} alt={ImageNull} />
                            }
                            
                          </div>
                   
                        </div>
                        <div className="text-sub">
                          <div className="text-sub-left">
                            <h3>ເງື່ອນໄຂຄະແນນ PV :</h3>
                          </div>
                          <div className="text-sub-right">
                            <h3>{item.PV}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="package-content">
                        {/* <div className="content-title">
                          <div className="package-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="20"
                              viewBox="0 0 19 20"
                              fill="none"
                            >
                              <path
                                d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z"
                                fill="url(#paint0_linear_1548_3417)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1548_3417"
                                  x1="10.5134"
                                  y1="-2.9888"
                                  x2="9.5767"
                                  y2="19.8897"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#0DB3E7" />
                                  <stop offset="1" stopColor="#028FCE" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="package-text">
                            <h3>ການຊື້ຕຳແໜ່ງ</h3>
                          </div>
                        </div> */}
                        <div className="text-sub">
                          {/* <div className="text-sub-left">
                            <h3>ລາຄາການຊື້ :</h3>
                          </div> 
                          <div className="text-sub-right">
                            <h3>{formatPrice(item.price)} ₭</h3>
                          </div>*/}
                        </div>
                        <div className="text-sub">
                          <div className="text-sub-left">
                            <h3>ຄ່າແນະນຳ :</h3>
                          </div>
                          <div className="text-sub-right">
                            <h3>{formatPrice(item.recommendedFee)} ₭</h3>
                          </div>
                        </div>
                      </div>
                      <div className="package-button">
                        <button
                          className="p-btn btn-delete"
                          onClick={() => handleDelete(item._id)}
                        >
                          ລົບ
                        </button>
                        <button
                          className="p-btn btn-edit"
                          onClick={() => handleModalEdit(item._id)}
                        >
                          ແກ້ໄຂ
                        </button>
                      </div>
                    </div>
                  ))}
                {visible >= packageList.length
                  ? ""
                  : packageList.length && (
                      <div className="load-more">
                        <button className="btn" onClick={handleShowMore}>
                          ສະແດງເພີ່ມເຕີມ
                        </button>
                      </div>
                    )}
              </>
            )}
          </div>
        )}
        {/* ================================Modal============================= */}
        <div className={`modal-midium ${openModals}`}>
          {packageEdit && packageEdit._id ? (
            <>
              <FormUpdate
                packageEdit={packageEdit}
                handleSubmit={handleSubmit}
                handleChangeUpdate={handleChangeUpdate}
                handleModalCancel={handleModalCancel}
                loadingSave={loadingSave}
                setFileName={setFileName}
                setImage={setImage}
                fileName={fileName}
                image={image}
              />
            </>
          ) : (
            <>
              <FormCreate
                handleSubmit={handleSubmit}
                handleChangeAdd={handleChangeAdd}
                handleModalCancel={handleModalCancel}
                setFileName={setFileName}
                setImage={setImage}
                loadingSave={loadingSave}
                fileName={fileName}
                image={image}
              />
            </>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default ListPackage;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import imagePreview from "../../assets/avatar/image-avatar.jpeg";
import { GetOneEmployee, GetRootLineWork } from "../../functions/Employee";
import {Spin} from "antd"
const DiagramEm = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [levelOne, setLavelOne] = useState([]);
  const [linework, setLinework] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false)
  const [position,setPosition] = useState([])

  console.log("position",position)
  

  useEffect(() => {
    loadingGetRoot();
  }, []);

  const loadingGetRoot = () => {
    setLoading(true)
    GetRootLineWork(users.token)
      .then((res) => {
        setLoading(false)
        setPosition(res.data.data.positionCount);
        setLinework(res.data.data.tree);
        setLavelOne(res.data.data.tree.children);
      })
      .catch((err) => {
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
      });
  };

  // console.log("LineWork", linework);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
    setLoading(true)
    GetOneEmployee(users.token, linework._id)
      .then((res) => {
        setLoading(false)
        setDetail(res.data.data);
      })
      .catch((err) => {
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
      });
  };

  console.log("Detail", detail);

  return (
    <div className="plan-card-emp genealogy-scroll">
      <Spin spinning={loading} style={{marginTop:200}}>
      {
        <div className="icons-show-hide">
          {show ? (
            <EyeOutlined className="btn-show" onClick={handleShow} />
          ) : (
            <EyeInvisibleOutlined className="btn-show" onClick={handleShow} />
          )}
        </div>
      }
    {loading ? "" :
      <div className="body genealogy-body genealogy-scroll">
        <TransformWrapper>
          <TransformComponent>
            <div className="genealogy-tree">
              <ul>
                <li>
                  <Link to={`/lineWork/Details/${linework._id}`}>
                    <div className="member-view-box">
                      <div className="member-image">
                        <img src={imagePreview} alt="Member" />
                        <div className="member-details">
                          <h3>{linework.user_id && linework.user_id.firstName }</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <ul className="active">
                    <li>
                      <ul>
                        {levelOne &&
                          levelOne.map((level_1, index) => (
                            <>
                              <li key={index}>
                                <Link
                                  to={`/lineWork/Details/${level_1._id}`}
                                >
                                  <div className="member-view-box">
                                    <div className="member-image">
                                      <img src={imagePreview} alt="Member" />
                                      <div className="member-details">
                                        <h3>{level_1.user_id && level_1.user_id.firstName}</h3>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <ul>
                                  {level_1 &&
                                    level_1.children.map((level_2, index) => (
                                      <>
                                        <li key={index}>
                                          <Link
                                            to={`/lineWork/Details/${level_2._id}`}
                                          >
                                            <div className="member-view-box">
                                              <div className="member-image">
                                                <img
                                                  src={imagePreview}
                                                  alt="Member"
                                                />
                                                <div className="member-details">
                                                  <h3>
                                                   {level_2.user_id && level_2.user_id.firstName}
                                                  </h3>
                                                </div>
                                              </div>
                                            </div>
                                          </Link>
                                          <ul>
                                            {level_2 &&
                                              level_2.children.map(
                                                (level_3, index) => (
                                                  <>
                                                    <li key={index}>
                                                      <Link
                                                        to={`/lineWork/Details/${level_3._id}`}
                                                      >
                                                        <div className="member-view-box">
                                                          <div className="member-image">
                                                            <img
                                                              src={imagePreview}
                                                              alt="Member"
                                                            />
                                                            <div className="member-details">
                                                              <h3>
                                                                {level_3.user_id && level_3.user_id.firstName}
                                                              </h3>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </Link>
                                                    </li>
                                                  </>
                                                )
                                              )}
                                          </ul>
                                        </li>
                                      </>
                                    ))}
                                </ul>
                              </li>
                            </>
                          ))}
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      }
      {
        loading ? "" :

      show && (
        <>
          <div className="plan-card-emp-sub-1">
            <h5>ລະຫັດສະມາຊິກ</h5>
            <div className="content-sub">
              <div className="sub-group">
                <span>ຊື່ທຸລະກິດ :</span>
                <span>HONGFAH COMPANY</span>
              </div>
              <div className="sub-group">
                <div>ຜູ້ອັບໄລ :</div>
                <div>
                  <p>{detail.user_id && detail.user_id.userCode}</p>
                  <p>
                    {detail.user_id &&
                      `${detail.user_id.firstName} ${detail.user_id.lastName}`}
                  </p>
                </div>
              </div>
              {detail.userLineUp && (
                <div className="sub-group">
                  <div>ຜູ້ແນະນຳ :</div>
                  <div>
                    <p>{detail.userLineUp && detail.userLineUp.userCode}</p>
                    <p>
                      {detail.userLineUp &&
                        `${detail.userLineUp.firstName} ${detail.userLineUp.lastName}`}
                    </p>
                  </div>
                </div>
              )}

              <div className="sub-group">
                <span>ຕຳແໜ່ງ :</span>
                <span>Business</span>
              </div>
              <div className="sub-group">
                <span>Point ສະສົມສ່ວນໂຕ :</span>
                <span>{detail.pvTotal}</span>
              </div>
              <div className="sub-group">
                <span>ຮັກສາຍອດເດຶອນປັດຈຸບັນ :</span>
                <span>{detail.thisMonth && detail.thisMonth.PV_Amount} PV</span>
              </div>
              <div className="sub-group">
                <span>ຮັກສາຍອດເດຶອນແລ້ວ :</span>
                <span>{detail.lastMonth && detail.lastMonth.PV_Amount} PV</span>
              </div>
            </div>
          </div>
        </>
      )
      }
      </Spin>
    </div>
  );
};

export default DiagramEm;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import imagePreview from "../../assets/avatar/image-avatar.jpeg";
import { GetOneEmployee, GetRootLineWork } from "../../functions/Employee";
const DiagramEm = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [levelOne, setLavelOne] = useState([]);
  const [linework, setLinework] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    loadingGetRoot();
  }, []);

  const loadingGetRoot = () => {
    GetRootLineWork(users.token)
      .then((res) => {
        setLinework(res.data.data);
        setLavelOne(res.data.data.children);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "unauthorized") {
          dispatch({
            type: "USER_LOGOUT",
            payload: null,
          });
          navigate("/");
        }
      });
  };

  console.log("LineWork", linework.children);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
    GetOneEmployee(users.token, linework._id)
      .then((res) => {
        setDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("Detail", detail);

  return (
    <div className="plan-card-emp genealogy-scroll">
      {
        <div className="icons-show-hide">
          {show ? (
            <EyeOutlined className="btn-show" onClick={handleShow} />
          ) : (
            <EyeInvisibleOutlined className="btn-show" onClick={handleShow} />
          )}
        </div>
      }

      <div className="body genealogy-body genealogy-scroll">
        <TransformWrapper>
          <TransformComponent>
            <div className="genealogy-tree">
              <ul>
                <li>
                  <Link to={`/listEmployee/DetailsEmp/${linework._id}`}>
                    <div className="member-view-box">
                      <div className="member-image">
                        <img src={imagePreview} alt="Member" />
                        <div className="member-details">
                          <h3>Level is {linework.level}</h3>
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
                                  to={`/listEmployee/DetailsEmp/${level_1._id}`}
                                >
                                  <div className="member-view-box">
                                    <div className="member-image">
                                      <img src={imagePreview} alt="Member" />
                                      <div className="member-details">
                                        <h3>Member {level_1.level}</h3>
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
                                            to={`/listEmployee/DetailsEmp/${level_2._id}`}
                                          >
                                            <div className="member-view-box">
                                              <div className="member-image">
                                                <img
                                                  src={imagePreview}
                                                  alt="Member"
                                                />
                                                <div className="member-details">
                                                  <h3>
                                                    Member {level_2.level}
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
                                                        to={`/listEmployee/DetailsEmp/${level_3._id}`}
                                                      >
                                                        <div className="member-view-box">
                                                          <div className="member-image">
                                                            <img
                                                              src={imagePreview}
                                                              alt="Member"
                                                            />
                                                            <div className="member-details">
                                                              <h3>
                                                                Member{" "}
                                                                {level_3.level}
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

      {show && (
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
      )}
    </div>
  );
};

export default DiagramEm;

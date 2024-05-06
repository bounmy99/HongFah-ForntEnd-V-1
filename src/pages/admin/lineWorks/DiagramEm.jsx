import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import imagePreview from "../../../assets/avatar/image-avatar.jpeg";
import { GetOneLineWork, GetRootLineWork } from "../../../functions/LineWork";
import Diagram from "../../../components/Diagram";
import { Spin } from "antd";
const DiagramEm = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [levelOne, setLavelOne] = useState([]);
  const [linework, setLinework] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadingGetRoot();
  }, []);
  // load all lineWork
  const loadingGetRoot = () => {
    setLoading(true);
    GetRootLineWork(users.token)
      .then((res) => {
        setLoading(false);
        setPosition(res.data.data.positionCount);
        setLinework(res.data.data.tree);
        setLavelOne(res.data.data.tree.children);
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
  // show detail right
  const handleShow = () => {
    setShow((show) => !show);
    setLoading(true);
    GetOneLineWork(users.token, linework._id)
      .then((res) => {
        setLoading(false);
        setDetail(res.data.data);
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

  return (
    <div className="plan-card-emp genealogy-scroll">
      <Spin spinning={loading} style={{ marginTop: 200 }}>
        {loading ? (
          ""
        ) : (
          <Diagram linework={linework} levelOne={levelOne} show={show} imagePreview={imagePreview} handleShow={handleShow} />
        )}
        {loading
          ? ""
          : show && (
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
                          <p>
                            {detail.userLineUp && detail.userLineUp.userCode}
                          </p>
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
                      <span>
                        {detail.thisMonth && detail.thisMonth.PV_Amount} PV
                      </span>
                    </div>
                    <div className="sub-group">
                      <span>ຮັກສາຍອດເດຶອນແລ້ວ :</span>
                      <span>
                        {detail.lastMonth && detail.lastMonth.PV_Amount} PV
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
      </Spin>
    </div>
  );
};

export default DiagramEm;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import imagePreview from "../../../assets/avatar/image-avatar.jpeg";
import { GetRootLineWork } from "../../../functions/LineWork";
import Diagram from "../../../components/Diagram";
import { Button, Spin } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const DiagramEm = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [levelOne, setLavelOne] = useState([]);
  const [linework, setLinework] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingGetRoot();
  }, []);
  // load all lineWork
  const loadingGetRoot = () => {
    setLoading(true);
    GetRootLineWork(users.token)
      .then((res) => {
        // console.log("Diagram",res.data)
        setLoading(false);
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


  return (
    <div className="plan-card-emp genealogy-scroll">
      <Spin spinning={loading} style={{ marginTop: 200 }}>
        {loading ? (
          ""
        ) : (
          <>
          <Diagram linework={linework} levelOne={levelOne}  imagePreview={imagePreview} />
          </>
        )}
      </Spin>
    </div>
  );
};

export default DiagramEm;

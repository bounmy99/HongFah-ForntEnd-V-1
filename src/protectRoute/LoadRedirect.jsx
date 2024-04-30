import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
function LoadRedirect() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/dashboard");

    return () => clearInterval(Interval);
  }, [count]);

  const alerts = () => {
    //  if(count === 0){
    // Swal.fire({
    //   position: "center",
    //   icon: "warning",
    //   title: `ທ່ານບໍ່ມີສິດເຂົ້າໜ້ານີ້ ກັບໄປໜ້າ dashboard ໃນ ${count}`,
    //   showCancelButton: false,
    //   showConfirmButton: false,
    //   timer: 3500,
    // });

    // }
  };
  return <div>{alerts()}</div>;
}

export default LoadRedirect;

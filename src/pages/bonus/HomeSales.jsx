import React, { useState, useEffect } from "react";
import ListTotalSales from "./ListTotalSales";
import {useLocation,useNavigate} from "react-router-dom"
const HomeSales = () => {
  const [chagePage, setChagePage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setChagePage(1);
  }, []);

// set value status click to show other pages
  const handleChangePage = (e) => {
    setChagePage(e);
  };

  return (
    <div className="card-main">
      <div class="orders-button">
        <>
          <button
            type="button"
            class={`btn-order  ${
              chagePage === 1 ? "btn-warning" : "btn-secondary"
            }`}
            onClick={() => handleChangePage(1)}
          >
            ລາຍຊື່ທີ່ໄດ້ຮັບໂບນັດ
          </button>

          <button
            type="button"
            class={`btn-order btn-secondary`}
            onClick={() => navigate("/Bonus/history")}
          >
            ປະຫວັດ
          </button>
        </>
      </div>

      {chagePage === 1 && <ListTotalSales />}
    </div>
  );
};

export default HomeSales;

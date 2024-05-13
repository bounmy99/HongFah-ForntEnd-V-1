import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Loadding from "./Loadding";
import DatePicker from "react-datepicker";
import { read, writeFileXLSX, utils } from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GetAllOrders } from "../functions/Orders";
import { OnKeyDown } from "../functions/OnkeyDown";
import ExportToExcelAdmin from "./ExportToExcelAdmin";
const TableOrderAdmin = ({
  Status,
  columns,
  customStyles,
  data,
  loading,
  setOrders,
  setEmptyOrder,
  setCancelOrder,
  setCancelOrderEmpty,
  setSuccessOrders,
  setSuccessOrdersEmpty,
  orderEmpty,
  successOrdersEmpty,
  cancelOrderEmpty,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndtDate] = useState();
  const [valueInput, setValueInput] = useState();
  const { users } = useSelector((state) => ({ ...state }));
  const [dataExport, setDataExport] = useState();
  const [toggleCleared, setToggleCleared] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValueInput(e.target.value);
  };

  const header = [
    "ລະຫັດໄອດີ",
    "ລະຫັດຜູ້ຂາຍ",
    "ຊື່ຜູ້ຂາຍ" ,
    "ລະຫັດລູກຄ້າ",
    "ຊື່ລູກຄ້າ",
    "ຊື່ສິນຄ້າ",
    "ລາຄາສິນຄ້າ" ,
    "ເງິນທີ່ໄດ້ຮັບ",
    "ຄະແນນສິນຄ້າ",
    "ຈຳນວນສິນຄ້າ",
    "ຈຳນວນລວມ",
    "ລາຄາລວມ",
    "ເງິນທີ່ໄດ້ຮັບທັງໝົດ",
    "ຄະແນນທັງໝົດ",
     "ປະເພດການຈ່າຍ",
    "ສະຖານະ",
    "ວັນທີສັ່ງ",
  ];

  const handleSearch = () => {
    (startDate || endDate || valueInput || Status
      ? GetAllOrders(users.token, startDate, endDate, valueInput, Status)
      : GetAllOrders(users.token, "true")
    )
      .then((res) => {
        if (setOrders) {
          setOrders(res.data.data);
        }
        if (setCancelOrder) {
          setCancelOrder(res.data.data);
        }
        if (setSuccessOrders) {
          setSuccessOrders(res.data.data);
        }
      })
      .catch((err) => {
        if (setEmptyOrder) {
          setEmptyOrder(err.response.data.message);
        }
        if (setCancelOrderEmpty) {
          setCancelOrderEmpty(err.response.data.message);
        }
        if (setSuccessOrdersEmpty) {
          setSuccessOrdersEmpty(err.response.data.message);
        }
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

  // const handleExport = () => {
  //   console.log("dataExport", dataExport);
  //   // return
  //   if (!dataExport) {
  //     const Toast = Swal.mixin({
  //       toast: true,
  //       position: "top-end",
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //       didOpen: (toast) => {
  //         toast.onmouseenter = Swal.stopTimer;
  //         toast.onmouseleave = Swal.resumeTimer;
  //       },
  //     });
  //     Toast.fire({
  //       icon: "warning",
  //       title: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ",
  //     });
  //     return;
  //   }
  //   setDataExport([]);
  //   const heading = [
  //     [
  //       "ລະຫັດໄອດີ",
  //       "ລະຫັດລູກຄ້າ",
  //       "ຊື່ຜູ້ຂາຍ",
  //       "ລະຫັດລູກຄ້າ",
  //       "ຊື່ລູກຄ້າ",
  //       "ຊື່ສິນຄ້າ",
  //       "ລາຄາສິນຄ້າ",
  //       "ເງິນທີ່ໄດ້ຮັບ",
  //       "ຄະແນນສິນຄ້າ",
  //       "ຈຳນວນສິນຄ້າ",
  //       "ຈຳນວນລວມ",
  //       "ລາຄາລວມ",
  //       "ເງິນທີ່ໄດ້ຮັບທັງໝົດ",
  //       "ຄະແນນທັງໝົດ",
  //       "ປະເພດການຈ່າຍ",
  //       "ສະຖານະ",
  //       "ວັນທີສັ່ງ",
  //     ],
  //   ];
  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //   utils.sheet_add_aoa(ws, heading);
  //   utils.sheet_add_json(ws, dataExport, { origin: "A4", skipHeader: true });
  //   utils.book_append_sheet(wb, ws, "ປະຫວັດການຂາຍ");
  //   writeFileXLSX(wb, "HistoryProducts.xlsx");
  //   setToggleCleared(true);
  // };

  // ================= Function OnKeyKown ======================
  
  OnKeyDown(handleSearch, "Enter");

  return (
    <>
      <div className="order-list-table">
        <div className="list-order-filter">
          <div className="order-filter-date">
            <div className="date-order">
              <div className="datepicker-order">
                <i className="bx bx-calendar icons-left-order"></i>
                <span className="text-date-order">ວັນທີເລີ່ມ</span>
                <DatePicker
                  className="btn-datepicker-order"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                />
                <i className="bx bx-chevron-down icons-right-order"></i>
              </div>
            </div>
            <div className="date-order">
              <div className="datepicker-order">
                <i className="bx bx-calendar icons-left-order"></i>
                <span className="text-date-order">ວັນທີສິ້ນສຸດ</span>
                <DatePicker
                  className="btn-datepicker-order"
                  selected={endDate}
                  onChange={(date) => {
                    setEndtDate(date);
                  }}
                />
                <i className="bx bx-chevron-down icons-right-order"></i>
              </div>
            </div>
          </div>
          <div className="search">
            <div className="input-search">
              <input
                type="search"
                name="search"
                onChange={handleChange}
                placeholder="ຄົ້ນຫາລາຍການສິນຄ້າ"
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
                />
                <line
                  x1="14.5858"
                  y1="16"
                  x2="11.6364"
                  y2="13.0506"
                  stroke="#00A5E8"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="btn-search">
              <button
                type="button"
                className="btns-search"
                onClick={handleSearch}
              >
                ຄົ້ນຫາ
              </button>
              {/* <button
                type="button"
                className={`btns-export`}
                onClick={handleExport}
              >
                Export
              </button> */}
              <ExportToExcelAdmin
                data={dataExport}
                header={header}
                setDataExport={setDataExport}
                setToggleCleared={setToggleCleared}
              />
            </div>
          </div>
        </div>
        {orderEmpty || successOrdersEmpty || cancelOrderEmpty ? (
          <div className="empty-card">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  <a>{"ບໍ່ມີລາຍການທີ່ຄົ້ນຫາ"}</a>
                </span>
              }
            ></Empty>
          </div>
        ) : loading ? (
          <Loadding paragraph={10} />
        ) : (
          <div className="order-table">
            <DataTable
              columns={columns}
              data={data}
              pagination
              selectableRows
              onSelectedRowsChange={({ selectedRows }) => {
                setDataExport(selectedRows);
              }}
              clearSelectedRows={toggleCleared}
              customStyles={customStyles}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TableOrderAdmin;

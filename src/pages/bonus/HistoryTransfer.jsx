import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { read, writeFileXLSX, utils } from "xlsx";
import { GetAllSuccess } from "../../functions/Bonus";
import { useSelector } from "react-redux";
import { Empty, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import  Papa  from "papaparse";
import {formatPrice} from "../../functions/FormatPrices"

// customize style cell of table
const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "15px",
      justifyContent: "center",
      fontWeight: "bold",
      color: "#00A5E8",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      justifyContent: "center",
      fontSize: "15px",
      fontWeight: "bold",
    },
  },
};
// columns header of table
const columns = [
  {
    name: "ໂປຣຟາຍ",
    selector: (row) => row.profile,
    cell: (row) => (
      <div className="user-image">
        <div className="image">
          <img src={row.profile} alt={row.firstName} width={50} height={50} />
        </div>
      </div>
    ),
    sortable: true,
    width: "150px",
  },
  {
    name: "ຊື່ຜູ້ໃຊ້",
    selector: (row) => row.firstName,
    cell: (row) => (
      <div className="name-product">
        <div className="user">
          <h5>{`${row.firstName} ${row.lastName}`}</h5>
          <p>{row.userCode}</p>
        </div>
      </div>
    ),
    sortable: true,
    width: "150px",
  },
  {
    name: "ຕຳແໜ່ງ",
    selector: (row) => row.positionName,
    cell: (row) => (
      <div className="position">
        <p className="name-posit">{row.positionName}</p>
      </div>
    ),
    sortable: true,
    width: "80px",
  },
  {
    name: "ສະມາຊິກທິມ",
    selector: (row) => row.children_count,
    sortable: true,
    width: "110px",
  },
  {
    name: "ສະຖານະ",
    sortable: true,
    selector: (row) => row.isMaintainSales,
    cell: (row) => (
      <div className="score">
        {row.isMaintainSales === true ? <p>ຮັກສາຍອດ</p> : <p>ບໍ່ຮັກສາຍອດ</p>}
      </div>
    ),
    width: "118px",
  },
  {
    name: "ຄະແນນ",
    sortable: true,
    selector: (row) => row.PV,
    cell: (row) => <p>{row.PV} point</p>,
    width: "180px",
  },
  {
    name: "Cashback",
    sortable: true,
    selector: (row) => row.cashback,
    cell: (row) => <p>{formatPrice(row.cashback)} ₭</p>,
    width: "180px",
  },
];
const HistoryTransfer = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const [selectRows, setSelectRows] = useState([]);
  const [maintain, setMainTain] = useState([]);
  const [emptyData, setEmptyData] = useState("");
  const [dataImport, setDataImport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueInput,setValueInput] = useState("")
  const navigate = useNavigate();


  // load all success transfer
  useEffect(() => {
    setLoading(true);
    GetAllSuccess(users.token,"true","").then((res) => {
        setLoading(false);
        setMainTain(res.data.data);
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
        setEmptyData(err.response.data.message);
      });
  }, []);

  // set value input
  const handleChange = (e)=>{
    setValueInput(e.target.value)
  }

  console.log(valueInput)

  // search
  useEffect(()=>{
    setLoading(true);
    GetAllSuccess(users.token,"true",valueInput).then((res) => {
        setLoading(false);
        setMainTain(res.data.data);
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
        setEmptyData(err.response.data.message);
      });
  },[valueInput])

  // import file csv or excel
  const handleImport = (e) => {

    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = read(e.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setDataImport(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
    setSelectRows("");
  };

  // export file csv or excel
  const handleExport = () => {
    setSelectRows("");
    const heading = [
      [
        "ລະຫັດຜູ້ໃຊ້",
        "ຊື່ທະນາຄານ",
        "ຊື່ບັນຊີ",
        "ເລກບັນຊີ",
        "ຮູບພາບ",
        "ຊື່",
        "ນາມສະກຸນ",
        "ຕຳແໜ່ງ",
        "ລະຫັດ ID",
        "ລູກທີມ",
        "ຮັກສາຍອດ",
        "ຄະແນນ",
        "ຄະແນນທີມ",
        "ເງິນທອນ",
      ],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, heading);
    utils.sheet_add_json(ws, selectRows, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "ການເຄື່ອນໄຫວ");
    writeFileXLSX(wb, "History.xlsx");
    window.location.reload();
  };

  return (
    <div className="card-main">
      <Spin spinning={loading} style={{marginTop: 80}}>
        <div class="orders-button">
          <>
            <button
              type="button"
              class={`btn-order  btn-secondary`}
              onClick={() => navigate("/Bonus")}
            >
              ລາຍຊື່ທີ່ໄດ້ຮັບໂບນັດ
            </button>

            <button
              type="button"
              class={`btn-order btn-info`}
              onClick={() => navigate("/Bonus/history")}
            >
              ປະຫວັດ
            </button>
          </>
        </div>
        <div className="employee-table">
          <div class="employee-card-header">
            <div class="search">
              <div class="icon-filter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <g clip-path="url(#clip0_731_6498)">
                    <path
                      d="M1.25 5.9377H4.67C4.9383 6.92487 5.52397 7.79632 6.33666 8.41762C7.14935 9.03891 8.1439 9.37553 9.16687 9.37553C10.1898 9.37553 11.1844 9.03891 11.9971 8.41762C12.8098 7.79632 13.3955 6.92487 13.6637 5.9377H28.75C29.0815 5.9377 29.3995 5.80601 29.6339 5.57158C29.8683 5.33716 30 5.01922 30 4.6877C30 4.35618 29.8683 4.03824 29.6339 3.80382C29.3995 3.5694 29.0815 3.4377 28.75 3.4377H13.6637C13.3955 2.45054 12.8098 1.57908 11.9971 0.957788C11.1844 0.336492 10.1898 -0.00012207 9.16687 -0.00012207C8.1439 -0.00012207 7.14935 0.336492 6.33666 0.957788C5.52397 1.57908 4.9383 2.45054 4.67 3.4377H1.25C0.918479 3.4377 0.600537 3.5694 0.366117 3.80382C0.131696 4.03824 0 4.35618 0 4.6877C0 5.01922 0.131696 5.33716 0.366117 5.57158C0.600537 5.80601 0.918479 5.9377 1.25 5.9377ZM9.16625 2.5002C9.5989 2.5002 10.0218 2.6285 10.3816 2.86886C10.7413 3.10923 11.0217 3.45087 11.1872 3.85058C11.3528 4.25029 11.3961 4.69013 11.3117 5.11446C11.2273 5.5388 11.019 5.92857 10.713 6.2345C10.4071 6.54042 10.0173 6.74876 9.59301 6.83317C9.16868 6.91757 8.72884 6.87426 8.32913 6.70869C7.92942 6.54312 7.58778 6.26274 7.34741 5.90301C7.10704 5.54328 6.97875 5.12035 6.97875 4.6877C6.97941 4.10774 7.21009 3.55173 7.62018 3.14164C8.03028 2.73154 8.58629 2.50086 9.16625 2.5002Z"
                      fill="white"
                    ></path>
                    <path
                      d="M28.75 13.75H25.33C25.0621 12.7626 24.4767 11.8908 23.6641 11.2692C22.8515 10.6477 21.8568 10.3109 20.8337 10.3109C19.8107 10.3109 18.816 10.6477 18.0034 11.2692C17.1908 11.8908 16.6054 12.7626 16.3375 13.75H1.25C0.918479 13.75 0.600537 13.8817 0.366117 14.1161C0.131696 14.3505 0 14.6684 0 15C0 15.3315 0.131696 15.6494 0.366117 15.8838C0.600537 16.1183 0.918479 16.25 1.25 16.25H16.3375C16.6054 17.2373 17.1908 18.1091 18.0034 18.7307C18.816 19.3522 19.8107 19.689 20.8337 19.689C21.8568 19.689 22.8515 19.3522 23.6641 18.7307C24.4767 18.1091 25.0621 17.2373 25.33 16.25H28.75C29.0815 16.25 29.3995 16.1183 29.6339 15.8838C29.8683 15.6494 30 15.3315 30 15C30 14.6684 29.8683 14.3505 29.6339 14.1161C29.3995 13.8817 29.0815 13.75 28.75 13.75ZM20.8337 17.1875C20.4011 17.1875 19.9782 17.0592 19.6184 16.8188C19.2587 16.5784 18.9783 16.2368 18.8128 15.8371C18.6472 15.4374 18.6039 14.9975 18.6883 14.5732C18.7727 14.1489 18.981 13.7591 19.287 13.4532C19.5929 13.1472 19.9827 12.9389 20.407 12.8545C20.8313 12.7701 21.2712 12.8134 21.6709 12.979C22.0706 13.1445 22.4122 13.4249 22.6526 13.7846C22.893 14.1444 23.0212 14.5673 23.0212 15C23.0206 15.5799 22.7899 16.1359 22.3798 16.546C21.9697 16.9561 21.4137 17.1868 20.8337 17.1875Z"
                      fill="white"
                    ></path>
                    <path
                      d="M28.75 24.0625H13.6637C13.3955 23.0753 12.8098 22.2038 11.9971 21.5825C11.1844 20.9612 10.1898 20.6246 9.16687 20.6246C8.1439 20.6246 7.14935 20.9612 6.33666 21.5825C5.52397 22.2038 4.9383 23.0753 4.67 24.0625H1.25C0.918479 24.0625 0.600537 24.1942 0.366117 24.4286C0.131696 24.663 0 24.9809 0 25.3125C0 25.644 0.131696 25.9619 0.366117 26.1963C0.600537 26.4308 0.918479 26.5625 1.25 26.5625H4.67C4.9383 27.5496 5.52397 28.4211 6.33666 29.0424C7.14935 29.6637 8.1439 30.0003 9.16687 30.0003C10.1898 30.0003 11.1844 29.6637 11.9971 29.0424C12.8098 28.4211 13.3955 27.5496 13.6637 26.5625H28.75C29.0815 26.5625 29.3995 26.4308 29.6339 26.1963C29.8683 25.9619 30 25.644 30 25.3125C30 24.9809 29.8683 24.663 29.6339 24.4286C29.3995 24.1942 29.0815 24.0625 28.75 24.0625ZM9.16625 27.5C8.7336 27.5 8.31067 27.3717 7.95094 27.1313C7.59121 26.8909 7.31083 26.5493 7.14526 26.1496C6.9797 25.7499 6.93638 25.31 7.02078 24.8857C7.10519 24.4614 7.31353 24.0716 7.61945 23.7657C7.92538 23.4597 8.31516 23.2514 8.73949 23.167C9.16382 23.0826 9.60366 23.1259 10.0034 23.2915C10.4031 23.457 10.7447 23.7374 10.9851 24.0971C11.2255 24.4569 11.3538 24.8798 11.3538 25.3125C11.3528 25.8923 11.122 26.4481 10.712 26.8582C10.3019 27.2682 9.74611 27.499 9.16625 27.5Z"
                      fill="white"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_731_6498">
                      <rect width="30" height="30" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="input-search">
                <input type="text" placeholder="ຄົ້າຫາ"  onChange={handleChange}/>
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
                  ></circle>
                  <line
                    x1="14.5858"
                    y1="16"
                    x2="11.6364"
                    y2="13.0506"
                    stroke="#00A5E8"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></line>
                </svg>
              </div>
              <div class="btn-search">
                <button type="button">ຄົ້ນຫາ</button>
              </div>
            </div>
            <div class="button">
              <div class="btn-show">
                <input
                  type="file"
                  hidden
                  className="input-field"
                  name="file"
                  onChange={handleImport}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <button
                  type="button"
                  style={{ marginRight: 5 }}
                  class="btn"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  Import ຂໍ້ມູນ
                </button>

                <button
                  type="button"
                  disabled={selectRows.length ? false : true}
                  onClick={handleExport}
                  class="btn"
                >
                  Export ທັງໝົດທີ່ເລຶອກ
                </button>
              </div>
            </div>
          </div>

          {emptyData ? (
            <div className="empty-card">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    <a>{emptyData}</a>
                  </span>
                }
              ></Empty>
            </div>
          ) : dataImport.length ? (
            
            <DataTable
              columns={columns}
              data={dataImport}
              pagination
              customStyles={customStyles}
              selectableRows
              onSelectedRowsChange={(row) => setSelectRows(row.selectedRows)}
            />

          ) : (
            <DataTable
              columns={columns}
              data={maintain}
              pagination
              customStyles={customStyles}
              selectableRows
              onSelectedRowsChange={(row) => setSelectRows(row.selectedRows)}
            />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default HistoryTransfer;

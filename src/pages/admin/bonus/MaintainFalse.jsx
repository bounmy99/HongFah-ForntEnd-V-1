import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Empty,Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllMaintain } from "../../../functions/Bonus";
import Swal from "sweetalert2"
// format price
import {formatPrice} from "../../../functions/FormatPrices"
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
        <p>ບໍ່ຮັກສາຍອດ</p>
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

const MaintainFalse = ({setSelectableRow,valueInput,toggleCleared }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const [maintain, setMainTain] = useState([]);
  const [emptyData, setEmptyData] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("toggleCleared",toggleCleared)

  useEffect(() => {
    loadData();
  }, []);
// load Maintain False
  const loadData = () => {
    setLoading(true);
    GetAllMaintain(users.token, "false", "")
      .then((res) => {
        setMainTain(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setEmptyData(err.response.data.message);
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

// search maintain false
  useEffect(()=>{
    setLoading(true);
    GetAllMaintain(users.token, "false", valueInput)
      .then((res) => {
        setMainTain(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setEmptyData(err.response.data.message);
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
  },[valueInput])

  return (
    <div className="maintain-table">
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
      ) : loading ? (
        <>
          <div className="empty-card">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  <a>loading.....</a> <Spin />
                </span>
              }
            ></Empty>
          </div>
        </>
      ) : (
        <DataTable
          columns={columns}
          data={maintain}
          pagination
          progressPending={loading}
          customStyles={customStyles}
          selectableRows
          onSelectedRowsChange={(row) => {
            setSelectableRow(row.selectedRows);
            
          }}
          clearSelectedRows={toggleCleared}
        />
      )}
    </div>
  );
};

export default MaintainFalse;

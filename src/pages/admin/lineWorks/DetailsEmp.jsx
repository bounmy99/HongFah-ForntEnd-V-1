import react, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetOneLineWork } from "../../../functions/LineWork";
import DataTables from '../../../components/DataTable';
const DetailsEmp = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => ({ ...state }));
  const [detail, setDetail] = useState([]);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
// customize style cell of table
  const customStyles = {
    rows: {
        style: {
            minHeight: '60px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize: "15px",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#00A5E8",
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
        },
    },
};
// columns header of table
const columns = [
    {
        name: "ລຳດັບ",
        selector: (row) => row._id,
        cell: row => (
            <p>{row._id}</p>
        ),
        sortable: true,
        width: '150px'
    },
    {
        name: "Level",
        selector: (row) => row.level,
        cell: row => (
            <div className="position">
                <p className="posit-gold">{row.level}</p>
            </div>
        ),
        sortable: true,
        width: '80px'
    },
    {
        name: "LineUp",
        selector: (row) => (row.lineUp),
        cell: row => (
            <p className="posit-text-acount-name">{row.lineUp}</p>
        ),
        sortable: true,
        width: '210px'
    },
    {
        name: "PriceTotal",
        sortable: true,
        selector: (row) => row.priceTotal,
        cell: row => (
            <p className="posit-text-acount-number">{row.priceTotal}</p>
        ),
        width: '180px'
    },
    {
        name: "PV Total",
        sortable: true,
        selector: (row) => row.pvTotal,
        cell: row => (
            <p className="posit-text-withdraw">{row.pvTotal}.00</p>
        ),
        width: '100px'
    }
];
// load detail
  useEffect(() => {
    setLoading(true)
    GetOneLineWork(users.token, id)
      .then((res) => {
        setDetail(res.data.data);
        setLoading(false)
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
        setLoading(false)
      });
  }, []);


  return (
    <div className="DetailLineWork">
      <div>
        <button
          className="btn"
          style={{ width: "100px" }}
          onClick={() => navigate("/lineWork", { state: { key: 2 } })}
        >
          ຍ້ອນກັບ
        </button>
      </div>
      <h1>Details Employees</h1>
      <p>Level : {detail.level}</p>
      <p>LineUp : {detail.lineUp}</p>
      <p>PriceTotal : {detail.priceTotal}</p>
       <p>PV Total : {detail.pvTotal}</p>
      <hr />
      <div>
        IMAGE : <img src={detail.user_id && detail.user_id.profile} style={{width:50,height:50}} alt="" />
      </div>
      <p>USER CODE : {detail.user_id && detail.user_id.userCode}</p>
      <p>PACKAGE ID : {detail.user_id && detail.user_id.package_id}</p>
      <p>POSITION ID : {detail.user_id && detail.user_id.position_id}</p>
      <p>
        FULL NAME :
        {detail.user_id &&
          `${detail.user_id.firstName}  ${detail.user_id.lastName}`}
      </p>
      <hr />
      <h3>ລູກທີມ</h3>
      <DataTables columns={columns} progressPending={loading} data={detail.children} customStyles={customStyles} />
    </div>
  );
};

export default DetailsEmp;

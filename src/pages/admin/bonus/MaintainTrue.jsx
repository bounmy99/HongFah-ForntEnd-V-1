import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Empty,Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { GetAllBonus } from "../../../functions/Bonus";
import Swal from "sweetalert2"
import EmptyContent from "../../../components/EmptyContent";
import Loading from "../../../components/Loadding"

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
    name: "ຊື່ຜູ້ໃຊ້",
    cell: (row) => (
      <div className="name-product">
        <div className="user">
          <h5>{`${row.firstName ? row.firstName  : "ບໍ່ມີ" } ${row.lastName ? row.lastName  : "ບໍ່ມີ" }`}</h5>
          <p>{row.userCode ? row.userCode  : "ບໍ່ມີ" }</p>
        </div>
      </div>
    ),
    sortable: true,
    width: "150px",
  },
  {
    name: "ຊື່ທະນາຄານ",
    cell: (row) => (
      <div className="name-product">
        <div className="user">
          <h5>{`${row.bankName ? row.bankName.substring(0,15)  : "ບໍ່ມີ" }`}</h5>
        </div>
      </div>
    ),
    sortable: true,
    width: "150px",
  },
  {
    name: "ຊື່ບັນຊີ",
    cell: (row) => (
      <div className="name-product">
        <div className="user">
          <h5>{`${row.accountName ? row.accountName.substring(0,15)  : "ບໍ່ມີ" }`}</h5>
        </div>
      </div>
    ),
    sortable: true,
    width: "150px",
  },
  {
    name: "ເລກບັນຊີ",
    cell: (row) => (
      <div className="name-product">
        <div className="user">
          <h5>{`${row?.accountNo ? row.accountNo.substring(0,15)  : "ບໍ່ມີ" }`}</h5>
        </div>
      </div>
    ),
    sortable: true,
    width: "150px",
  },
  {
    name: "ຕຳແໜ່ງ",
    cell: (row) => (
      <div className="position">
        <p className="name-posit">{row.positionName ? row.positionName : "ຍັງບໍ່ມີ" }</p>
      </div>
    ),
    sortable: true,
    width: "80px",
  },
  {
    name: "ເບີໂທ",
    cell: (row) => (
      row.phoneNumber ?
      <Tooltip title="ກົດໃສ່ເບີໂທເພື່ອໄປທີ່ Whatsapp" color="#00A5E8">
      <p className="posit-text-acount-name">
        <Link
          to={`https://wa.me/${row.phoneNumber}?text=ສົ່ງການແຈ້ງເຕືອນໃຫ້ກັບບຸກຄົນນີ້`}
          target="_blank"
        >
          {row.phoneNumber}
        </Link>
      </p>
    </Tooltip>
    : "ບໍ່ມີ"
    ),
    sortable: true,
    width: "100px",
  },
  {
    name: "ສະມາຊິກທິມ",
    selector: (row) => row.children_count ? row.children_count  : "ບໍ່ມີ" ,
    sortable: true,
    width: "110px",
  },
  {
    name: "ສະຖານະ",
    sortable: true,
    cell: (row) => (
      <div className="score">
         <p>ຮັກສາຍອດ</p>
      </div>
    ),
    width: "118px",
  },
  {
    name: "ຄະແນນ",
    sortable: true,
    cell: (row) => <p>{row.PV ? row.PV  : "0" } ຄະແນນ</p>,
    width: "180px",
  },
  {
    name: "ຄະແນນທີມ",
    sortable: true,
    cell: (row) => <p>{row.teamePV ? row.teamePV  : "0" } ຄະແນນ</p>,
    width: "180px",
  },
  {
    name: "ໂບນັດຄ່າແນະນຳ",
    sortable: true,
    cell: (row) => <p>{row.recommended ? row.recommended  : "0" } ₭</p>,
    width: "180px",
  },
  {
    name: "ໂບນັດບໍລິຫານທີມ",
    sortable: true,
    cell: (row) => <p>{row.bonusTeamePV ? row.bonusTeamePV  : "0"} ຄະແນນ</p>,
    width: "180px",
  },
  {
    name: "ໂບນັດຕຳແໜ່ງ",
    sortable: true,
    cell: (row) => <p>{row.bonus_position ? row.bonus_position  : "0"} ₭</p>,
    width: "180px",
  },
  {
    name: "ລວມໂບນັດ",
    sortable: true,
    cell: (row) => <p>{row.totalBonus ? row.totalBonus  : "ບໍ່ມີ" }</p>,
    width: "180px",
  },
];

const MaintainTrue = ({setSelectableRow,valueInput,toggleCleared }) => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maintain, setMainTain] = useState([]);
  const [emptyData, setEmptyData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // load Maintain True
  const loadData = () => {
    setLoading(true);
    GetAllBonus(users.token,"true","true","false","")
      .then((res) => {
        setMainTain(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setEmptyData("ບໍ່ມີຂໍ້ມູນ");
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

  // search 
  useEffect(()=>{
    setLoading(true);
    GetAllBonus(users.token,"true","true","false",valueInput)
      .then((res) => {
        setMainTain(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setEmptyData("ບໍ່ມີຂໍ້ມູນ");
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
  },[valueInput])

  return (
    <div className="maintain-table">
      {!maintain ? (
        <div className="empty-card">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <a>{emptyData ? emptyData : "ບໍ່ມີຂໍ້ມູນ" }</a>
              </span>
            }
          ></Empty>
        </div>
      ) : loading ? (
        <>
          {/* <EmptyContent Messages={"ກຳລັງໂຫຼດ....."} /> */}
          <Loading paragraph={10} />
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

export default MaintainTrue;

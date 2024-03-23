import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { Empty } from 'antd'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllMaintain, Paybonus } from '../../functions/Bonus';

const formatPrice = (value)=>{
    let val = (value / 1).toFixed(0).replace(",", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");      
   }

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
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
            fontSize: "15px",
            fontWeight: "bold",
        },
    },
};

const columns = [
    {
        name: "ໂປຣຟາຍ",
        selector: (row) => (row.profile),
        cell: row => (
            <div className="user-image">
                <div className="image">
                    <img src={row.profile} alt={row.firstName} width={50} height={50} />
                </div>
            </div>
        ),
        sortable: true,
        width: '150px'
    },
    {
        name: "ຊື່ຜູ້ໃຊ້",
        selector: (row) => row.firstName,
        cell: row => (
            <div className="name-product">
                <div className="user">
                    <h5>{`${row.firstName} ${row.lastName}`}</h5>
                    <p>{row.userCode}</p>
                </div>
            </div>
        ),
        sortable: true,
        width: '150px'
    },
    {
        name: "ຕຳແໜ່ງ",
        selector: (row) => row.positionName,
        cell: row => (
            <div className="position">
                <p className="name-posit">{row.positionName}</p>
            </div>
        ),
        sortable: true,
        width: '80px'
    },
    {
        name: "ສະມາຊິກທິມ",
        selector: (row) => (row.children_count),
        sortable: true,
        width: '110px'
    },
    {
        name: "ສະຖານະ",
        sortable: true,
        selector: (row) => row.isMaintainSales,
        cell: row => (
            <div className="score">
                <p>ຮັກສາຍອດ</p>
            </div>
        ),
        width: '118px'
    },
    {
        name: "ຄະແນນ",
        sortable: true,
        selector: (row) => row.PV,
        cell: row => (
            <p>{row.PV} point</p>
        ),
        width: '180px'
    },
    {
        name: "Cashback",
        sortable: true,
        selector: (row) => row.cashback,
        cell: row => (
            <p>{ formatPrice(row.cashback)} ₭</p>
        ),
        width: '180px'
    }
];

const MaintainTrue = ({setStatusClick,setSelectableRow}) => {

    const { users } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [maintain, setMainTain] = useState([]);
    const [emptyData, setEmptyData] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    

    const loadData = () => {
        GetAllMaintain(users.token, "true").then(res => {
            setMainTain(res.data.data)
        }).catch(err => {
            console.log(err)
            setEmptyData(err.response.data.message);
            if(err.response.data.message === 'unauthorized'){
                dispatch({
                  type: 'USER_LOGOUT',
                  payload: null
                })
                navigate('/')
              }
        })
    }

  

    return (
            <div className="maintain-table">
                {emptyData ?
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
                        >
                        </Empty>
                    </div>
                    :

                        <DataTable
                            columns={columns}
                            data={maintain}
                            pagination
                            customStyles={customStyles}
                            selectableRows
                            onSelectedRowsChange={(row) => {
                                setSelectableRow(row.selectedRows)
                                setStatusClick(statusClick => !statusClick)
                            }}
                        />
                    
                }
            </div>
    )
}

export default MaintainTrue

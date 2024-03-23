import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// functions
import { GetOneOrders } from '../../functions/Orders';
import { Link, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const InfoOrders = () => {
    const navigate = useNavigate();
    const { users } = useSelector((state) => ({ ...state }))
    const { id } = useParams();
    // console.log("Orders ID",id);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        GetOneOrders(users.token, id).then(res => {
            console.log(res.data.data)
            setOrder(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const customStyles = {
        rows: {
            style: {
                minHeight: '0px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '0px', // override the cell padding for head cells
                paddingRight: '0px',
                fontSize: "12px",
                justifyContent: "center",
                fontWeight: "bold",
                backgroundColor: "#00A5E8",
            },
        },
        cells: {
            style: {
                paddingLeft: '0px', // override the cell padding for data cells
                paddingRight: '0px',
                justifyContent: "center",
                fontSize: "12px",
                backgroundColor: "#ecf3f6",
            },
        },
    };
    const columns = [
        {
            name: "ລະຫັດສິນຄ້າ",
            selector: (row) => row.productCode,
            cell: row => (
                <p className="name-posit">{row.productCode}</p>
            ),
            sortable: true,
            width: '70px'
        },
        {
            name: "ຮູບສິນຄ້າ",
            selector: (row) => (row.image),
            cell: row => (
                <img src={row.image} alt={row.name} className="img-rounded" />
            ),
            sortable: true,
            width: '60px'
        },

        {
            name: "ຊື່ສິນຄ້າ",
            selector: (row) => (row.name),
            sortable: true,
            width: '232px'
        },
        {
            name: "ຈຳນວນ",
            selector: (row) => row.qty,
            cell: row => (
                <p>{row.qty}</p>
            ),
            sortable: true,
            width: '50px'
        },
        {
            name: "ລາຄາ",
            sortable: true,
            selector: (row) => row.price,
            cell: row => (

                <h4>{row.price}</h4>
            ),
            width: '162px'
        }
        // {
        //     name: "ສະຖານທີຈັດສົ່ງ",
        //     sortable: true,
        //     selector: (row) => row.address,
        //     cell: row => (
        //         <div className="name-product">
        //             <div className="location">
        //                 <h4>{row.location.company}</h4>
        //                 <p>{row.location.address}</p>
        //             </div>
        //         </div>
        //     ),
        //     width: '162px'
        // }
    ];

    return (
        <div className="card-main">
            <div className="Card">
                <div className="card-header">
                    <div className="text-tilte">
                        <button onClick={()=>{
                            navigate("/HomeOrders", { state: { key: 2 } });
                        }}  className="text-link">
                            <i className='bx bx-chevron-left'></i>
                            ກັບໄປໜ້າກ່ອນ
                        </button>
                    </div>
                    <div className="btn-del">
                        <button type="button" onClick={() => { alert("Delete ?") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clipPath="url(#clip0_1116_2180)">
                                    <path d="M18.656 0.930011L6.46402 13.122C5.99836 13.5852 5.6292 14.1361 5.3779 14.7429C5.1266 15.3496 4.99817 16.0002 5.00002 16.657V18C5.00002 18.2652 5.10538 18.5196 5.29291 18.7071C5.48045 18.8947 5.7348 19 6.00002 19H7.34302C7.99978 19.0019 8.65039 18.8734 9.25718 18.6221C9.86396 18.3708 10.4149 18.0017 10.878 17.536L23.07 5.34401C23.6544 4.75818 23.9826 3.96449 23.9826 3.13701C23.9826 2.30954 23.6544 1.51584 23.07 0.930011C22.4757 0.361905 21.6852 0.0448608 20.863 0.0448608C20.0408 0.0448608 19.2503 0.361905 18.656 0.930011ZM21.656 3.93001L9.46402 16.122C8.90015 16.6824 8.13803 16.9979 7.34302 17H7.00002V16.657C7.0021 15.862 7.31759 15.0999 7.87802 14.536L20.07 2.34401C20.2836 2.13997 20.5676 2.0261 20.863 2.0261C21.1584 2.0261 21.4424 2.13997 21.656 2.34401C21.866 2.55453 21.9839 2.8397 21.9839 3.13701C21.9839 3.43432 21.866 3.7195 21.656 3.93001Z" fill="black" />
                                    <path d="M23 8.979C22.7348 8.979 22.4804 9.08436 22.2929 9.27189C22.1054 9.45943 22 9.71379 22 9.979V15H18C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18V22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H14.042C14.3072 2 14.5616 1.89464 14.7491 1.70711C14.9366 1.51957 15.042 1.26522 15.042 1C15.042 0.734784 14.9366 0.48043 14.7491 0.292893C14.5616 0.105357 14.3072 0 14.042 0L5 0C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H16.343C16.9999 24.0019 17.6507 23.8735 18.2576 23.6222C18.8646 23.3709 19.4157 23.0017 19.879 22.536L22.535 19.878C23.0008 19.4149 23.37 18.864 23.6215 18.2572C23.873 17.6504 24.0016 16.9998 24 16.343V9.979C24 9.71379 23.8946 9.45943 23.7071 9.27189C23.5196 9.08436 23.2652 8.979 23 8.979ZM18.465 21.122C18.063 21.523 17.5547 21.8006 17 21.922V18C17 17.7348 17.1054 17.4804 17.2929 17.2929C17.4804 17.1054 17.7348 17 18 17H21.925C21.8013 17.5535 21.524 18.0609 21.125 18.464L18.465 21.122Z" fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1116_2180">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="card-info-content">
                    <div className="info-left">
                        <h3>ຊຳລະຜ່ານ BCEL ONE</h3>
                        <div className="image-transfer">
                            <img src={order.slip && order.slip[0]} alt="" />
                        </div>
                    </div>
                    <div className="info-right">
                        <h3>ລາຍລະອຽດຜູ້ຮັບ</h3>
                        <div className="infomation">
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="name">ຊື່ຜູ້ຮັບ:</label>
                                    <div className="flex">
                                        <i className='bx bx-user'></i>
                                        <label>{order.orderFor && `${order.orderFor.firstName} ${order.orderFor.lastName}`}</label>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="name">ລະຫັດສະມາຊິກຜູ້ຮັບ:</label>
                                    <div className="flex">
                                        <i className='bx bx-user'></i>
                                        <label>{order.orderFor && order.orderFor.userCode }</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="name">ເບີໂທຜູ້ຮັບ:</label>
                                    <div className="flex">
                                        <i className='bx bxs-phone'></i>
                                        <label>{order.orderFor && order.orderFor.phoneNumber}</label>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="name">ສະຖານທີຈັດສົ່ງ:</label>
                                    <div className="flex">
                                        <i className='bx bx-user'></i>
                                        <label>{order.delivery && `${order.delivery.address}, ${order.delivery.province}, ${order.delivery.district}, ${order.delivery.village}`}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-products">
                            <div className="text-title">
                                <h5>ລາຍລະອຽດສິນຄ້າ</h5>
                            </div>
                            <div className="content-detail Card">
                                {<DataTable
                                    columns={columns}
                                    data={order.products}
                                    fixedHeader
                                    customStyles={customStyles}
                                />}
                            </div>
                        </div>
                
                    </div>
                </div>
            </div>

        </div>

    )
}

export default InfoOrders
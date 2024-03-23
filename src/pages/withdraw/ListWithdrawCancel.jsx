import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { read, writeFileXLSX, utils } from "xlsx";
import { Empty } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import DataTables from '../../components/DataTable';
import previewIMG from "../../assets/image/upload.png";
import { GetWallet, GetOneWithDraw, ApprovedWithDraw, RejectWithDraw } from '../../functions/WithDraw';

const ListWithdrawCancel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => ({ ...state }))
    const [startDate, setStartDate] = useState(new Date());
    const [isActiveDropdownFilter, setIsActiveDropdownFilter] = useState(false);
    const [selected, setSelected] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [withDraw, setWithDraw] = useState([]);
    const [infoWithDraw, setinfoWithDraw] = useState([]);
    const [withdrawEmpty, setWithWrawEmpty] = useState("");



    const DataFilter = [15000, 30000, 50000, 100000];

    useEffect(() => {
        setLoading(true);
        loadData();
    }, []);

    const loadData = () => {
        GetWallet(users.token,"cancel").then(res => {
            setWithDraw(res.data.data)
            setLoading(false);
        }).catch(err => {
            console.log(err.response.data.message);
            setWithWrawEmpty(err.response.data.message);
            if(err.response.data.message === 'unauthorized'){
                dispatch({
                  type: 'USER_LOGOUT',
                  payload: null
                })
                navigate('/')
              }
            setLoading(false);
        })
    }

    

    const handleClickOpenDrop = () => {
        setIsActiveDropdownFilter(isActiveDropdownFilter => !isActiveDropdownFilter);
    }
    let openDrop = isActiveDropdownFilter ? 'active' : ''

    const handleClick = (e) => {
        setSelected(e.target.textContent);
        setIsActiveDropdownFilter(false);
    }

    const handleModal = (id) => {
        GetOneWithDraw(users.token, id).then(res => {
            setinfoWithDraw(res.data.data);
        }).catch(err => console.log(err))

        setOpenModal(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = [...formData.values()];
        const isEmpty = values.includes('');
        if (isEmpty) {
            setOpenModal(false);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
                showConfirmButton: false,
                timer: 3500
            });
            return;
        }
        const Data = Object.fromEntries(formData);
        e.currentTarget.reset();

        console.log("Data In form", Data)
        setOpenModal(false);
        ApprovedWithDraw(users.token, Data, infoWithDraw._id).then(res => {
            if (res.data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "ຢືນຢັນສຳເລັດ",
                    showConfirmButton: false,
                    timer: 2500
                });
                setImage("")
                loadData();
            }

        }).catch(err => {
            if (err) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: err.response.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                loadData();
            }
        })
    }

    const handleModalCancel = () => {
        setOpenModal(false);
        setFormType(true);
        setImage("")
        setinfoWithDraw([]);
    }

    let openModals = openModal ? 'open' : '';


    const formatPrice = (value)=>{
        let val = (value / 1).toFixed(0).replace(",", ".");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");      
       }
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

    const columns = [
        {
            name: "ລະຫັດສະມາຊິກ",
            selector: (row) => row.userCode,
            cell: row => (
                <p>{row.userCode}</p>
            ),
            sortable: true,
            width: '150px'
        },
        {
            name: "ຕຳແໜ່ງ",
            selector: (row) => row.userPosition,
            cell: row => (
                <div className="position">
                    {row.userPosition === "Gold" && <p className="posit-gold">{row.userPosition}</p>}
                    {row.userPosition === "Silver" && <p className="posit-silver">{row.userPosition}</p>}
                    {row.userPosition === "Bronze" && <p className="posit-bronze">{row.userPosition}</p>}
                </div>
            ),
            sortable: true,
            width: '80px'
        },
        {
            name: "ຊື່ບັນຊີ",
            selector: (row) => (row.accountName),
            cell: row => (
                <p className="posit-text-acount-name">{row.accountName}</p>
            ),
            sortable: true,
            width: '210px'
        },
        {
            name: "ເລກບັນຊີທະນາຄານ",
            sortable: true,
            selector: (row) => row.accountNo,
            cell: row => (
                <p className="posit-text-acount-number">{row.accountNo}</p>
            ),
            width: '180px'
        },
        {
            name: "ເງິນທີ່ຖອນ",
            sortable: true,
            selector: (row) => row.amount,
            cell: row => (
                <p className="posit-text-withdraw">{formatPrice(row.amount)}.00</p>
            ),
            width: '100px'
        },
        {
            name: "ປະເພດການຖອນ",
            sortable: true,
            selector: (row) => row.transactionType,
            cell: row => (
                <p className="posit-text-withdraw">{row.transactionType}</p>
            ),
            width: '100px'
        },
        {
            name: "ວັນທີຮ້ອງຂໍ",
            sortable: true,
            selector: (row) => row.createdAt,
            cell: row => (
                <p>{new Date(row.createdAt).toLocaleDateString()}</p>
            ),
            width: '180px'
        },
        {
            name: "ສະຖານະ",
            sortable: true,
            selector: (row) => row.status,
            cell: row => (

                <>
                    {<p style={{ color: 'red' }}>{row.status}</p>}
                </>

            ),
            width: '180px'
        }
    ];
    const handleExport = () => {
        const heading = [["ລະຫັດສະມາຊິກ", "ຕຳແໜ່ງ", "ບັນຊີ", "ຊື່ບັນຊີ", "ເລກບັນຊີທະນາຄານ", "ເງິນທີ່ຖອນ", "ວັນທີຮ້ອງຂໍ", "ສະຖານະ"]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, heading);
        utils.sheet_add_json(ws, withDraw, { origin: "A4", skipHeader: true })
        utils.book_append_sheet(wb, ws, "ການຖອນເງິນ");
        writeFileXLSX(wb, 'ການຖອນເງິນ.xlsx');
    }

    const handleChange = (e) => {
        setinfoWithDraw({ ...infoWithDraw, [e.target.name]: e.target.value });
    }

    return (
        <div className="card-main">
            {loading ? <h1>ກຳລັງໂຫຼດຂໍ້ມູນ........</h1> : <>

                <div className="withdraw-table">
                    <div className="withdraw-card-header">
                        <div className="search">
                            <div className="input-search">
                                <input type="text" placeholder="ຄົ້າຫາລູກຄ້າ ຕາມຊື່, ເບີໂທ ຫຼື ລະຫັດພະນັກງານ" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><circle cx="7.27273" cy="7.27273" r="6.27273" stroke="#00A5E8" stroke-width="2"></circle><line x1="14.5858" y1="16" x2="11.6364" y2="13.0506" stroke="#00A5E8" stroke-width="2" stroke-linecap="round"></line></svg>
                            </div>
                        </div>
                        <div class="button">
                            <div className="datepicker">
                                <i className='bx bx-calendar icons-left'></i>
                                <span className="text-date">ວັນທີ</span>
                                <DatePicker className="btn-datepicker" selected={startDate} onChange={(date) => {
                                    setStartDate(date)
                                    setIsActiveDropdownFilter(false);
                                }} />
                                <i className='bx bx-chevron-down icons-right'></i>
                            </div>
                            <div className="withdraw-filter">
                                <div className="withdraw-filter-menu">
                                    <div className={`withdraw-filter-btn ${openDrop}`} onClick={handleClickOpenDrop}>
                                        <i className='bx bx-filter'></i> {selected ? <span className="sBtn-text">{selected}</span> : <span className="sBtn-text">ຕົວກອງ</span>}
                                        <i className='bx bx-chevron-down'></i>
                                    </div>
                                    {isActiveDropdownFilter &&
                                        <ul className="options-withdraw-filter">
                                            {DataFilter.map((item, idx) => (
                                                <li className="option-withdraw-filter" key={idx} onClick={handleClick}>
                                                    <span className="option-withdraw-filter-text">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            </div>
                            <div>
                                <button className="btn-show" type="button" onClick={handleExport}><i class='bx bxs-file-export bx-rotate-90' ></i> ນຳອອກຂໍ້ມູນ</button>
                            </div>
                        </div>
                    </div>
                    {withdrawEmpty ?
                        <div className="empty-card">
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        <a>{withdrawEmpty}</a>
                                    </span>
                                }
                            >
                            </Empty>
                        </div>
                        :
                        <DataTables columns={columns} data={withDraw} customStyles={customStyles} />
                    }


                </div>
            </>}

            {/* ================================Modal============================= */}
            <div className={`modal-withdraw ${openModals}`}>
                <div className="modal-withdraw-card Card">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-withdraw-card-content">
                            <div className="modal-input-withdraw">
                                <div className="modal-withdraw-input">
                                    <div className="withdraw-title">
                                        <h3>ຂໍ້ມູນລູກຄ້າ</h3>
                                    </div>
                                    <div className="modal-withdraw-form-group">
                                        <div className="input-group-withdraw">
                                            <label htmlFor="">ລະຫັດສະມາຊິກ</label>
                                            <input type="text" name="userCode" value={infoWithDraw && infoWithDraw.userCode} className="form-modal-control-withdraw" onChange={handleChange} />
                                        </div>
                                        <div className="input-group-withdraw">
                                            <label htmlFor="">ເບີໂທລະສັບ</label>
                                            <input type="text" name="phoneNumber" value={infoWithDraw && infoWithDraw.phoneNumber} className="form-modal-control-withdraw" onChange={handleChange} />
                                        </div>
                                        <div className="input-group-withdraw">
                                            <label htmlFor="">ຊື່ບັນຊີ</label>
                                            <input type="text" name="accountName" value={infoWithDraw && infoWithDraw.accountName} className="form-modal-control-withdraw" onChange={handleChange} />
                                        </div>
                                        <div className="input-group-withdraw">
                                            <label htmlFor="">ເລກບັນຊີ</label>
                                            <input type="text" name="accountNo" value={infoWithDraw && infoWithDraw.accountNo} className="form-modal-control-withdraw" onChange={handleChange} />
                                        </div>
                                        <div className="input-group-withdraw">
                                            <label htmlFor="">ເງິນທີ່ຖອນ</label>
                                            <input type="text" name="amount" value={infoWithDraw && infoWithDraw.amount} className="form-modal-control-withdraw" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-withdraw-image">
                                    <div className="withdraw-title">
                                        <h3>ອັບໂຫຼດໃບບິນ</h3>
                                    </div>
                                    <div className="withdraw-image">
                                        {image ? <img src={image} alt={fileName} className="uploadImage-withdraw" /> : <img src={infoWithDraw.slip !== '' ? infoWithDraw.slip : previewIMG} className="uploadImage-withdraw-preview" />}
                                        <input type="file" name="slip" className="input-file" hidden
                                            onChange={({ target: { files } }) => {
                                                files[0] && setFileName(files[0].name)
                                                if (files) {
                                                    setImage(URL.createObjectURL(files[0]));
                                                }
                                            }}
                                        />
                                        <button type="button" onClick={() => document.querySelector(".input-file").click()} className="btn-withdraw-browse">Browse File</button>
                                    </div>
                                </div>
                            </div>
                            <div className="modals-withdraw-btn">
                                <button type="button" className="modal-withdraw-btn btn-secondary" onClick={handleModalCancel}>ຍົກເລີກ</button>
                                <button type="submit" className="modal-withdraw-btn btn-info">ຢືນຢັນ</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ListWithdrawCancel

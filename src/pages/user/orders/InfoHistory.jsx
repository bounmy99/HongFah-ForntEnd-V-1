import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// functions
import {Table} from 'antd'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {  useParams } from 'react-router-dom'
import { GetOneOrders } from '../../../functions/Orders';
import { formatPrice } from "../../../functions/FormatPrices"
import Loading from '../../../components/Loadding';

const InfoOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => ({ ...state }));
    let getData = JSON.parse(localStorage.getItem("data"));
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [pageSiize, setPageSiize] = useState(1);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false)
// load one success orders
    useEffect(() => {
        setLoading(true)
        GetOneOrders(getData.token, id).then(res => {
            setOrder(res.data.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
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
        })
    }, []);
// columns header of table
    const columns = [
        {
            title: "ລະຫັດສິນຄ້າ",
            dataIndex : "productCode",
            key : "productCode",
            width: '80px'
        },
        {
            title: "ຮູບສິນຄ້າ",
            dataIndex : "image",
            key : "image",
            render: row => (
                <img src={row} alt={row} className="img-rounded" />
            ),
            width: '60px'
        },

        {
            title: "ຊື່ສິນຄ້າ",
            dataIndex : "name",
            key : "name",
            width: '232px'
        },
        {
            title: "ຈຳນວນ",
            dataIndex : "qty",
            key : "qty",
            width: '50px'
        },
        {
            title: "ລາຄາ",
            dataIndex : "price",
            key : "price",
            render : (price)=>formatPrice(price),
            width: '162px'
        }
    ];

    return (
        <div className="card-main">
            <div className="Card">
                <div className="card-header">
                    <div className="text-tilte">
                        <button onClick={()=>{
                             navigate("/HomeOrders/users", { state: { key: 3 } })
                        }} className="text-link">
                            <i className='bx bx-chevron-left'></i>
                            ກັບໄປໜ້າກ່ອນ
                        </button>
                    </div>
                </div>

                <div className="card-info-content">
                    {loading ?
                        <Loading paragraph={13} />
                    : 
                    <>
                     <div className="info-left">
                        <h3>ຊຳລະຜ່ານ BCEL ONE</h3>
                        <div className="image-transfer">
                           {order?.slip && order?.slip[0] ? <img src={order?.slip && order?.slip[0]} alt="" /> : <div className="text-no-image"><h3>ບໍ່ມີຮູບພາບ</h3></div>} 
                        </div>
                    </div>
                    <div className="info-right">
                        <h3>ລາຍລະອຽດຜູ້ຮັບ</h3>
                        <div className="infomation">
                  <div className="form-group">
                    <div className="input-group">
                      <label htmlFor="name">ຊື່ຜູ້ຮັບ:</label>
                      <div className="flex">
                        <i className="bx bx-user"></i>
                        <label>
                          {order?.orderFor &&
                            `${
                              order?.orderFor?.firstName
                                ? order?.orderFor?.firstName
                                : "ບໍ່ມີ"
                            } ${
                              order?.orderFor?.lastName
                                ? order?.orderFor?.lastName
                                : "ບໍ່ມີ"
                            }`}
                        </label>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="name">ລະຫັດສະມາຊິກຜູ້ຮັບ:</label>
                      <div className="flex">
                        <i className="bx bx-user"></i>
                        <label>
                          {order?.orderFor && order?.orderFor?.userCode
                            ? order?.orderFor?.userCode
                            : "ບໍ່ມີ"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <label htmlFor="name">ເບີໂທຜູ້ຮັບ:</label>
                      <div className="flex">
                        <i className="bx bxs-phone"></i>
                        <label>
                          {order?.orderFor && order?.orderFor?.phoneNumber
                            ? order?.orderFor?.phoneNumber
                            : "ບໍ່ມີ"}
                        </label>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="name">ສະຖານທີຈັດສົ່ງ:</label>
                      <div className="flex">
                        <i className="bx bx-user"></i>
                        <label>
                          {order?.delivery &&
                            `${
                              order?.delivery?.address
                                ? order?.delivery?.address
                                : "ບໍ່ມີ"
                            }, ${
                              order?.delivery?.province
                                ? order?.delivery?.province
                                : "ບໍ່ມີ"
                            }, ${
                              order?.delivery?.district
                                ? order?.delivery?.district
                                : "ບໍ່ມີ"
                            }, ${
                              order?.delivery?.village
                                ? order?.delivery?.village
                                : "ບໍ່ມີ"
                            }`}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                        <div className="detail-products">
                            <div className="text-title">
                                <h5>ລາຍລະອຽດສິນຄ້າ</h5>
                            </div>
                            <div className="content-detail Card">
                            <Table
                                   dataSource={order?.products}
                                   columns={columns}
                                   pagination={{
                                    current: page,
                                    pageSize: pageSiize,
                                    onChange: (page, pageSiize) => {
                                      setPage(page);
                                      setPageSiize(pageSiize);
                                    },
                                  }}
                                />
                            </div>
                        </div>
                    </div>
                    </>
                    }
                   
                </div>
            </div>

        </div>

    )
}

export default InfoOrders
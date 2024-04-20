import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MoreOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  LineChartOutlined,
  UserAddOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  WalletOutlined,
  ApartmentOutlined,
  FileProtectOutlined,
  TransactionOutlined,
  SolutionOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatPrice } from "../functions/FormatPrices";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  ResponsiveContainer,
} from "recharts";
import DataTable from "react-data-table-component";
import { BestSeller } from "../functions/Products";
import { SalesPrices } from "../functions/Orders";
import { CountUsers } from "../functions/Authentication";
import TableAntd from "../components/TableAntd";
import { Image, Tooltip } from "antd";
import noImage from "../assets/image/no-image.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({ ...state }));
  const [salsePrices, setSalesPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counterUsers, setCounterUsers] = useState([]);
  const [bestSell, setBestSell] = useState([]);
  

  const data = [
    {
      name: "January",
      total: 4000,
    },
    {
      name: "February",
      total: 3000,
    },
    {
      name: "March",
      total: 2000,
    },
    {
      name: "April",
      total: 2780,
    },
    {
      name: "May",
      total: 1890,
    },
    {
      name: "June",
      total: 2390,
    },
    {
      name: "July",
      total: 3490,
    },
    {
      name: "August",
      total: 5490,
    },
    {
      name: "September",
      total: 3490,
    },
    {
      name: "October",
      total: 1490,
    },
    {
      name: "November",
      total: 2490,
    },
    {
      name: "December",
      total: 3090,
    },
  ];

  // colunms header table
  const columns = [
    {
      title: "ຮູບພາບ",
      dataIndex: "images",
      key: "images",
      width: "100px",
      render: (row) => (
        <div className="name-product">
          {row ? (
            <Image src={row[0]} width={40} height={40} />
          ) : (
            <Image src={noImage} width={40} height={40} />
          )}
        </div>
      ),
    },
    {
      title: "ສິນຄ້າ",
      dataIndex: "name",
      key: "name",
      width: "250px",
      render: (row) => (
        <div className="name-product">
          <div className="flex-name">
            <p>{row}</p>
            <span> ລະຫັດ : {row}</span>
          </div>
        </div>
      ),
    },
    {
      title: "ຈຳນວນ",
      dataIndex: "amount",
      key: "amount",
      width: "190px",
    },
    {
      title: "ລາຄາ",
      dataIndex: "price",
      key: "price",
      render: (row) => formatPrice(row),
      width: "190px",
    },
    {
      title: "ລາຄາຂາຍ",
      dataIndex: "salsePrice",
      key: "salsePrice",
      render: (row) => formatPrice(row),
      width: "190px",
    },
    {
      title: "ຂາຍໄດ້",
      dataIndex: "salseAmount",
      key: "salseAmount",
      width: "190px",
    },
    {
      title: "ຫົວໜ່ວຍ",
      dataIndex: "unit",
      key: "unit",
      render: (row) => <p className="status">{row}</p>,
      width: "190px",
    },
  ];

  // function first load of open pages
  useEffect(() => {
    LoadCounterUser();
    LoadBestSeller();
    LoadSalesPrices();
  }, []);

  // function load counter users
  const LoadCounterUser = () => {
    setLoading(true);
    CountUsers(users.token, "", "")
      .then((res) => {
        setLoading(false);
        setCounterUsers(res.data.data);
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
      });
  };

  // function load best seller
  const LoadBestSeller = () => {
    setLoading(true);
    BestSeller(users.token, "", "")
      .then((res) => {
        setBestSell(res.data.data);
        setLoading(false);
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
      });
  };

  // function load sale price
  const LoadSalesPrices = () => {
    setLoading(true);
    SalesPrices(users.token, "", "")
      .then((res) => {
        setSalesPrices(res.data.data);
        setLoading(false);
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
      });
  };

  return (
    <div className="container mt-3">
      <div className="boxes">
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/bonus");
            }}
          >
            <div className="images-icons">
              <TransactionOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ໂອນໂບນັດ</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/HomeOrders", { state: { key: 3 } });
            }}
          >
            <div className="images-icons">
              <LineChartOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ຈັດການອໍເດີ້</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/listProducts/saleProducts", { state: { key: 1 } });
            }}
          >
            <div className="images-icons">
              <ShoppingCartOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ສັ່ງສິນຄ້າ</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/auth/addUser");
            }}
          >
            <div className="images-icons">
              <UserAddOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ເພີ່ມຄົນເຂົ້າໃຊ້ລະບົບ</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/listProducts");
            }}
          >
            <div className="images-icons">
              <AppstoreOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ສິນຄ້າ</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/travels");
            }}
          >
            <div className="images-icons">
              <GoldOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ທິບທ່ອງທ່ຽວ</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => {
              navigate("/listProducts/saleProducts", { state: { key: 3 } });
            }}
          >
            <div className="images-icons">
              <FileProtectOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ປະຫວັດຂາຍຂອງເຊວ</h5>
            </div>
          </div>
        </Tooltip>
        <Tooltip title="ກົດຄິກໃສ່ເພີ່ມໄປໜ້ານີ້" color="#00A5E8">
          <div
            className="box"
            onClick={() => navigate("/lineWork", { state: { key: 2 } })}
          >
            <div className="images-icons">
              <ApartmentOutlined className="icons" />
            </div>
            <div className="titie-box">
              <h5>ສາຍງານ</h5>
            </div>
          </div>
        </Tooltip>
      </div>

      
      <div className="overview">
        <div className="boxes-card">
          {/* ========================== Progress ====================== */}
          <div className="card-boxes-users">
            <div className="text-top">
              <div className="left">
                <h4>ຜູ້ໃຊ້ທັງໝົດ</h4>
              </div>
              <div className="right">
                <MoreOutlined />
              </div>
            </div>
            <div className="content">
              <div className="cirlce-progress">
                <CircularProgressbar
                  value={counterUsers.countUser ? counterUsers.countUser : 0}
                  text={`${
                    counterUsers.countUser ? counterUsers.countUser : 0
                  }%`}
                />
              </div>
            </div>
            <div className="text-bottom">
              <div className="top-bottom">
                <p>
                  ຜູ້ໃຊ້ເດືອນນີ້ <span>{counterUsers.countUser ? counterUsers.countUser : 0} ຄົນ</span>, ສູງກວ່າເດືອນກ່ອນ {counterUsers.countUser ? (counterUsers.countUser * 100) / counterUsers.countUser  : 0} %
                </p>
              </div>
              <div className="middle">
                <p className="middle-1">ມື້ນີ້</p>
                <p className="middle-2">ເດືອນນີ້</p>
                <p className="middle-3">ສະສົມ</p>
              </div>
              <div className="bottom">
                <p className="bottom-1">
                  500
                  <ArrowDownOutlined className="text-red" />
                </p>
                <p className="bottom-2">
                  4000
                  <ArrowUpOutlined className="text-green" />
                </p>
                <p className="bottom-3">
                  7800
                  <ArrowUpOutlined className="text-green" />
                </p>
              </div>
            </div>
          </div>
          {/* ========================== Line Chart ==================== */}
          <div className="card-boxes">
            <div className="title-top">
              <div className="title-top-left">
                <div className="bg-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                  >
                    <path
                      d="M1.47283 19.012C1.0689 19.012 0.692151 18.7772 0.411338 18.3513C-0.152229 17.4938 -0.134363 16.1258 0.450567 15.3013L5.04766 8.8237C5.66755 7.91962 6.55853 7.40104 7.49264 7.40104C8.42674 7.40104 9.22684 7.86389 9.84944 8.706C11.0558 9.96376 11.0912 10.0144 11.1226 10.0587L11.1273 10.0655C11.2201 10.2014 11.3568 10.2793 11.5029 10.2793C11.6489 10.2793 11.786 10.2014 11.8784 10.0655L15.9225 4.32829H13.5093C13.0704 4.32545 12.6836 4.07754 12.4175 3.63118C12.1841 3.23941 12.0556 2.72141 12.0556 2.17157C12.0556 1.62173 12.1841 1.10372 12.4172 0.711954C12.684 0.265598 13.0708 0.017685 13.5074 0.014842H16.7571L19.5 0.0118162C22 0.0118697 22 -0.488159 22 5.01194V8.01194V9.51194C21.9981 10.1545 21.8049 10.6219 21.5 11.0119C21.2324 11.3537 20.8756 11.5119 20.5 11.5119C20.1244 11.5119 19.2676 11.8531 19 11.5119C18.6951 11.1224 18.0555 10.6978 18.0536 10.0587V7.30893L13.9486 13.1337C13.3276 14.0424 12.4354 14.5632 11.5009 14.5632C10.5664 14.5632 9.76749 14.0998 9.14411 13.2566C7.93774 11.9988 7.9024 11.9482 7.87094 11.9038L7.86628 11.897C7.77345 11.7611 7.63673 11.6832 7.49069 11.6832C7.34466 11.6832 7.20755 11.7611 7.11511 11.897L2.49432 18.4093C2.21817 18.7982 1.85541 19.012 1.47283 19.012Z"
                      fill="#9747FF"
                    />
                  </svg>
                </div>
                <span>ຍອດຄົງເຫຼືອໃນລະບົບ</span>
              </div>
              <div className="title-top-right">
                <span>+ 6.75%</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12.562 2C7.04201 2 2.56201 6.48 2.56201 12C2.56201 17.52 7.04201 22 12.562 22C18.082 22 22.562 17.52 22.562 12C22.562 6.48 18.082 2 12.562 2ZM17.812 12.33C17.812 12.74 17.472 13.08 17.062 13.08C16.652 13.08 16.312 12.74 16.312 12.33V9.31L8.59201 17.03C8.44201 17.18 8.25201 17.25 8.06201 17.25C7.87201 17.25 7.68201 17.18 7.53201 17.03C7.24201 16.74 7.24201 16.26 7.53201 15.97L15.252 8.25H12.232C11.822 8.25 11.482 7.91 11.482 7.5C11.482 7.09 11.822 6.75 12.232 6.75H17.062C17.472 6.75 17.812 7.09 17.812 7.5V12.33Z"
                    fill="#9747FF"
                  />
                </svg>
              </div>
            </div>
            <div className="line-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={730}
                  height={250}
                  data={data}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <XAxis dataKey="name" /> */}
                  {/* <YAxis /> */}
                  {/* <CartesianGrid strokeDasharray="4 4" /> */}
                  {/* <Tooltip /> */}
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="title">
              <h3 className="text-purple">
                {formatPrice(
                  salsePrices.salsePrice ? salsePrices.salsePrice : 0
                )}{" "}
                ກີບ
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* =========================== Table and list group ===================================*/}

      <div className="best-seller">
        <div className="table-card">
          <div className="header">
            <div className="title">ສິນຄ້າຂາຍດີ</div>
            <div className="filter">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z"
                    fill="#018ECD"
                  />
                  <path
                    d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z"
                    fill="#018ECD"
                  />
                  <path
                    d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z"
                    fill="#018ECD"
                  />
                  <path
                    d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z"
                    fill="#018ECD"
                  />
                  <path
                    d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z"
                    fill="#018ECD"
                  />
                  <path
                    d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z"
                    fill="#018ECD"
                  />
                </svg>
              </span>
              <span>filter</span>
            </div>
          </div>
          <div className="table">
            <TableAntd
              columns={columns}
              dataSource={bestSell}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

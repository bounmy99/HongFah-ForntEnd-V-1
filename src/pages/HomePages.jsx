import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Pagination } from 'antd';
import axios from 'axios'
import DataTable from "react-data-table-component";
import UserImage from '../assets/avatar/Avatar.png'
import Profile from '../assets/image/profile-1.jpg'
const data = [
  {
    name: 'Jan',
    uv: 2000,
  },
  {
    name: 'Feb',
    uv: 3000,
  },
  {
    name: 'Mar',
    uv: 2000,
  },
  {
    name: 'Apr',
    uv: 2780,
  },
  {
    name: 'May',
    uv: 1890,
  },
  {
    name: 'Jun',
    uv: 2390,
  },
  {
    name: 'Jui',
    uv: 3490,
  },
  {
    name: 'Aug',
    uv: 2490,
  },
  {
    name: 'Sep',
    uv: 3090,
  },
  {
    name: 'Page J',
    uv: 3490,
  },
  {
    name: 'Nov',
    uv: 3190,
  },
  {
    name: 'Oct',
    uv: 2490,
  },
  {
    name: 'Dec',
    uv: 1490,
  }
];

const product = [
  {
    id: 1,
    name: 'Handmade Pouch',
    sell: 1900,
    price: '84 ລ້ານກີບ',
    store: 50,
    status: "ໃກ້ໝົດ"
  },
  {
    id: 2,
    name: 'SmartWatch',
    sell: 2900,
    price: '80 ລ້ານກີບ',
    store: 30,
    status: "ໃກ້ໝົດ"
  },
  {
    id: 3,
    name: 'EarPhone',
    sell: 3900,
    price: '50 ລ້ານກີບ',
    store: 40,
    status: "ໃກ້ໝົດ"
  },
  {
    id: 4,
    name: 'Computer',
    sell: 5900,
    price: '74 ລ້ານກີບ',
    store: 10,
    status: "ໃກ້ໝົດ"
  },
  {
    id: 5,
    name: 'Mobile',
    sell: 7900,
    price: '184 ລ້ານກີບ',
    store: 30,
    status: "ໃກ້ໝົດ"
  }
]

const columns = [
  {
    name: "ສິນຄ້າ",
    selector: (row) => (row.name),
    cell: row => (
      <div className="name-product">
        <img src={Profile} alt={row.name} width={40} height={40} />
        <div className="flex-name">
          <p>{row.name}</p>
          <span> ລະຫັດ : 123456</span>
        </div>
      </div>
    ),
    sortable: true,
    width: '250px'
  },
  {
    name: "ຂາຍໄດ້",
    selector: (row) => row.sell,
    sortable: true,
    width: '190px'
  },
  {
    name: "ມູນຄ່າ",
    sortable: true,
    selector: (row) => row.price,
    width: '190px'
  },
  {
    name: "ເຫຼືອໃນຄັງ",
    sortable: true,
    selector: (row) => row.store,
    width: '190px'
  },
  {
    name: "ສະຖານະ",
    sortable: true,
    selector: (row) => row.status,
    cell: row => (<p className="status">{row.status}</p>),
    width: '190px'
  }
];
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
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
          justifyContent: "center",
          fontSize: "18px",
      },
  },
};
const HomePages = () => {

  const [resault, setResault] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async page => {
    setLoading(true);

    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setResault(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = page => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

    setResault(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

  }, []);
  return (
    <div>
      {/* ======================= Overviews ============================ */}
      <div className="overview">
        <div className="overview-left">
          <div className="boxes-card">
            <div className="card card-boxes">
              <div className="title-top">
                <div className="title-top-left">
                  <div className="bg-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                      <path d="M1.47283 19.012C1.0689 19.012 0.692151 18.7772 0.411338 18.3513C-0.152229 17.4938 -0.134363 16.1258 0.450567 15.3013L5.04766 8.8237C5.66755 7.91962 6.55853 7.40104 7.49264 7.40104C8.42674 7.40104 9.22684 7.86389 9.84944 8.706C11.0558 9.96376 11.0912 10.0144 11.1226 10.0587L11.1273 10.0655C11.2201 10.2014 11.3568 10.2793 11.5029 10.2793C11.6489 10.2793 11.786 10.2014 11.8784 10.0655L15.9225 4.32829H13.5093C13.0704 4.32545 12.6836 4.07754 12.4175 3.63118C12.1841 3.23941 12.0556 2.72141 12.0556 2.17157C12.0556 1.62173 12.1841 1.10372 12.4172 0.711954C12.684 0.265598 13.0708 0.017685 13.5074 0.014842H16.7571L19.5 0.0118162C22 0.0118697 22 -0.488159 22 5.01194V8.01194V9.51194C21.9981 10.1545 21.8049 10.6219 21.5 11.0119C21.2324 11.3537 20.8756 11.5119 20.5 11.5119C20.1244 11.5119 19.2676 11.8531 19 11.5119C18.6951 11.1224 18.0555 10.6978 18.0536 10.0587V7.30893L13.9486 13.1337C13.3276 14.0424 12.4354 14.5632 11.5009 14.5632C10.5664 14.5632 9.76749 14.0998 9.14411 13.2566C7.93774 11.9988 7.9024 11.9482 7.87094 11.9038L7.86628 11.897C7.77345 11.7611 7.63673 11.6832 7.49069 11.6832C7.34466 11.6832 7.20755 11.7611 7.11511 11.897L2.49432 18.4093C2.21817 18.7982 1.85541 19.012 1.47283 19.012Z" fill="#00B488" />
                    </svg>
                  </div>
                  <span>ຍອດຂາຍ</span>
                </div>
                <div className="title-top-right">
                  <span>+ 6.75%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M12.562 2C7.04201 2 2.56201 6.48 2.56201 12C2.56201 17.52 7.04201 22 12.562 22C18.082 22 22.562 17.52 22.562 12C22.562 6.48 18.082 2 12.562 2ZM17.812 12.33C17.812 12.74 17.472 13.08 17.062 13.08C16.652 13.08 16.312 12.74 16.312 12.33V9.31L8.59201 17.03C8.44201 17.18 8.25201 17.25 8.06201 17.25C7.87201 17.25 7.68201 17.18 7.53201 17.03C7.24201 16.74 7.24201 16.26 7.53201 15.97L15.252 8.25H12.232C11.822 8.25 11.482 7.91 11.482 7.5C11.482 7.09 11.822 6.75 12.232 6.75H17.062C17.472 6.75 17.812 7.09 17.812 7.5V12.33Z" fill="#44A56B" />
                  </svg>
                </div>
              </div>
              <div className="line-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={200}
                    height={60}
                    data={data}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <Area type="monotone" dataKey="uv" stroke="#579A8A" fill="#579A8A" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="title">
                <h3 className="text-success">200.000.000 ກີບ</h3>
              </div>
            </div>
            <div className="card card-boxes">
              <div className="title-top">
                <div className="title-top-left">
                  <div className="bg-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                      <path d="M1.47283 19.012C1.0689 19.012 0.692151 18.7772 0.411338 18.3513C-0.152229 17.4938 -0.134363 16.1258 0.450567 15.3013L5.04766 8.8237C5.66755 7.91962 6.55853 7.40104 7.49264 7.40104C8.42674 7.40104 9.22684 7.86389 9.84944 8.706C11.0558 9.96376 11.0912 10.0144 11.1226 10.0587L11.1273 10.0655C11.2201 10.2014 11.3568 10.2793 11.5029 10.2793C11.6489 10.2793 11.786 10.2014 11.8784 10.0655L15.9225 4.32829H13.5093C13.0704 4.32545 12.6836 4.07754 12.4175 3.63118C12.1841 3.23941 12.0556 2.72141 12.0556 2.17157C12.0556 1.62173 12.1841 1.10372 12.4172 0.711954C12.684 0.265598 13.0708 0.017685 13.5074 0.014842H16.7571L19.5 0.0118162C22 0.0118697 22 -0.488159 22 5.01194V8.01194V9.51194C21.9981 10.1545 21.8049 10.6219 21.5 11.0119C21.2324 11.3537 20.8756 11.5119 20.5 11.5119C20.1244 11.5119 19.2676 11.8531 19 11.5119C18.6951 11.1224 18.0555 10.6978 18.0536 10.0587V7.30893L13.9486 13.1337C13.3276 14.0424 12.4354 14.5632 11.5009 14.5632C10.5664 14.5632 9.76749 14.0998 9.14411 13.2566C7.93774 11.9988 7.9024 11.9482 7.87094 11.9038L7.86628 11.897C7.77345 11.7611 7.63673 11.6832 7.49069 11.6832C7.34466 11.6832 7.20755 11.7611 7.11511 11.897L2.49432 18.4093C2.21817 18.7982 1.85541 19.012 1.47283 19.012Z" fill="#9747FF" />
                    </svg>
                  </div>
                  <span>ຍອດຄົງເຫຼືອໃນລະບົບ</span>
                </div>
                <div className="title-top-right">
                  <span>+ 6.75%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M12.562 2C7.04201 2 2.56201 6.48 2.56201 12C2.56201 17.52 7.04201 22 12.562 22C18.082 22 22.562 17.52 22.562 12C22.562 6.48 18.082 2 12.562 2ZM17.812 12.33C17.812 12.74 17.472 13.08 17.062 13.08C16.652 13.08 16.312 12.74 16.312 12.33V9.31L8.59201 17.03C8.44201 17.18 8.25201 17.25 8.06201 17.25C7.87201 17.25 7.68201 17.18 7.53201 17.03C7.24201 16.74 7.24201 16.26 7.53201 15.97L15.252 8.25H12.232C11.822 8.25 11.482 7.91 11.482 7.5C11.482 7.09 11.822 6.75 12.232 6.75H17.062C17.472 6.75 17.812 7.09 17.812 7.5V12.33Z" fill="#9747FF" />
                  </svg>
                </div>
              </div>
              <div className="line-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={200}
                    height={60}
                    data={data}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <Area type="monotone" dataKey="uv" stroke="#9747FF" fill="#9747FF" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="title">
                <h3 className="text-purple">200.000.000 ກີບ</h3>
              </div>
            </div>
          </div>
          <div className="boxes">
            <div className="box box1">
              <div className="titie-box">
                <h5>ສະມາຊິກທັງໝົດ</h5>
              </div>
              <div className="content-box">
                <div className="number-left">
                  <h5>7.265</h5>
                </div>
                <div className="number-right">
                  <span>+11.02%</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="#1C1C1C" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="box box2">
              <div className="titie-box">
                <h5>ຕຳແໜ່ງ S</h5>
              </div>
              <div className="content-box">
                <div className="number-left">
                  <h5>3.671</h5>
                </div>
                <div className="number-right">
                  <span>-0.039%</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.3463 3.63931C14.5455 3.83054 14.5519 4.14706 14.3607 4.34627L11.0007 7.84627C10.9064 7.94448 10.7761 8 10.64 8C10.5039 8 10.3736 7.94448 10.2793 7.84627L8.24 5.72199L5.82335 8.23933L7.54513 9.89223L2 11.5L3.38019 5.8939L5.10197 7.5468L7.87931 4.65373C7.97359 4.55552 8.10385 4.5 8.24 4.5C8.37615 4.5 8.50641 4.55552 8.60069 4.65373L10.64 6.77801L13.6393 3.65373C13.8305 3.45453 14.1471 3.44807 14.3463 3.63931Z" fill="#1C1C1C" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="box box3">
              <div className="titie-box">
                <h5>ຕຳແໜ່ງ M</h5>
              </div>
              <div className="content-box">
                <div className="number-left">
                  <h5>1565</h5>
                </div>
                <div className="number-right">
                  <span>+15.03%</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="#1C1C1C" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="box box4">
              <div className="titie-box">
                <h5>ຕຳແໜ່ງ L</h5>
              </div>
              <div className="content-box">
                <div className="number-left">
                  <h5>318</h5>
                </div>
                <div className="number-right">
                  <span>+6.08%</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="#1C1C1C" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overview-right">
          <div className="left-content">
            <div className="text-title">
              <h5>ສະມາຊິກໄດ້ໄປທ່ອງທ່ຽວ</h5>
            </div>
            <div className="content-trip">
              <table>
                <thead>
                  <tr>
                  <td>1</td>
                  <td>
                    <img src={Profile} alt="images" className="auth-list-img" />
                  </td>
                  <td>ນາງ ສຸດາລັດ ແສງສະຫວັນ</td>
                </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>2</td>
                  <td>
                    <img src={Profile} alt="images" className="auth-list-img" />
                  </td>
                  <td>ນາງ ສຸດາລັດ ແສງສະຫວັນ</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <img src={Profile} alt="images" className="auth-list-img" />
                  </td>
                  <td>ນາງ ສຸດາລັດ ແສງສະຫວັນ</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <img src={Profile} alt="images" className="auth-list-img" />
                  </td>
                  <td>ນາງ ສຸດາລັດ ແສງສະຫວັນ</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <img src={Profile} alt="images" className="auth-list-img" />
                  </td>
                  <td>ນາງ ສຸດາລັດ ແສງສະຫວັນ</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    <img src={Profile} alt="images" className="auth-list-img" />
                  </td>
                  <td>ນາງ ສຸດາລັດ ແສງສະຫວັນ</td>
                </tr>
                </tbody>
                
                
              </table>
            </div>
            <div className="paginate-trip">
              <Pagination defaultCurrent={1} total={50} />
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z" fill="#018ECD" />
                  <path d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z" fill="#018ECD" />
                  <path d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z" fill="#018ECD" />
                  <path d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z" fill="#018ECD" />
                  <path d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z" fill="#018ECD" />
                  <path d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z" fill="#018ECD" />
                </svg>
              </span>
              <span>filter</span>
            </div>
          </div>
          <div className="table">
            <DataTable
              columns={columns}
              data={product}
              progressPending={loading}
              customStyles={customStyles}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              // fixedHeader
              // fixedHeaderScrollHeight="300px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePages

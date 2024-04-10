import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetOneTrip } from "../../functions/Trip";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { Carousel, Empty,Image } from "antd";

const DetailSuccesTrip = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const [detail, setDetail] = useState([]);
  const [member, setMember] = useState([]);
  
// function load data
  useEffect(() => {
    GetOneTrip(users.token, id)
      .then((res) => {
        setDetail(res.data.data);
        setMember(res.data.data.members);
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
      });
  }, []);

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
        backgroundColor: "#00A5E8",
        color: "white",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        justifyContent: "center",
      },
    },
  };

  const columns = [
    {
      name: "ລະຫັດ",
      selector: (row) => <p>{row.userCode}</p>,
      sortable: true,
      width: "150px",
    },
    {
      name: "ຮູບພາບ",
      selector: (row) => row.profile,
      cell: (row) => (
        <div className="name-product">
          <img src={row.profile} alt={row.name} width={50} height={50} />
        </div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "ໍຊື່ ແລະ ນາມສະກຸນ",
      selector: (row) => <p>{`${row.firstName} ${row.lastName}`}</p>,
      sortable: true,
      width: "150px",
    },
    {
      name: "ເບີໂທ",
      selector: (row) => row.phoneNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: "ຕຳແໜ່ງ",
      sortable: true,
      selector: (row) => row.position && row.position.title,
      width: "120px",
    },
  ];

  return (
    <>
      <div className="card-main">
        <div className="card-detail-header">
          <div className="text-tilte">
            <button
              onClick={() => navigate("/travels", { state: { key: 2 } })}
              className="text-link"
            >
              <i class="bx bx-chevron-left"></i>
              ກັບໄປໜ້າກ່ອນ
            </button>
          </div>
        </div>
        <div className="detail-success-trip">
          <div className="detail-success-trip-images">
            <div className="trip-image-cover">
              <div className="trip-image-cover-title">
                <h3>ຮູບພາບສະຖານທີ</h3>
              </div>
              <Image src={detail.cover} alt="" className="image-cover" />
            </div>
            <div className="trip-image-show">
              <div className="trip-image-show-title">
                <h3>ຮູບພາບສະຖານທີເພີ່ມເຕີມ</h3>
              </div>
              <div className="trip-member-info">
                {detail.images && detail.images.length ? (
                  <div>
                    <Carousel autoplay>
                      {detail.images &&
                        detail.images.map((item) => (
                          <div className="trip-image-slide">
                            <Image src={item} alt=""  className="image-show" />
                          </div>
                        ))}
                    </Carousel>
                  </div>
                ) : (
                  <div className="">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 100,
                      }}
                      description={
                        <span>
                          <a>ບໍ່ທັນມີລາຍການຮູບພາບ</a>
                        </span>
                      }
                    ></Empty>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="detail-success-trip-info">
            <div className="trip-general">
              <div className="trip-general-title">
                <h3>ຂໍ້ມູນທົ່ວໄປ</h3>
              </div>
              <div className="trip-general-info">
                <div className="trip-general-info-text">
                  <p>
                    ຊື່ສະຖານທີ່ : <span>{detail.placeName}</span>
                  </p>
                </div>
                <div className="trip-general-info-text">
                  <p>
                    ມື້ເດີນທາງ :{" "}
                    <span>
                      {new Date(detail.departureDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="trip-general-info-text">
                  <p>
                    ໄລຍະເວລາ : <span>{detail.period}</span>
                  </p>
                </div>
                <div className="trip-general-info-text">
                  <p>
                    ເງືອນໄງຄະແນນ : <span>{detail.conditionPv}</span>
                  </p>
                </div>
                <div className="trip-general-info-text">
                  <p>
                    ຈຳນວນຜູ້ເດີນທາງ : <span>{detail.amount}</span>
                  </p>
                </div>
                <div className="trip-general-info-text">
                  <p>
                    ລາຍລະອຽດ : <span>{detail.condition}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="trip-member">
              <div className="trip-member-title">
                <h3>ຂໍ້ມູນສະມາຊິກ</h3>
              </div>
              <div className="trip-member-info">
                {member.length ? (
                  <DataTable
                    data={member}
                    columns={columns}
                    customStyles={customStyles}
                  />
                ) : (
                  <div className="">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 100,
                      }}
                      description={
                        <span>
                          <a>ບໍ່ທັນມີລາຍການສະມາຊິກ</a>
                        </span>
                      }
                    ></Empty>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSuccesTrip;

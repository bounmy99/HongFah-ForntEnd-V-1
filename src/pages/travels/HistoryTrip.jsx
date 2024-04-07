import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { Empty,Image } from "antd";
import ImageTravel from "../../assets/image/no-image.png";
import LoadingCard from "../../components/LoadingCard";
import {
  GetAllTripIsSuccess,
} from "./../../functions/Trip";

const HistoryTrip = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [tripEmpty, setTripEmpty] = useState("");

 


  useEffect(() => {
    LoadData();
  }, []);

  // console.log("Images",images)


  const LoadData = () => {
    setLoading(true);
    GetAllTripIsSuccess(users.token, "true")
      .then((res) => {
        setLoading(false);
        setTrip(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setTripEmpty(err.response.data.message);
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

  // console.log("Trips", trip)

  const styles = {
    margin: 10,
    height: 380,
    width: 250,
  };

  const styles_1 = {
    margin: 10,
    height: 380,
    width: 350,
  };

  const styles_2 = {
    margin: 10,
    height: 380,
    width: 315,
  };

 
  return (
    <>
      <div className="card-main">
        <div class="list-trip-filter">
          <div class="trip-filter-date">
            <div className="date-trip">
              <div className="datepicker-trip">
                <i className="bx bx-calendar icons-left-trip"></i>
                <span className="text-date-trip">ວັນທີ</span>
                <DatePicker
                  className="btn-datepicker-trip"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setIsActiveDropdownFilter(false);
                  }}
                />
                <i className="bx bx-chevron-down icons-right-trip"></i>
              </div>
            </div>
            <div className="date-trip">
              <div className="datepicker-trip">
                <i className="bx bx-calendar icons-left-trip"></i>
                <span className="text-date-trip">ວັນທີ</span>
                <DatePicker
                  className="btn-datepicker-trip"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setIsActiveDropdownFilter(false);
                  }}
                />
                <i className="bx bx-chevron-down icons-right-trip"></i>
              </div>
            </div>
          </div>
          <div class="search">
            <div class="input-search">
              <input type="text" placeholder="ຄົ້ນຫາລາຍການ" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <circle
                  cx="7.27273"
                  cy="7.27273"
                  r="6.27273"
                  stroke="#00A5E8"
                  stroke-width="2"
                ></circle>
                <line
                  x1="14.5858"
                  y1="16"
                  x2="11.6364"
                  y2="13.0506"
                  stroke="#00A5E8"
                  stroke-width="2"
                  stroke-linecap="round"
                ></line>
              </svg>
            </div>
            <div class="btn-search">
              <button type="button">ຄົ້ນຫາ</button>
            </div>
          </div>
        </div>
        <div class="trip-container">
          {tripEmpty ? (
            <div className="empty-card">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    <a>{tripEmpty}</a>
                  </span>
                }
              ></Empty>
            </div>
          ) : (
            <>
              {loading ? (
                <div class="trip-cards-history">
                  <div className="cards-loading-trips_1">
                    <LoadingCard count={4} styles={styles_1} />
                  </div>
                  <div className="cards-loading-trips_2">
                    <LoadingCard count={4} styles={styles_2} />
                  </div>
                  <div className="cards-loading-trips">
                    <LoadingCard count={4} styles={styles} />
                  </div>
                </div>
              ) : (
                <div class="trip-cards">
                  {trip &&
                    trip.map((item, idx) => (
                      <div className="cards" key={idx}>
                        {item.cover && item.cover ? (
                          <Image style={{height:"14rem"}} src={item.cover} alt={item.name} />
                        ) : (
                          <Image style={{height:"14rem"}} src={ImageTravel} alt={item.name} />
                        )}
                        <div className="cards-title">
                          <span className="text-right">{item.name}</span>
                        </div>
                        <div className="cards-body">
                          <h5>{`${
                            item.placeName && item.placeName.substring(0, 60)
                          }`}</h5>
                          <ul className="cards-body-text">
                            <li>{item.period}</li>
                            <li>{item.amount} ຄົນ</li>
                          </ul>
                          <h3>
                            ວັນທີເດີນທາງ{" "}
                            {new Date(item.departureDate).toLocaleDateString()}
                          </h3>
                        </div>
                        <div className="cards-btn">
                            <Link to={`/travels/DetailSuccesTrip/${item._id}`}>
                              <button
                                type="button"
                                className="btn-inline info-outline"
                              >
                                <i class="bx bx-show-alt"></i> ລາຍລະອຽດ
                              </button>
                            </Link>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryTrip;

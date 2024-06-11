import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { Image } from "antd";
import ImageTravel from "../../../assets/image/no-image.png";
import LoadingCard from "../../../components/LoadingCard";
import moment from "moment";
import {
  GetAllTripIsSuccess,
} from "../../../functions/Trip";
import PaginationComponent from "../../../components/PaginationComponent";
import EmptyContent from "../../../components/EmptyContent";
const IsSuccessTrip = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tripEmpty, setTripEmpty] = useState("");

  const [count, setCount] = useState("");
  const [pageSize, setPageSize] = useState(4);
  const [pages, setPages] = useState(1);
  const [valueInput, setValueInput] = useState("");
// function first load when open pages
  useEffect(() => {
    LoadData();
  }, []);

// function load data
  const LoadData = () => {
    setLoading(true);
    GetAllTripIsSuccess(users.token, "false","")
      .then((res) => {
        setLoading(false);
        setTrip(res.data.data);
        setCount(res.data.data.length);
      })
      .catch((err) => {
        setLoading(false);
        setTripEmpty("ບໍ່ມີຂໍ້ມູນ");
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

    // set value input
    const handleChange = (e) => {
      setValueInput(e.target.value);
    };
  // search
  useEffect(()=>{
    setLoading(true);
    GetAllTripIsSuccess(users.token, "false", valueInput)
      .then((res) => {
        setLoading(false);
        setTrip(res.data.data);
        setCount(res.data.data.length);
      })
      .catch((err) => {
        setLoading(false);
        setTripEmpty("ບໍ່ມີຂໍ້ມູນ");
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

  // ===========pagination antd =============
  const indexOfLastPages = pages * pageSize;
  const indexOfFirstPages = indexOfLastPages - pageSize;
  const currentPages = trip ? trip.slice(indexOfFirstPages, indexOfLastPages) : null;
  // ================ end pagination antd ===========

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
        <div className="list-trip-filter">
          <div className="search">
            <div className="input-search">
              <input type="search" placeholder="ຄົ້ນຫາລາຍການ" onChange={handleChange}/>
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
                  strokeWidth="2"
                ></circle>
                <line
                  x1="14.5858"
                  y1="16"
                  x2="11.6364"
                  y2="13.0506"
                  stroke="#00A5E8"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></line>
              </svg>
            </div>
            <div className="btn-search">
              <button type="button">ຄົ້ນຫາ</button>
            </div>
          </div>
        </div>
        <div className="trip-container">
          {!currentPages ? (
            <EmptyContent Messages={tripEmpty ? tripEmpty : "ບໍ່ມີຂໍ້ມູນ"} />
          ) : (
            <>
              {loading ? (
                <div className="trip-cards">
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
                <>
                  <div className="trip-cards">
                    {currentPages &&
                      currentPages.map((item, idx) => (
                        <div className="cards" key={idx}>
                          {item.cover && item.cover ? (
                            <Image
                              style={{ height: "14rem" }}
                              src={item.cover}
                              alt={item.name}
                            />
                          ) : (
                            <Image
                              style={{ height: "14rem" }}
                              src={ImageTravel}
                              alt={item.name}
                            />
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
                              {moment(item.departureDate).format("DD/MM/YYYY")}
                            </h3>
                          </div>
                          <div className="cards-btn">
                            <Link to={`/travels/DetailSuccesTrip/${item._id}`}>
                              <button
                                type="button"
                                className="btn-inline btn-orange"
                              >
                                ລາຍລະອຽດ
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                  {trip?.length >= 5 && (
                    <div className="pagination-trip">
                      <PaginationComponent
                        count={count}
                        setPageSize={setPageSize}
                        pageSize={pageSize}
                        setPages={setPages}
                        pages={pages}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default IsSuccessTrip;

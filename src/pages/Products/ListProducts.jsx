import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Empty } from "antd";
import icons from "../../assets/image/icons-add.png";
import { GetAllProduct } from "../../functions/Products";
import { GetAllProductType } from "../../functions/ProductType";
import LoadingCard from "../../components/LoadingCard";
import InputSearch from "../../components/InputSearch";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../../components/PaginationComponent";
const initialValue = {
  productType: "",
  maxPrice: "",
  search: "",
};
const ListProducts = () => {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [keyword, setKeyword] = useState('');
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [productType, setProductType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [arg, setArg] = useState(initialValue);
  // console.log(arg)
  const [isActiveDropdownType, setIsActiveDropdownType] = useState(false);
  const [isActiveDropdownPrice, setIsActiveDropdownPrice] = useState(false);
  const [count, setCount] = useState("");
  const [allPages, setAllPages] = useState("");
  const [pageSize, setPageSize] = useState(27);
  const [pages, setPages] = useState("");
  const [productsEmpty, setProductsEmpty] = useState("");
  const [visible, setVisible] = useState(27);

  // const ProductType = ['ປະເພດຄີມ', 'ປະເພດເຈວ', 'ປະເພດແປ້ງ', 'ປະເພດນ້ຳ'];
  const ProductPrice = [15000, 30000, 50000, 100000];

  const formatPrice = (value) => {
    let val = (value / 1).toFixed(0).replace(",", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // ===========pagination antd =============
  const indexOfLastPages = pages + pageSize;
  const indexOfFirstPages = indexOfLastPages - pageSize;
  const currentPages = product.slice(indexOfFirstPages, indexOfLastPages);
  // ================ end pagination antd ===========

  useEffect(() => {
    LoadData();
    loadAllProductType();
  }, []);

  const LoadData = () => {
    setLoading(true);
    GetAllProduct(users.token, productType, maxPrice, search)
      .then((res) => {
        setProduct(res.data.data);
        setCount(res.data.count);
        setAllPages(res.data.allPage);
        setPages(res.data.page);
        console.log("Product API", res.data);
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
  const loadAllProductType = () => {
    GetAllProductType(users.token).then((res) => {
      setProductTypes(res.data.data);
      // console.log("ProductType", res.data)
    });
  };
  const handleClickOpenType = () => {
    setIsActiveDropdownType((isActiveDropdownType) => !isActiveDropdownType);
    setIsActiveDropdownPrice(false);
  };

  let openDropType = isActiveDropdownType ? "active" : "";

  const handleClickOpenPrice = () => {
    setIsActiveDropdownType(false);
    setIsActiveDropdownPrice((isActiveDropdownPrice) => !isActiveDropdownPrice);
  };

  let openDropPrice = isActiveDropdownPrice ? "active" : "";

  const handleClickType = (e) => {
    setProductType(e.target.value);
    setArg({ ...arg, productType: e.target.value });
    setIsActiveDropdownType(false);
    setIsActiveDropdownPrice(false);
    setSelectedType(e.target.textContent);
  };
  const handleClickPrice = (e) => {
    setIsActiveDropdownType(false);
    setIsActiveDropdownPrice(false);
    setSelectedPrice(e.target.textContent);
    setMaxPrice(e.target.textContent);
    setArg({ ...arg, maxPrice: e.target.textContent });
  };

  const styles = {
    margin: 5,
    height: 135,
    width: 110,
  };

  // const searched = (keyword) => (item) => item.name === undefined ? item.name?.toLowerCase().includes(keyword) : item.name.toLowerCase().includes(keyword);
  // const searched = (keyword) => (item) => item.name.toLowerCase().includes(keyword);

  const handleSearch = () => {
    setLoading(true);
    GetAllProduct(users.token, productType, maxPrice, search)
      .then((res) => {
        setProduct(res.data.data);
        setCount(res.data.count);
        setAllPages(res.data.allPage);
        setPages(res.data.page);
        console.log("Product API", res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
        setProductsEmpty(err.response.data.message);
      });
  };

  const handleReset = () => {
    const maxPrice = [];
    const productType = [];
    const search = [];
    setLoading(true);
    GetAllProduct(users.token, productType, maxPrice, search).then((res) => {
      setProduct(res.data.data);
      setCount(res.data.count);
      setAllPages(res.data.allPage);
      setPages(res.data.page);
      console.log("Product API", res.data);
      setProductsEmpty("");
      setSearch("");
      setArg("");
      setLoading(false);
    });
  };
  const handleShowMore = () => {
    setVisible((show) => show + 27);
  };

  console.log("count", count);
  console.log("visible", visible);
  return (
    <>
      <div className="">
        <div className="Product-card">
          <div className="product-card-header">
            <div className="select">
              <div className="select-type-menu">
                <div
                  className={`select-type-btn ${openDropType}`}
                  onClick={handleClickOpenType}
                >
                  {selectedType ? (
                    <span className="sBtn-text">{selectedType}</span>
                  ) : (
                    <span className="sBtn-text">ປະເພດສິນຄ້າ</span>
                  )}
                  <i className="bx bx-chevron-down"></i>
                </div>
                {isActiveDropdownType && (
                  <ul className="options-type">
                    {productTypes.map((item, idx) => (
                      <div className="option-type">
                        <option
                          className="option-type-text"
                          value={item._id}
                          onClick={handleClickType}
                        >
                          {item.name}
                        </option>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
              <div className="select-price-menu">
                <div
                  className={`select-price-btn ${openDropPrice}`}
                  onClick={handleClickOpenPrice}
                >
                  {selectedPrice ? (
                    <span className="sBtn-text">{selectedPrice}</span>
                  ) : (
                    <span className="sBtn-text">ລາຄາສິນຄ້າ</span>
                  )}
                  <i className="bx bx-chevron-down"></i>
                </div>

                {isActiveDropdownPrice && (
                  <ul className="options-price">
                    {ProductPrice.map((item, idx) => (
                      <li
                        className="option-price"
                        key={idx}
                        onClick={handleClickPrice}
                      >
                        <span className="option-price-text ">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="search">
              <div className="icon-filter" onClick={handleReset}>
                <i className="bx bx-reset" id="icon-reset"></i>
              </div>

              {/*  Input search*/}
              <InputSearch
                setArg={setArg}
                arg={arg}
                search={search}
                setSearch={setSearch}
              />

              <div className="btn-search">
                <button type="button" onClick={handleSearch}>
                  ຄົ້ນຫາ
                </button>
              </div>
            </div>
          </div>
          {productsEmpty ? (
            <div className="empty-card">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    <a>{productsEmpty}</a>
                  </span>
                }
              >
                <div className="add-btn-empty">
                  <Link to={"/listProducts/AddProduct"}>
                    <button type="button">ເພີ່ມສິນຄ້າໃໝ່</button>
                    <img src={icons} alt="" />
                  </Link>
                </div>
              </Empty>
            </div>
          ) : loading ? (
            <div className="content">
              <LoadingCard count={27} styles={styles} />
            </div>
          ) : (
            <>
              {/* // product && product.slice(0, visible).map((items, idx) =>
                    // product && product.filter(searched(keyword)).map((items, idx) =>
                    // thisPageItems && thisPageItems.filter(searched(keyword)).map((items, idx) => */}
              <div className="product-card-content">
                <div className="main-card">
                  {
                    // currentPages && currentPages.map((items, idx) =>
                    product &&
                      product.slice(0, visible).map((items, idx) => (
                        <>
                          <div className="content" key={idx}>
                            <div className="point">{items.point} PV</div>
                            <div className="card-content">
                              <div className="images">
                                <img src={items.images[0]} alt="" />
                              </div>
                              <div className="description">
                                <h5>{`${
                                  items.name && items.name.substring(0, 10)
                                }.....`}</h5>
                              </div>
                            </div>
                            <div className="text-bottom">
                              <div className="price-text">
                                <h5>₭ {formatPrice(items.price)}</h5>
                              </div>
                              <div className="button">
                                <Link
                                  to={`/listProducts/editProduct/${items._id}`}
                                >
                                  <button type="button">ແກ້ໄຂ</button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                  }
                </div>

                {product.length > 0 ? (
                  <>
                    {visible >= count ? (
                      ""
                    ) : (
                      <div className="load-more">
                        <button className="btn" onClick={handleShowMore}>
                          ສະແດງເພີ່ມເຕີມ
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-card">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={
                        <span>
                          <a>{productsEmpty}</a>
                        </span>
                      }
                    >
                      <div className="add-btn-empty">
                        <p>ບໍ່ມີຂໍ້ມູນ</p>
                      </div>
                    </Empty>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="product-card-footer">
            <div className="add-btn">
              <Link to={"/listProducts/AddProduct"}>
                <button type="button">ເພີ່ມສິນຄ້າໃໝ່</button>
                <img src={icons} alt="" />
              </Link>
            </div>
            <div className="pagination">
              <button className="btn-show-more" onClick={()=>navigate("/listProducts/saleProducts")}>ຂາຍສິນຄ້າ</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListProducts;

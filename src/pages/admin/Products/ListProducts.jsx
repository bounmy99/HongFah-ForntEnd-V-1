import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Empty, Image } from "antd";
import icons from "../../../assets/image/icons-add.png";
import { GetAllProduct,GetAllProductSearch } from "../../../functions/Products";
import { GetAllProductType } from "../../../functions/ProductType";
import LoadingCard from "../../../components/LoadingCard";
import InputSearch from "../../../components/InputSearch";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ShoppingCartOutlined } from "@ant-design/icons";
import PaginationComponent from "../../../components/PaginationComponent";
import { formatPrice } from "../../../functions/FormatPrices";
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

  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [productType, setProductType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [arg, setArg] = useState(initialValue);

  const [isActiveDropdownType, setIsActiveDropdownType] = useState(false);
  const [isActiveDropdownPrice, setIsActiveDropdownPrice] = useState(false);
  const [count, setCount] = useState("");
  const [pageSize, setPageSize] = useState(24);
  const [pages, setPages] = useState(1);
  const [productsEmpty, setProductsEmpty] = useState("");

  const [previewImages, setPreviewImages] = useState([]);

  const ProductPrice = [15000, 30000, 50000, 100000,500000];

  // ===========pagination antd =============


    const indexOfLastPages = pages * pageSize;
    const indexOfFirstPages = indexOfLastPages - pageSize;
    const currentPages = product ?  product.slice(indexOfFirstPages, indexOfLastPages) : null ;

    
  

  // console.log("currentPages",currentPages)
  // ================ end pagination antd ===========

  useEffect(() => {
    LoadData();
    loadAllProductType();
    setPages(1);
  }, []);

  // load all products
  const LoadData = () => {
    setLoading(true);
    GetAllProduct(users.token, productType, maxPrice, search)
      .then((res) => {
        // console.log("Products Load first", res.data.data)
        setLoading(false);
        setProduct(res.data.data);
        setCount(res.data.count);
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
  // load all products type
  const loadAllProductType = () => {
    GetAllProductType(users.token).then((res) => {
      setProductTypes(res.data.data);
    });
  };

  // open dropdown product type
  const handleClickOpenType = () => {
    setIsActiveDropdownType((isActiveDropdownType) => !isActiveDropdownType);
    setIsActiveDropdownPrice(false);
  };
  let openDropType = isActiveDropdownType ? "active" : "";

  // open dropdown price
  const handleClickOpenPrice = () => {
    setIsActiveDropdownType(false);
    setIsActiveDropdownPrice((isActiveDropdownPrice) => !isActiveDropdownPrice);
  };
  let openDropPrice = isActiveDropdownPrice ? "active" : "";

  // set value products type
  const handleClickType = (e) => {
    setProductType(e.target.value);
    setArg({ ...arg, productType: e.target.value });
    setIsActiveDropdownType(false);
    setIsActiveDropdownPrice(false);
    setSelectedType(e.target.textContent);
  };

  // set value products price
  const handleClickPrice = (e) => {
    setIsActiveDropdownType(false);
    setIsActiveDropdownPrice(false);
    setSelectedPrice(e.target.textContent);
    setMaxPrice(e.target.textContent);
    setArg({ ...arg, maxPrice: e.target.textContent });
  };

  // loading skeleton
  const large = {
    margin: 5,
    height: 130,
    width: 135,
  };
  const medium = {
    margin: 5,
    height: 240,
    width: 175,
  };
  const small = {
    margin: 5,
    height: 236,
    width: 215,
  };
  const smaller = {
    margin: 5,
    height: 250,
    width: 260,
  };

  // search with Produc price , product Type, Product name
  useEffect(() => {
    setLoading(true);
    (productType || maxPrice || search ? GetAllProductSearch(users.token, productType, maxPrice, search) : GetAllProduct(users.token)).then((res) => {
        setProduct(res.data.data);
        // console.log("Products search", res.data.data)
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setProductsEmpty("ບໍ່ມີຂໍ້ມູນ");
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
  }, [productType, maxPrice, search]);

  const handleSearch = () => {
    setLoading(true);
    GetAllProductSearch(users.token, productType, maxPrice, search)
      .then((res) => {
        setProduct(res.data.data);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setProductsEmpty("ບໍ່ມີຂໍ້ມູນ");
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

  // reset search
  const handleReset = () => {
    const maxPrice = [];
    const productType = [];
    const search = [];
    setLoading(true);
    GetAllProduct(users.token, productType, maxPrice, search).then((res) => {
      setProduct(res.data.data);
      setCount(res.data.count);
      setProductsEmpty("");
      setSearch("");
      setArg("");
      setLoading(false);
    });
  };

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
                      <div className="option-type" key={idx}>
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
                        <span className="option-price-text ">{formatPrice(item)}</span>
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
          {!currentPages ? (
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
                  </Link>
                </div>
              </Empty>
            </div>
          ) : loading ? (
            <div className="content">
              <div className="ProductLarge">
                <LoadingCard count={24} styles={large} />
              </div>
              <div className="ProductMedium">
                <LoadingCard count={16} styles={medium} />
              </div>
              <div className="ProductSmall">
                <LoadingCard count={12} styles={small} />
              </div>
              <div className="ProductSmaller">
                <LoadingCard count={3} styles={smaller} />
              </div>
            </div>
          ) : (
            <>
              <div className="product-card-content">
                <div className="main-card">
                  {currentPages &&
                    currentPages.map((items, idx) => (
                      <>
                        <div className="content" key={idx}>
                          <div className="point">{items.point} PV</div>
                          <div className="card-content">
                            <div className="images">
                              <Image
                                src={items.images[0]}
                                preview={{ visible: false }}
                                onClick={() => setPreviewImages(items.images)}
                                // className="images-products"
                              />
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
                    ))}
                </div>
                {previewImages.length > 0 ? (
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                      visible: previewImages.length,
                      onVisibleChange: (value) => {
                        if (!value) {
                          setPreviewImages([]);
                        }
                      },
                    }}
                  >
                    {previewImages.map((image, i) => (
                      <Image src={image} key={i} />
                    ))}
                  </Image.PreviewGroup>
                ) : null}
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
            {product?.length >= 25 && (
              <div className="pagination">
                <PaginationComponent
                  count={count}
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  setPages={setPages}
                  pages={pages}
                />
              </div>
            )}
            {users?.role === "super" ? (
              <div className="pagination">
                <button
                  className="btn-show-more"
                  onClick={() => navigate("/listProducts/saleProducts")}
                >
                  <ShoppingCartOutlined /> ຂາຍສິນຄ້າ
                </button>
              </div>
             ) : null} 
          </div>
        </div>
      </div>
    </>
  );
};
export default ListProducts;

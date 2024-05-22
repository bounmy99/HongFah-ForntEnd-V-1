import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useSelector, useDispatch } from "react-redux";
import imagePreview from "../../../assets/image/upload.png";
import {
  DeleteProductType,
  GetAllProductType,
  GetOneProductType,
  InsertProductType,
  UpdateProductType,
} from "../../../functions/ProductType";
import { CreateProduct } from "../../../functions/Products";
import { CaruselAdd } from "../../../components/CaroselAdd";

import Swal from "sweetalert2";
import { Spin, Select, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import EmptyContent from "../../../components/EmptyContent";

const initialState = {
  name: "",
  productType: [],
  detail: "",
  price: "",
  point: "",
  amount: "",
  images: [],
  cashback: "",
  unit: [],
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState([]);
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {
    name,
    productType,
    detail,
    price,
    point,
    amount,
    images,
    cashback,
    unit,
  } = product;

  // console.log("productType", productType);

  const [productTypes, setProductTypes] = useState([]);
  const [valueProductType, setValueProductType] = useState();
  const [page, setPage] = useState(1);
  const [pageSiize, setPageSiize] = useState(4);

  const [IdProductType, setIdProductType] =useState(null);
  const [openAddProductType,setOpenAddProductType] = useState(false);
  const dispatch = useDispatch();

  
  // console.log("IdProductType",IdProductType);
  // console.log("ValueProductType", valueProductType);

  useEffect(() => {
    loadAllProductType();
  }, []);


  // load product type
  const loadAllProductType = () => {
    GetAllProductType(users.token)
      .then((res) => {
        setProductTypes(res.data.data);
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

  // set value
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // set product type
  const handleChangeProductType = (e) => {
    console.log(e);
    setProduct({ ...product, productType: e });
    // console.log(e.target.value)
    // setProduct({ ...product, productType: e.target.value });
  };

  // set file list images
  const handleChangeImage = (e) => {
    const files = e.target.files;
    if (files) {
      let allFile = product.images;
      let allPreview = image;

      for (let i = 0; i < files.length; i++) {
        // Preview
        allPreview.push(URL.createObjectURL(files[i]));

        allFile.push(files[i]);
        setProduct({ ...product, images: allFile });
        setImage(allPreview);
      }
    }
  };

  // insert product
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("productType", productType);
    formData.append("detail", detail);
    formData.append("price", price);
    formData.append("point", point);
    formData.append("amount", amount);
    formData.append("cashback", cashback);
    formData.append("unit", unit);

    images.forEach((file) => {
      formData.append("images", file);
      console.log("file looped", file);
    });

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
      if (!value) {
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
          title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
        });
        setLoading(false);
        return;
      }
    }

    CreateProduct(users.token, formData)
      .then((res) => {
        console.log(res.data.data);
        if (res.status === 200) {
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
            icon: "success",
            title: "ບັນທຶກສິນຄ້າສຳເລັດ",
          });
          navigate("/listProducts");
          setImage([]);
          setProduct([]);
        }
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
          title: "ບໍ່ສາມາດບັນທຶກສິນຄ້າໄດ້",
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

  // reset file when insert finish
  const handleReset = () => {
    setImage([]);
    setProduct([]);
    window.location.reload();
  };

  // ===================== ປະເພດຂອງສິນຄ້າ ======================
  const openModalAdd = ()=>{
    setOpenAddProductType(!openAddProductType)
  }
  const ToggOpen = openAddProductType ? "open" : ""


  const columns = [
    {
      title: "ຊື່ປະເພດສິນຄ້າ",
      dataIndex: "name",
      width: "500px",
    },
    {
      title: "ຈັດການ",
      render: (row) => (
        <>
          <div className="btn__manage">
            <button
              className="btn__type__edit"
              onClick={() => editProductType(row._id)}
            >
              ແກ້ໄຂ
            </button>
            <button
              className="btn__type__delete"
              onClick={() => deleteProductType(row._id)}
            >
              ລົບ
            </button>
          </div>
        </>
      ),
    },
  ];

  const editProductType = (id) => {
    setIdProductType(id)
    GetOneProductType(users.token,id).then(res=>{
      setValueProductType(res.data.data.name)
    }).catch(err=>{
      console.log(err)
    })
  };

  const deleteProductType = (id) => {
    setLoading(true);
    Swal.fire({
      title: "ລົບຂໍ້ມູນ",
      text: "ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ລົບຂໍ້ມູນ",
      cancelButtonText: "ຍົກເລີກ",
    }).then((result) => {
      if (result.isConfirmed) {
        // return
        DeleteProductType(users.token, id).then((res) => {
          if (res.data) {
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
              icon: "success",
              title: "ລົບປະເພດສິນຄ້າສຳເລັດ",
            });
            loadAllProductType();
            // setOpenAddProductType(false);
          }
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
            title: "ບໍ່ສາມາດລົບປະເພດສິນຄ້າໄດ້",
          });
  
          if (err.response.data.message === "unauthorized") {
            dispatch({
              type: "USER_LOGOUT",
              payload: null,
            });
            navigate("/");
          }
        });
      }else{
        setLoading(false)
      }
    });
 
  };

  const handleSubmitProductType = (e) => {
    e.preventDefault();
  
    if (!valueProductType) {
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
        title: "ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ",
      });
      return
    }

      setLoading(true);
      IdProductType && IdProductType ?
      UpdateProductType(users.token,IdProductType,{ name: valueProductType }).then(res=>{
        if (res.data) {
          setIdProductType(null);
          setValueProductType("");
          loadAllProductType();
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
            icon: "success",
            title: "ອັບເດດສຳເລັດ",
          });
        }
      }).catch(err=>{
        setLoading(false);
          if (err.response.data.message === "unauthorized") {
            dispatch({
              type: "USER_LOGOUT",
              payload: null,
            });
            navigate("/");
          }
      })
      :
     
      InsertProductType(users.token, { name: valueProductType }).then((res) => {
          if (res.data) {
            setValueProductType("");
            loadAllProductType();
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
              icon: "success",
              title: "ບັນທຶກສຳເລັດ",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.message === "unauthorized") {
            dispatch({
              type: "USER_LOGOUT",
              payload: null,
            });
            navigate("/");
          }
        })
    
    
  };

  return (
    <div className="card-main">
      <Spin spinning={loading}>
        <div className="Card">
          <div className="card-header">
            <div className="text-tilte">
              <button
                onClick={() => navigate("/ListProducts")}
                className="text-link"
              >
                <i className="bx bx-chevron-left"></i>
                ກັບໄປໜ້າກ່ອນ
              </button>
            </div>
            <div className="text-tilte">
              <button className="btn__add__type" onClick={openModalAdd}>ເພີ່ມປະເພດສິນຄ້າ</button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-edit-content">
              <div className="content-left">
                <div className="image-add-multiple">
                  <CaruselAdd
                    handleChangeImage={handleChangeImage}
                    imagePreview={imagePreview}
                    images={image}
                  />
                </div>
                <div className="btn-button">
                  <button
                    type="button"
                    className="btn-info-outline"
                    onClick={handleReset}
                  >
                    ຍົກເລິກການເພີ່ມ
                  </button>
                  <button type="submit" className="btn-info btn">
                    ເພີ່ມສິນຄ້າ
                  </button>
                </div>
              </div>

              <div className="content-right">
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຊື່ສິນຄ້າ:</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="ກະລຸນາປ້ອນຊື່ສິນຄ້າ"
                      className="form-controls"
                      value={name}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ລາຄາສິນຄ້າ:</label>
                    <input
                      type="text"
                      name="price"
                      onChange={handleChange}
                      placeholder="ກະລຸນາປ້ອນລາຄາສິນຄ້າ"
                      className="form-controls"
                      value={price}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ປະເພດ:</label>
                    <Select
                      name="productType"
                      style={{
                        width: 230,
                        height: 48,
                      }}
                      placeholder="ເລຶອກປະເພດ"
                      optionFilterProp="children"
                      onChange={handleChangeProductType}
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={
                        productTypes &&
                        productTypes.map((item) => ({
                          value: item._id,
                          label: item.name,
                        }))
                      }
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ຫົວໜ່ວຍສິນຄ້າ:</label>
                    <input
                      type="text"
                      name="unit"
                      onChange={handleChange}
                      placeholder="ກະລຸນາປ້ອນຫົວໜ່ວຍສິນຄ້າ"
                      className="form-controls"
                      value={unit}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຄະແນນ:</label>
                    <input
                      type="number"
                      name="point"
                      onChange={handleChange}
                      placeholder="ຄະແນນຕ້ອງເປັນຈຳຖ້ວນ"
                      className="form-controls"
                      value={point}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ໄດ້ຮັບເງິນຄືນ:</label>
                    <input
                      type="number"
                      name="cashback"
                      onChange={handleChange}
                      placeholder="ໄດ້ຮັບເງິນຄືນຕ້ອງເປັນຈຳຖ້ວນ"
                      className="form-controls"
                      value={cashback}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຈຳນວນ:</label>
                    <input
                      type="text"
                      name="amount"
                      onChange={handleChange}
                      placeholder="ກະລຸນາປ້ອນຈຳນວນ"
                      className="form-controls"
                      value={amount}
                    />
                  </div>
                  <div className="input-group"></div>
                </div>
                <div className="input-group">
                  <label htmlFor="">ລາຍລະອຽດສິນຄ້າ</label>
                  <textarea
                    className="textarea-product-add"
                    name="detail"
                    onChange={handleChange}
                    value={detail}
                    placeholder="ກະລຸນາປ້ອນລາຍລະອຽດສິນຄ້າ"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* ================================ Modal ============================= */}
        <div className={`modal-add-products ${ToggOpen}`}>
          <div className="modal-add-products-card genealogy-scroll">
            <div className="close-btn" onClick={()=>setOpenAddProductType(false)}>
                <CloseOutlined />
            </div>
            <div className="header-card-products-type">
              <form
                className="form-type-products"
                onSubmit={handleSubmitProductType}
              >
                <div className="input-group-type">
                  <label htmlFor="">ຊື່ປະເພດສິນຄ້າ</label>
                  {/* <span className="error__validation">Errors</span> */}
                  <input
                    type="text"
                    name="name"
                    value={valueProductType}
                    className="form-control-type-product"
                    placeholder="ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ"
                    onChange={(e) => setValueProductType(e.target.value)}
                  />
                </div>
                <div className="btn-group-type">
                  {IdProductType ?
                  <button type="submit" className="btn-typ-product">
                  ອັບເດດ
                </button>
                  :
                  <button type="submit" className="btn-typ-product">
                    ເພີ່ມ
                  </button>
                  }
                </div>
               
              </form>
            </div>
            <div className="body-card-products-type">
              <h3 className="title">ລາຍການປະເພດສິນຄ້າ</h3>
              <div className="table-type">
                { productTypes.length ?  
                <Table
                  columns={columns}
                  dataSource={productTypes}
                  pagination={{
                    current: page,
                    pageSize: pageSiize,
                    onChange: (page, pageSiize) => {
                      setPage(page);
                      setPageSiize(pageSiize);
                    },
                  }}
                />
                :
                <EmptyContent Messages={"ບໍ່ມີຂໍ້ມູນ"}/>
                }
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default AddProduct;

import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { GetAllProductType } from "../../../functions/ProductType";
import {
  UpdateProduct,
  GetOneProduct,
  DeleteProduct,
} from "../../../functions/Products";
import { Carusel } from "../../../components/Carosel";
import { Spin,Select } from "antd";

const initialState = {
  name: "",
  productType: "",
  detail: "",
  price: "",
  point: "",
  amount: "",
  images: [],
  cashback: "",
  unit: [],
};

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState([]);
  const [newPreviewimage, setNewPreviewImage] = useState([]);
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState([]);
  const [productType, setProductType] = useState([]);

  useEffect(() => {
    loadAllProductType();
    loadOneProduct();
  }, []);

  // load one product
  const loadOneProduct = () => {
    GetOneProduct(users.token, id).then((res) => {
      setProduct({ ...product, ...res.data.data });
    });
  };
  // load all product type
  const loadAllProductType = () => {
    GetAllProductType(users.token).then((res) => {
      setProductType(res.data.data);
    });
  };
  // set value
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeType = (e) => {
    setProduct({ ...product,  productType : e });
  };

  // set file list
  const handleChangeImage = (e) => {
    const files = e.target.files;
    let allFile = product.images;
    let newallFile = [];
    let allPreview = image;
    let newPreview = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        // Preview
        allPreview.push(URL.createObjectURL(files[i]));
        newPreview.push(URL.createObjectURL(files[i]));
        setNewPreviewImage(newPreview);

        // upload
        allFile.push(files[i]);
        newallFile.push(files[i]);
        setNewImage(newallFile);
      }
    }
  };

  // update product
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    if (product.productType._id) {
      formData.append("productType", product.productType._id);
    } else if (product.productType) {
      formData.append("productType", product.productType);
    }
    formData.append("detail", product.detail);
    formData.append("price", product.price);
    formData.append("point", product.point);
    formData.append("amount", product.amount);
    formData.append("cashback", product.cashback);
    formData.append("unit", product.unit);

    if (newImage) {
      newImage.forEach((file) => {
        formData.append("images", file); // Use 'images[]' to create an array on the server
        if (product.images) {
          product.images.forEach((file) => {
            formData.append("deleteImagesUrl", file); // Use 'images[]' to delete an array on the server
          });
        }
      });
    }

    // console.log("product.images",product.images)

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    UpdateProduct(users.token, product._id, formData)
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
            title: "ອັບເດດສິນຄ້າສຳເລັດ",
          });
          navigate("/listProducts");
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
          title: "ບໍ່ສາມາດອັບເດດສິນຄ້າໄດ້",
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

  // reset
  const handleReset = () => {
    setImage([]);
    setProduct([]);
    window.location.reload();
  };

  // delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "ຢືນຢັນການລົບ",
      text: "ທ່ານຕ້ອງການລົບລາຍການນີ້ແທ້ບໍ່ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteProduct(users.token, id)
          .then((res) => {
            if (res.status === 200) {
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
                title: "ລົບສິນຄ້າສຳເລັດແລ້ວ",
              });
              navigate("/listProducts");
            }
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
              title: "ບໍ່ສາມາດລົບສິນຄ້າໄດ້",
            });

            if (err.response.data.message === "unauthorized") {
              dispatch({
                type: "USER_LOGOUT",
                payload: null,
              });
              navigate("/");
            }
          });
      }
    });
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

            {/* create delete button */}

            <div className="btn-del">
              <button type="button" onClick={() => handleDelete(product._id)}>
                ລົບ
                <i className="bx bxs-trash-alt"></i>
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-edit-content">
              <div className="content-left">
                <Carusel
                  images={product.images}
                  handleChangeImage={handleChangeImage}
                  image={newPreviewimage}
                />

                <div className="btn-button">
                  <button
                    type="button"
                    className="btn-info-outline"
                    onClick={handleReset}
                  >
                    ຍົກເລິກ
                  </button>
                  <button type="submit" className="btn-info btn">
                    ອັບເດດ
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
                      id=""
                      className="form-controls"
                      value={product.name}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ລາຄາສິນຄ້າ:</label>
                    <input
                      type="text"
                      name="price"
                      onChange={handleChange}
                      id=""
                      className="form-controls"
                      value={product.price}
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
                        height :48
                      }}
                      value={product.productType._id}
                      placeholder="ເລຶອກປະເພດ"
                      optionFilterProp="children"
                      onChange={handleChangeType}
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={
                        productType &&
                        productType.map((item) => ({
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
                      id=""
                      className="form-controls"
                      value={product.unit}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຈຳນວນ:</label>
                    <input
                      type="number"
                      name="amount"
                      onChange={handleChange}
                      id=""
                      className="form-controls"
                      value={product.amount}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ໄດ້ຮັບເງິນຄືນ:</label>
                    <input
                      type="number"
                      name="cashback"
                      onChange={handleChange}
                      id=""
                      className="form-controls"
                      value={product.cashback}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="">ລາຍລະອຽດສິນຄ້າ</label>
                  <textarea
                    className="textarea-product-add"
                    name="detail"
                    onChange={handleChange}
                    value={product.detail}
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Spin>
    </div>
  );
};

export default EditProduct;

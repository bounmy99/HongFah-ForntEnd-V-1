import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useSelector } from "react-redux";
import imagePreview from "../../assets/image/upload.png";
import { GetAllProductType } from "../../functions/ProductType";
import { CreateProduct } from "../../functions/Products";
import { CaruselAdd } from "../../components/CaroselAdd";

import Swal from "sweetalert2";
import { Spin, Select } from "antd";
import { values } from "lodash";
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

  console.log("productType", productType);

  const [productTypes, setProductTypes] = useState([]);

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
        Swal.fire({
          position: "center",
          icon: "error",
          title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
          showConfirmButton: false,
          timer: 3500,
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

  // reset file when insert finish
  const handleReset = () => {
    setImage([]);
    setProduct([]);
    window.location.reload();
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
                      id=""
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
                      id=""
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
                        height :48
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
                        productTypes.map((item, idx) => ({
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
                      value={unit}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="">ຄະແນນ:</label>
                    <input
                      type="text"
                      name="point"
                      onChange={handleChange}
                      id=""
                      className="form-controls"
                      value={point}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">ໄດ້ຮັບເງິນຄືນ (cash back):</label>
                    <input
                      type="text"
                      name="cashback"
                      onChange={handleChange}
                      id=""
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
                      id=""
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

export default AddProduct;

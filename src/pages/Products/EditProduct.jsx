import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { GetAllProductType } from '../../functions/ProductType';
import { UpdateProduct, GetOneProduct, DeleteProduct } from '../../functions/Products';
import { Carusel } from '../../components/Carosel';

const initialState = {
    name: "",
    productType: "",
    detail: "",
    price: "",
    point: "",
    amount: "",
    images: [],
    cashback: "",
    unit: []
}

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { users } = useSelector((state) => ({ ...state }));
    const [image, setImage] = useState([]);
    const [newPreviewimage, setNewPreviewImage] = useState([]);
    const [product, setProduct] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [newImage, setNewImage] = useState([]);
    const [productType, setProductType] = useState([]);


    // console.log("product",product);
    // console.log("product.productType from database",product.productType);
    // console.log("product.productType from select",product.productType);


    useEffect(() => {
        loadAllProductType();
        loadOneProduct();
    }, [])
    const loadOneProduct = () => {
        GetOneProduct(users.token, id).then(res => {
            setProduct({ ...product, ...res.data.data })
        })
    }

    const loadAllProductType = () => {
        GetAllProductType(users.token).then(res => {
            setProductType(res.data.data)
        })
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }


    const handleChangeImage = (e) => {
        const files = e.target.files;

        console.log("newSelect", files)
        let allFile = product.images;
        let newallFile = [];
        let allPreview = image;
        let newPreview = []
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

    }

    console.log("newImage", newImage);
    console.log("newPreviewimage", newPreviewimage)
    console.log("oldimages", product.images)

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        if (product.productType._id) {
            formData.append('productType', product.productType._id);
        } else if (product.productType) {
            formData.append('productType', product.productType);
        }
        formData.append('detail', product.detail);
        formData.append('price', product.price);
        formData.append('point', product.point);
        formData.append('amount', 20);
        formData.append('cashback', product.cashback);
        formData.append('unit', product.unit);

        if (newImage) {
            newImage.forEach(file => {
                formData.append('images', file); // Use 'images[]' to create an array on the server
                if (product.images) {
                    product.images.forEach(file => {
                        formData.append('deleteImagesUrl', file); // Use 'images[]' to delete an array on the server
                    });
                }
            });
        }

        // console.log("product.images",product.images)

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        UpdateProduct(users.token, product._id, formData).then(res => {
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
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "ອັບເດດສິນຄ້າສຳເລັດ"
                });
                navigate("/listProducts")
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })

    }
    const handleReset = () => {
        setImage([]);
        setProduct([]);
        window.location.reload();
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "ຢືນຢັນການລົບ",
            text: "ທ່ານຕ້ອງການລົບຕຳແໜ່ງນີ້ແທ້ບໍ່ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ຢືນຢັນ",
            cancelButtonText: "ຍົກເລິກ",
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteProduct(users.token, id).then(res => {
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
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: "ລົບສຳເລັດແລ້ວ"
                        });
                        navigate("/listProducts");
                    }
                }).catch(err => {
                    console.log(err)
                })

            }
        });
    }
    return (
        <div className="card-main">
            <div className="Card">
                <div className="card-header">
                    <div className="text-tilte">
                        {loading

                            ?
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                                <p>ກຳລັງບັນທຶກຂໍ້ມູນ.......</p><CircularProgress style={{ color: '#008BCB' }} />
                            </Stack>
                            :
                            <button onClick={() => navigate('/ListProducts')} className="text-link">
                                <i className='bx bx-chevron-left'></i>
                                ກັບໄປໜ້າກ່ອນ
                            </button>
                        }

                    </div>

                    {/* create delete button */}

                    <div className="btn-del">
                        <button type="button" onClick={() => handleDelete(product._id)}>
                            ລົບ
                            <i className='bx bxs-trash-alt'></i>
                        </button>
                    </div>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-edit-content">
                        <div className="content-left">

                            <Carusel images={product.images} handleChangeImage={handleChangeImage} image={newPreviewimage} />

                            <div className="btn-button">
                                <button type="button" className="btn-info-outline" onClick={handleReset}>ຍົກເລິກ</button>
                                <button type="submit" className="btn-info btn" >ອັບເດດ</button>
                            </div>
                        </div>

                        <div className="content-right">
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="">ຊື່ສິນຄ້າ:</label>
                                    <input type="text" name="name" onChange={handleChange} id="" className="form-controls" value={product.name} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">ລາຄາສິນຄ້າ:</label>
                                    <input type="text" name="price" onChange={handleChange} id="" className="form-controls" value={product.price} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="">ປະເພດ:</label>
                                    <select className="form-select" value={product.productType._id} onChange={handleChange} name="productType">
                                        <option selected disabled>ກະລຸນາເລືອກ</option>
                                        {productType && productType.map((item, idx) =>
                                            <option value={item._id} key={idx}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">ຫົວໜ່ວຍສິນຄ້າ:</label>
                                    <input type="text" name="unit" onChange={handleChange} id="" className="form-controls" value={product.unit} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">ລາຍລະອຽດສິນຄ້າ</label>
                                <textarea className="textarea-product-add" name="detail" onChange={handleChange} value={product.detail} id="" cols="30" rows="10">
                                </textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import previewImage from '../../assets/image/upload.png'
import Swal from 'sweetalert2';
// fucntion
import { GetOneUser, GetAllUser, UpdateUser } from '../../functions/Authentication';

const EditUser = () => {
    const { id } = useParams();
    const { users } = useSelector((state) => ({ ...state }))
    const navigate = useNavigate()
    const [image, setImage] = useState([])
    const [fileName, setFileName] = useState("")
    const [userEdit, setUserEdit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState([]);

    useEffect(() => {
        GetOneUser(users.token, id).then(res => {
            setUserEdit(res.data.data)
        }).catch(err => {
            console.log(err)
        })
        loadData();
    }, []);

    const loadData = () => {
        GetAllUser(users.token).then(res => {
            setLoading(false);
            const roles = [...new Set(res.data.data.map(item => item.role))]
            setRoleList(roles)
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }

    const handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setUserEdit({ ...userEdit, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const values = [...formData.values()];
        const isEmpty = values.includes('');
        if (isEmpty) {
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
                icon: "error",
                title: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ"
            });
            return;
        }
        const Data = Object.fromEntries(formData);
        e.currentTarget.reset();
        console.log("Data from Input", Data)

        UpdateUser(users.token, Data, id).then(res => {
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
                    title: "ອັບເດດຂໍ້ມູນສຳເລັດ"
                });
               
                navigate("/auth")
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="card-main">
            <div className="card-add-user">
                <div className="card-user-header" id="add-user">
                    <div className="text-tilte">
                        <button
                            onClick={() => navigate('/auth')}
                            className="text-link">
                            <i className='bx bx-chevron-left'></i>
                            ກັບໄປໜ້າກ່ອນ
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className="card-user-update-content">
                        <div className="user-update-img">
                            <div className="img-add">
                                <div className="border-img" onClick={() => document.querySelector(".input-file").click()}>
                                    {

                                        image[0]
                                            ? <img src={image} alt={fileName} className="img-fluid" />
                                            :
                                            <>
                                                <img src={userEdit && userEdit.profile ? userEdit.profile : previewImage} className="img-fluid" />
                                            </>

                                    }

                                    <input type="file" name="profile" className="input-file" hidden
                                        onChange={({ target: { files } }) => {
                                            files[0] && setFileName(files[0].name)
                                            if (files) {
                                                setImage(URL.createObjectURL(files[0]))
                                            }
                                        }} />
                                </div>
                            </div>
                            <div className="user-btn">
                                <button type="submit" className="btn-add-user">
                                    ບັນທຶກ
                                </button>
                                <button type="button" onClick={() => navigate('/auth')} className="btn-cancel-user">
                                    ຍົກເລິກ
                                </button>
                            </div>
                        </div>
                        <div className="user-update-form">
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="">ຊື່</label>
                                    <input type="text" value={userEdit && userEdit.firstName} name="firstName" className="form-controls-md" onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">ນາມສະກຸນ</label>
                                    <input type="text" value={userEdit && userEdit.lastName} name="lastName" className="form-controls-md" onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">ອີເມວ</label>
                                    <input type="text" value={userEdit && userEdit.email} name="email" className="form-controls-md" onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">ເບີໂທ</label>
                                    <input type="text" value={userEdit && userEdit.phoneNumber} name="phoneNumber" className="form-controls-md" onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">ສິດເຂົ້າໃຊ້</label>
                                    <select name="role" value={userEdit && userEdit.role} className="form-controls-md" onChange={handleChange} >
                                        {roleList.map((item, i) => (
                                            <option value={item} key={i}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser
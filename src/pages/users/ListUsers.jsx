import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListUsersAll from './ListUsersAll';
import ListUserNotVerify from './ListUserNotVerify';
import ListUserVerify from './ListUserVerify';

const ListUsers = () => {
    const [statusClick, setStatusClick] = useState('');
    const { state } = useLocation();

// function click button
    const handleClickBtn = (e) => {
        setStatusClick(e)
    }

// function first load when open pages
    useEffect(() => {
        setStatusClick(statusClick ? statusClick : 1);
        if (state) {
            setStatusClick(state.key);
        }
    }, [])

    return (
        <div className="card-main">
            <div className="user-content-header">
                <div className="user-text">
                    <h3>ລາຍການຮ້ອງຂໍທັງໝົດ</h3>
                </div>
                <div className="user-button">
                    <div >
                        <button className={`user-btns btn-await-user ${statusClick === 1 ? 'active' : ''}`} onClick={() => handleClickBtn(1)}>ຜູ້ໃຊ້ທັງໝົດ</button>
                    </div>
                    <div >
                        <button className={`user-btns btn-await-monney ${statusClick === 2 ? 'active' : ''}`} onClick={() => handleClickBtn(2)}>ບໍ່ທັນ Verify</button>
                    </div>
                    <div>
                        <button className={`user-btns btn-history ${statusClick === 3 ? 'active' : ''}`} onClick={() => handleClickBtn(3)}>Verify ແລ້ວ</button>
                    </div>
                </div>
            </div>
            
{/* ============ show change pages when click statusClick = 1,2,3 ==================== */}
            {statusClick === 1 && <ListUsersAll />}
            {statusClick === 2 && <ListUserNotVerify />}
            {statusClick === 3 && <ListUserVerify />}


        </div>
    )
}

export default ListUsers

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconImg from '../../assets/image/withdraw-icon.png'
import ListWithdrawAwait from './ListUsersAll';
import ListWithdrawAwaitMoney from './ListUserNotVerify';
import ListUserVerify from './ListUserVerify';

const ListUsers = () => {
    const [statusClick, setStatusClick] = useState('');
    const { state } = useLocation()
    const handleClickBtn = (e) => {
        setStatusClick(e)
    }

    useEffect(() => {
        setStatusClick(statusClick ? statusClick : 1);
        if (state) {
            setStatusClick(state.key);
        }
    }, [])

    return (
        <div className="card-main">
            <div className="withdraw-content-header">
                <div className="withdraw-text">
                    <h3>ລາຍການຮ້ອງຂໍທັງໝົດ</h3>
                </div>
                <div className="withdraw-button">
                    <div >
                        <button className={`withdraw-btns btn-await-withdraw ${statusClick === 1 ? 'active' : ''}`} onClick={() => handleClickBtn(1)}>ຜູ້ໃຊ້ທັງໝົດ</button>
                    </div>
                    <div >
                        <button className={`withdraw-btns btn-await-monney ${statusClick === 2 ? 'active' : ''}`} onClick={() => handleClickBtn(2)}>ຜູ້ໃຊ້ຍັງບໍ່ທັນ Verify</button>
                    </div>
                    <div>
                        <button className={`withdraw-btns btn-history ${statusClick === 3 ? 'active' : ''}`} onClick={() => handleClickBtn(3)}>Verify ແລ້ວ</button>
                    </div>
                </div>
            </div>
            {statusClick === 1 && <ListWithdrawAwait />}
            {statusClick === 2 && <ListWithdrawAwaitMoney />}
            {statusClick === 3 && <ListUserVerify />}


        </div>
    )
}

export default ListUsers

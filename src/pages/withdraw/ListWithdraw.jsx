import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconImg from '../../assets/image/withdraw-icon.png'
import ListWithdrawAwait from './ListWithdrawAwait';
import ListWithdrawAwaitMoney from './ListWithdrawAwaitMoney';
import ListWithdrawSuccess from './ListWithdrawSuccess';
import ListWithdrawCancel from './ListWithdrawCancel';
const ListWithdraw = () => {
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
                        <button className={`withdraw-btns btn-await-withdraw ${statusClick === 1 ? 'active' : ''}`} onClick={() => handleClickBtn(1)}>ລໍຖ້າການຖອນ</button>
                    </div>
                    <div >
                        <button className={`withdraw-btns btn-await-monney ${statusClick === 2 ? 'active' : ''}`} onClick={() => handleClickBtn(2)}>ລໍຖ້າເຕີມເງິນ</button>
                    </div>
                    <div>
                        <button className={`withdraw-btns btn-history ${statusClick === 3 ? 'active' : ''}`} onClick={() => handleClickBtn(3)}>ປະຫວັດການຖອນ</button>
                    </div>
                    <div >
                        <button className={`withdraw-btns btn-cancel ${statusClick === 4 ? 'active' : ''}`} onClick={() => handleClickBtn(4)}>ຍົກເລີກການຖອນ</button>
                    </div>
                    <Link to={`/withdraw/createwithdraw`} style={{textDecoration : "none"}}>
                        <div className="btn-withdraw btn-withdraw">
                            <img src={iconImg} alt="" />
                            <h3>ຖອນເງິນ</h3>
                        </div>
                    </Link>
                </div>
            </div>
            {statusClick === 1 && <ListWithdrawAwait />}
            {statusClick === 2 && <ListWithdrawAwaitMoney />}
            {statusClick === 3 && <ListWithdrawSuccess />}
            {statusClick === 4 && <ListWithdrawCancel />}

        </div>
    )
}

export default ListWithdraw

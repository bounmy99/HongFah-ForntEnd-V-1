import React from 'react'
const ModelSuccess = ({handleModalSuccess,openModalsuccess,spin,DataSuccesModal}) => {
    const {label,title,desc} = DataSuccesModal[0]
    return (
        <div className={`modal-success ${openModalsuccess}`}>
            <div className="modal-success-card Card">
                <div className="icons-success">
                    <div className="logo-check">
                        <div className={`circle ${spin}`}></div>
                    </div>
                    <h3>{label ? label : 'ໂອນສຳເລັດ'}</h3>
                </div>
                <div className="modal-success-content">
                    <h5>{title ? title : 'ໂອນຍອດໃຫ້ສະມາຊິກຈຳນວນ 80 ຄົນສຳເລັດ'}</h5>
                    <p>{desc ? desc : 'ສາມາດກວດສອບໄດ້ທີ່ປະຫວັດການໂອນ'}</p>
                </div>
                <div className="modals-success-btn">
                    <button type="button" className="modal-success-btn" onClick={handleModalSuccess}>ຕົກລົງ</button>
                </div>
            </div>
        </div>
    )
}
export default ModelSuccess

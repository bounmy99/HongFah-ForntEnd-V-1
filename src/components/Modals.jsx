import React,{useState} from 'react'

const ModelComponet = ({ handleModal, openModals, DataModal }) => {
    const { image, label, title, desc } = DataModal[0]
    return (
        <>
            <div className={`modal ${openModals}`}>
                <div className="modal-card Card">
                    <div className="icons">
                        <img src={image} alt="" />
                        <h3>{label}</h3>
                    </div>
                    <div className="modal-content">
                        <h5>{title}</h5>
                        <p>{desc}</p>
                    </div>
                    <div className="modals-btn">
                        <button type="button" className="modal-btn btn-secondary" onClick={handleModal}>ຍົກເລີກ</button>
                        <button type="button" className="modal-btn btn-info" onClick={handleModal}>ຢືນຢັນການເພີ່ມ</button>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ModelComponet

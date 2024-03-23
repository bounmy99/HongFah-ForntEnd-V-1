import React,{useState} from 'react'
import ModelSuccess from './ModalSuccess';
import { useNavigate } from 'react-router-dom';
const ModelComponet = ({TextBtn, handleModal, openModals, DataModal,setOpenModal,DataModalSuccess,Navigater }) => {
    const navigate = useNavigate()
    const { image, label, title, desc } = DataModal[0]
    const { textSuccess, textCancel} = TextBtn[0]

    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [spin,setSpin] = useState('')

    const handleModalSuccess = () => {
        setOpenSuccessModal(openSuccessModal => !openSuccessModal)
        setOpenModal(false)
        setSpin('animate')
        let check = "animate checked"
        setTimeout(()=>{
            setSpin(check)
        },3000)

        if(openSuccessModal){
            navigate(`/${Navigater}`)
        }
    }

    let openModalsuccess = openSuccessModal ? 'open' : ''

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
                        <button type="button" className="modal-btn btn-secondary" onClick={handleModal}>{textCancel ? textCancel : "ຍົກເລີກ" }</button>
                        <button type="button" className="modal-btn btn-info" onClick={handleModalSuccess}>{textSuccess ? textSuccess : "ຢືນຢັນການເພີ່ມ"}</button>
                    </div>
                </div>
            </div>

            <ModelSuccess DataSuccesModal={DataModalSuccess} handleModalSuccess={handleModalSuccess} openModalsuccess={openModalsuccess} spin={spin} />
        </>

    )
}
export default ModelComponet

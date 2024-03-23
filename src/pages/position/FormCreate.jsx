import react from 'react'
import previewIMG from "../../assets/image/upload.png"
const FormCreate = ({ handleSubmit, handleModalCancel, handleChange, setFileName, setImage, image, fileName, positionList }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-input">
                <div className="modal-position-image">
                    <label htmlFor="uploadImage">ສັນຍາຫຼັກ</label>
                    {image ? <img src={image} alt={fileName} onClick={() => document.querySelector(".input-file").click()} className="uploadImage-position" /> : <img src={previewIMG} onClick={() => document.querySelector(".input-file").click()} className="uploadImage-position" />}
                    <input type="file" name="iconFile" id="" className="input-file" hidden
                        onChange={({ target: { files } }) => {
                            files[0] && setFileName(files[0].name)
                            if (files) {
                                setImage(URL.createObjectURL(files[0]))
                            }
                        }}
                    />
                    <div className="input-group-position" style={{marginTop : '4px'}}>
                        <label htmlFor="">ເງຶອນໄຂຂຶ້ນຕຳແໜ່ງ:</label>
                        <select className="form-select-position" onChange={handleChange} name="conditionPosition">
                            <option selected disabled>ກະລຸນາເລຶອກ</option>
                            {positionList && positionList.map((item, idx) =>
                                <option value={item._id} key={idx}>{item.title}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="modal-position-input">
                    <div className="modal-position-form-group">
                        <div className="input-group-position">
                            <label htmlFor="">ຊື່ຕຳແໜ່ງ</label>
                            <input type="text" name="title" className="form-modal-control-position" onChange={handleChange} />
                        </div>
                        <div className="input-group-position">
                            <label htmlFor="">ເງື່ອນໄຂຄະແນນ</label>
                            <input type="text" name="conditionPv" className="form-modal-control-position" onChange={handleChange} />
                        </div>
                        <div className="input-group-position">
                            <label htmlFor="">ເງືອນໄຂລູກທີມ</label>
                            <input type="text"  name="conditionChildren" className="form-modal-control-position" onChange={handleChange} />
                        </div>
                        <div className="input-group-position">
                            <label htmlFor="">ລູກທີມ</label>
                            <input type="text"  name="conditionPosChildrenNumber" className="form-modal-control-position" onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-position-textarea">
                <label htmlFor="">ລາຍລະອຽດເງື່ອນໄຂ</label>
                <textarea name="details" cols="30" rows="10" onChange={handleChange}></textarea>
            </div>
            <div className="modals-position-btn">
                <button type="button" className="modal-position-btn btn-secondary" onClick={handleModalCancel}>ຍົກເລີກ</button>
                <button type="submit" className="modal-position-btn btn-info">ຢືນຢັນການເພີ່ມ</button>
            </div>
        </form>
    )
}

export default FormCreate
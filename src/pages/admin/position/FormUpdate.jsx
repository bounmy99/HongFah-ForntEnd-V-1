const FormUpdate = ({
  positionList,
  handleSubmit,
  handleModalCancel,
  handleChange,
  setFileName,
  setImage,
  image,
  fileName,
  positionEdit,
}) => {
  // console.log("positionEdit",positionEdit.conditionPromoted.source_id)
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-input">
        <div className="modal-position-image">
          <label htmlFor="uploadImage">ສັນຍາຫຼັກ</label>
          {image ? (
            <img
              src={image}
              alt={fileName}
              onClick={() => document.querySelector(".input-file").click()}
              className="uploadImage-position"
            />
          ) : (
            <img
              src={positionEdit.icon}
              onClick={() => document.querySelector(".input-file").click()}
              className="uploadImage-position"
            />
          )}
          <input
            type="file"
            name="iconFile"
            className="input-file"
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
              if (files) {
                setImage(URL.createObjectURL(files[0]));
              }
            }}
          />
          <div className="input-group-position">
            <label htmlFor="">ຕຳແໜ່ງ</label>
            <input
              type="text"
              name="source"
              value={positionEdit?.source}
              className="form-modal-control-position"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modal-position-input">
          <div className="modal-position-form-group">
            <div className="input-group-position">
              <label htmlFor="">ຊື່ຕຳແໜ່ງ</label>
              <input
                type="text"
                value={positionEdit.title}
                name="title"
                className="form-modal-control-position"
                onChange={handleChange}
              />
            </div>
            <div className="input-group-position">
              <label htmlFor="">ໂບນັດ</label>
              <input
                type="text"
                name="bonus"
                value={positionEdit.bonus}
                className="form-modal-control-position"
                onChange={handleChange}
              />
            </div>
            <div className="input-group-position">
              <label htmlFor="">ຄະແນນລວມຂອງທີມ</label>
              <input
                type="text"
                name="PVTeamForBonus"
                value={positionEdit.PVTeamForBonus}
                className="form-modal-control-position"
                onChange={handleChange}
              />
            </div>
            <div className="input-group-position">
              <label htmlFor="">ລູກຕົງ</label>
              <input
                type="text"
                name="children1StLevel"
                value={positionEdit?.children1StLevel}
                className="form-modal-control-position"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-position-textarea">
        <div className="input-group-position" style={{ marginTop: "4px" }}>
          <label htmlFor="">ເງຶອນໄຂຂຶ້ນຕຳແໜ່ງ:</label>
          <select
            className="form-select-position"
            onChange={handleChange}
            name="source_id"
          >
            <option selected disabled>
              ກະລຸນາເລຶອກ
            </option>
            {positionList &&
              positionList?.map((item, idx) => (
                <option
                  value={item?._id}
                  key={idx}
                  selected={
                    positionEdit.conditionPromoted.source_id === item?._id
                  }
                >
                  {item?.title ? item?.title : item?.packageName}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="modal-position-textarea">
        <label htmlFor="">ລາຍລະອຽດເງື່ອນໄຂ</label>
        <textarea
          name="details"
          value={positionEdit.details}
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="modals-position-btn">
        <button
          type="button"
          className="modal-position-btn btn-secondary"
          onClick={handleModalCancel}
        >
          ຍົກເລີກ
        </button>
        <button type="submit" className="modal-position-btn btn-info">
          ຢືນຢັນການແກ້ໄຂ
        </button>
      </div>
    </form>
  );
};

export default FormUpdate;

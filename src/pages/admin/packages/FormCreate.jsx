
import previewIMG from "../../../assets/image/upload.png";
const FormCreate = ({
  handleSubmit,
  handleChangeAdd,
  handleModalCancel,
  packageAdd,
  image,
  fileName,
  setImage,
  setFileName,
  final,
  BonusLevel,
  bonusPer_Level_1,
  bonusPer_Level_3,
  bonusPer_Level_5,
  PerLevel_15,
  PerLevel_35,
  PerLevel_45,

}) => {



  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-midium-card Card">
        <div className="modal-midium-edit-title">
            <h3>ເພີ່ມແພັກເກດ</h3>
  
        </div>
        <div className="modal-midium-card-contents">
          <div className="image-block">
            <div className="modal-midium-content-title">
              <div className="modal-package-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <path
                    d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z"
                    fill="url(#paint0_linear_1548_3417)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1548_3417"
                      x1="10.5134"
                      y1="-2.9888"
                      x2="9.5767"
                      y2="19.8897"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0DB3E7" />
                      <stop offset="1" stopColor="#028FCE" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="modal-midium-package-text">
                <h3>ຮູບພາບ</h3>
              </div>
            </div>
            <div className="modal-midium-content-img">
              {image ? (
                <img
                  src={image}
                  alt={fileName}
                  onClick={() => document.querySelector(".input-file").click()}
                  className="uploadImage-package"
                />
              ) : (
                <img
                  src={previewIMG}
                  onClick={() => document.querySelector(".input-file").click()}
                  className="uploadImage-package"
                />
              )}
              <input
                type="file"
                name="image"
                id=""
                className="input-file"
                hidden
                // onChange={({ target: { files } }) => {
                //   files[0] && setFileName(files[0].name);
                //   if (files) {
                //     setImage(URL.createObjectURL(files[0]));
                //   }
                // }}
                onChange={handleChangeAdd}
              />
            </div>

            <div className="modal-midium-forms-group">
              <div className="input-group">
                <label htmlFor="">ເງື່ອໄຂຮັກສາຍອດ</label>
                <input
                  type="text"
                  name="maintainSaleCondition"
                  className="form-modal-control"
                  onChange={handleChangeAdd}
                  placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                />
                <span></span>
              </div>
            </div>
            <div className="modal-midium-forms-group">
              <div className="input-group">
                <label htmlFor="">ອື່ນໆ</label>
                <input
                  type="text"
                  name="other"
                  className="form-modal-control"
                  onChange={handleChangeAdd}
                  placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                />
                <span></span>
              </div>
            </div>
          </div>

          <div className="input-block">
            <div className="modal-midium-content-title">
              <div className="modal-package-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <path
                    d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z"
                    fill="url(#paint0_linear_1548_3417)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1548_3417"
                      x1="10.5134"
                      y1="-2.9888"
                      x2="9.5767"
                      y2="19.8897"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0DB3E7" />
                      <stop offset="1" stopColor="#028FCE" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="modal-midium-package-text">
                <h3>ເງື່ອນໄຂໃນການເລື່ອນຂັນ</h3>
              </div>
            </div>
            <div className="modal-midium-input">
              <div className="modal-midium-forms-group">
                <div className="input-group">
                  <label htmlFor="">ຊື່ແພັກເກດ</label>
                  <input
                    type="text"
                    name="packageName"
                    className="form-modal-control"
                    onChange={handleChangeAdd}
                    placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                  />
                  <span></span>
                </div>
                <div className="input-group">
                  <label htmlFor="">ເງື່ອນໄຂໃນການຂື້ນຂັນ</label>
                  <input
                    type="text"
                    name="PV"
                    className="form-modal-control"
                    onChange={handleChangeAdd}
                    placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                  />
                  <span className="span-text">PV</span>
                </div>
              </div>
              <div className="modal-midium-forms-group">
                <div className="input-group">
                  <label htmlFor="">ຮັບໂບນັດແນະນຳ</label>
                  <input
                    type="text"
                    name="recommendedFee"
                    className="form-modal-control"
                    onChange={handleChangeAdd}
                    value={packageAdd.PV === "" ? "" : final ? final : ""}
                    readOnly
                     placeholder="ກະລຸນາປ້ອນຂໍ້ມູນເງຶ່ອນໄຂກ່ອນ"
                  />
                  <span className="span-text">PV</span>
                </div>

                <div className="input-group">
                  <label htmlFor="">ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ</label>
                  <input
                    type="text"
                    name="bonusLevel"
                    className="form-modal-control"
                    onChange={handleChangeAdd}
                    placeholder="1, 3, 5 ເລຶອກຊັ້ນໃດໜຶ່ງ"
                  />
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-midium-card-content">
          <div className="modal-midium-content-title">
            <div className="modal-package-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
              >
                <path
                  d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z"
                  fill="url(#paint0_linear_1548_3417)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1548_3417"
                    x1="10.5134"
                    y1="-2.9888"
                    x2="9.5767"
                    y2="19.8897"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0DB3E7" />
                    <stop offset="1" stopColor="#028FCE" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="modal-midium-package-text">
              <h3>ສິດທິພິເສດ</h3>
            </div>
          </div>
          <div className="modal-midium-input">
            <div className="modal-midium-form-group">
              <div className="input-group">
                <label htmlFor="">ຄ່າບໍລິຫານທິມ</label>
                <input
                  type="text"
                  // name="percentShare"
                  className="form-modal-control"
                  onChange={handleChangeAdd}
                  value={
                    BonusLevel === 1
                      ? PerLevel_15
                      : BonusLevel === 3
                      ? PerLevel_35
                      : BonusLevel === 5
                      ? PerLevel_45
                      : ""
                  }
                  readOnly
                  placeholder="ກະລຸນາປ້ອນຈຳນວນຊັ້ນກ່ອນ"
                />
                <span className="span-text">%</span>
              </div>
              <div className="input-group">
                <label htmlFor="">ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ</label>
                <input
                  type="text"
                  // name="bonusPerLevel"
                  className="form-modal-control"
                  onChange={handleChangeAdd}
                  value={
                    BonusLevel === 1
                      ? bonusPer_Level_1
                      : BonusLevel === 3
                      ? bonusPer_Level_3
                      : BonusLevel === 5
                      ? bonusPer_Level_5
                      : ""
                  }
                  readOnly
                  placeholder="ກະລຸນາປ້ອນຈຳນວນຊັ້ນກ່ອນ"
                />
                <span className="span-text"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="modals-midium-btn">
          <button
            type="button"
            className="modal-midium-btn btn-secondary"
            onClick={handleModalCancel}
          >
            ຍົກເລີກ
          </button>
          <button type="submit" className="modal-midium-btn btn-info">
            ຢືນຢັນການເພີ່ມ
          </button>
        </div>
      </div>
    </form>
  );
};
export default FormCreate;

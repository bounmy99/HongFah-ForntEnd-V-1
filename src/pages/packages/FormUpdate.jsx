import react from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
const FormUpdate = ({handleSubmit, handleChangeUpdate, handleModalCancel,loadingSave,packageEdit}) => {

    // const {packageName,PV,price,recommendedFee,percentShare,other} = packageEdit
    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-midium-card Card">
                <div className="modal-midium-edit-title">
                    {loadingSave
                        ?
                        <Stack sx={{ color: '#008bcb' }} spacing={2} direction="row">
                            <h3>ກຳລັງບັນທຶກຂໍ້ມູນ.......</h3><CircularProgress style={{ color: '#0EC89C' }} />
                        </Stack>
                        :
                        <h3>ແກ້ໄຂແພັກເກດ</h3>}
                </div>
                <div className="modal-midium-card-content">
                    <div className="modal-midium-content-title">
                        <div className="modal-package-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                                <path d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z" fill="url(#paint0_linear_1548_3417)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1548_3417" x1="10.5134" y1="-2.9888" x2="9.5767" y2="19.8897" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#0DB3E7" />
                                        <stop offset="1" stop-color="#028FCE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="modal-midium-package-text">
                            <h3>ເງື່ອນໄຂໃນການເລື່ອນຂັນ</h3>
                        </div>
                    </div>
                    <div className="modal-midium-input">
                        <div className="modal-midium-form-group">
                            <div className="input-group">
                                <label htmlFor="">ຊື່ແພັກເກດ</label>
                                <input type="text" name="packageName" value={packageEdit && packageEdit.packageName} className="form-modal-control" onChange={handleChangeUpdate} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="">ເງື່ອນໄຂໃນການຂື້ນຂັນ</label>
                                <input type="text" name="PV" value={packageEdit && packageEdit.PV} className="form-modal-control" onChange={handleChangeUpdate} />
                                <span className="span-text">PV</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-midium-card-content">
                    <div className="modal-midium-content-title">
                        <div className="modal-package-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                                <path d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z" fill="url(#paint0_linear_1548_3417)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1548_3417" x1="10.5134" y1="-2.9888" x2="9.5767" y2="19.8897" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#0DB3E7" />
                                        <stop offset="1" stop-color="#028FCE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="modal-midium-package-text">
                            <h3>ການຊື້ຕຳແໜ່ງ</h3>
                        </div>
                    </div>
                    <div className="modal-midium-input">
                        <div className="modal-midium-form-group">
                            <div className="input-group">
                                <label htmlFor="">ລາຄາຊື້</label>
                                <input type="text" name="price" value={packageEdit && packageEdit.price} className="form-modal-control" onChange={handleChangeUpdate} />
                                <span className="span-text">₭</span>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">ຄ່າແນະນຳ</label>
                                <input type="text" name="recommendedFee" value={packageEdit && packageEdit.recommendedFee} className="form-modal-control" onChange={handleChangeUpdate} />
                                <span className="span-text">PV</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-midium-card-content">
                    <div className="modal-midium-content-title">
                        <div className="modal-package-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                                <path d="M15.3604 1.90352L15.898 5.30519L18.9912 6.88265L17.4314 9.96707L19 13.0515L15.8803 14.6289L15.3428 18.0306L11.9147 17.493L9.47356 19.9253L7.02365 17.4578L3.62198 18.0218L3.0756 14.5937L0 13.025L1.56865 9.94063L0.00881261 6.88265L3.10204 5.28757L3.63961 1.91234L7.05009 2.47634L9.5 0L11.9411 2.44109L15.3604 1.90352ZM7.29685 5.56076C6.94626 5.56076 6.61003 5.70003 6.36213 5.94793C6.11422 6.19584 5.97495 6.53206 5.97495 6.88265C5.97495 7.23324 6.11422 7.56947 6.36213 7.81737C6.61003 8.06528 6.94626 8.20455 7.29685 8.20455C7.64743 8.20455 7.98366 8.06528 8.23156 7.81737C8.47947 7.56947 8.61874 7.23324 8.61874 6.88265C8.61874 6.53206 8.47947 6.19584 8.23156 5.94793C7.98366 5.70003 7.64743 5.56076 7.29685 5.56076ZM11.7032 11.7296C11.3526 11.7296 11.0163 11.8689 10.7684 12.1168C10.5205 12.3647 10.3813 12.7009 10.3813 13.0515C10.3813 13.4021 10.5205 13.7383 10.7684 13.9862C11.0163 14.2341 11.3526 14.3734 11.7032 14.3734C12.0537 14.3734 12.39 14.2341 12.6379 13.9862C12.8858 13.7383 13.025 13.4021 13.025 13.0515C13.025 12.7009 12.8858 12.3647 12.6379 12.1168C12.39 11.8689 12.0537 11.7296 11.7032 11.7296ZM6.33627 14.3734L13.9063 6.80334L12.6637 5.56076L5.09369 13.1308L6.33627 14.3734Z" fill="url(#paint0_linear_1548_3417)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1548_3417" x1="10.5134" y1="-2.9888" x2="9.5767" y2="19.8897" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#0DB3E7" />
                                        <stop offset="1" stop-color="#028FCE" />
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
                                <label htmlFor="">ເປີເຊັນຄ່າບໍລິຫານ</label>
                                <input type="text" name="percentShare" value={packageEdit && packageEdit.percentShare} className="form-modal-control" onChange={handleChangeUpdate} />
                                <span className="span-text">%</span>
                            </div>
                            <div className="input-group">
                                <label htmlFor="">ອື່ນໆ</label>
                                <input type="text" name="other" value={packageEdit && packageEdit.other} className="form-modal-control" onChange={handleChangeUpdate} />
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modals-midium-btn">
                    <button type="button" className="modal-midium-btn btn-secondary" onClick={handleModalCancel}>ຍົກເລີກ</button>
                    <button type="submit" className="modal-midium-btn btn-info" >ຢືນຢັນການອັບເດດ</button>
                </div>
            </div>
        </form>
    )
}
export default  FormUpdate
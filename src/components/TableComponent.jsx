import React, {useState} from 'react'
import DataTable from "react-data-table-component";
import Loadding from "./Loadding";
import DatePicker from "react-datepicker";
const TableComponent = ({ columns, customStyles, data, loading }) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="order-list-table">
                <div className="list-order-filter">
                    <div className="order-filter-date">
                        <div className="date-order">
                            <div className="datepicker-order">
                            <i className='bx bx-calendar icons-left-order'></i>
                            <span className="text-date-order">ວັນທີ</span>
                            <DatePicker className="btn-datepicker-order" selected={startDate} onChange={(date) => {
                                setStartDate(date)
                                setIsActiveDropdownFilter(false);
                            }} />
                            <i className='bx bx-chevron-down icons-right-order'></i>
                        </div>
                        </div>
                        <div className="date-order">
                        <div className="datepicker-order">
                            <i className='bx bx-calendar icons-left-order'></i>
                            <span className="text-date-order">ວັນທີ</span>
                            <DatePicker className="btn-datepicker-order" selected={startDate} onChange={(date) => {
                                setStartDate(date)
                                setIsActiveDropdownFilter(false);
                            }} />
                            <i className='bx bx-chevron-down icons-right-order'></i>
                        </div>
                        </div>
                    </div>
                    <div className="search">
                        <div className="input-search">
                            <input type="text" placeholder="ຄົ້ນຫາລາຍການສິນຄ້າ" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <circle cx="7.27273" cy="7.27273" r="6.27273" stroke="#00A5E8" stroke-width="2" />
                                <line x1="14.5858" y1="16" x2="11.6364" y2="13.0506" stroke="#00A5E8" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </div>
                        <div className="btn-search">
                            <button type="button">ຄົ້ນຫາ</button>
                        </div>
                    </div>
                </div>
                {loading

                    ? <Loadding paragraph={10}/>
                    :
                    <div className="order-table">
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            // fixedHeader
                            customStyles={customStyles}
                        />
                    </div>
                }

            </div>
        </>
    )
}

export default TableComponent

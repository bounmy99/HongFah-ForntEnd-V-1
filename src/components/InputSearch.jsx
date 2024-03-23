import React from 'react'

const InputSearch = ({ search, setSearch, arg, setArg, LoadData}) => {
    // step 3
    const handleSearch = (e) => {
        setSearch(e.target.value)
        setArg({ ...arg, search: e.target.value })
    }
    // console.log(keyword)
    return (
        <div className="input-search">
            <input type="text" value={search} onChange={handleSearch} placeholder="ຄົ້ນຫາລາຍການສິນຄ້າ" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <circle cx="7.27273" cy="7.27273" r="6.27273" stroke="#00A5E8" strokeWidth="2" />
                <line x1="14.5858" y1="16" x2="11.6364" y2="13.0506" stroke="#00A5E8" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export default InputSearch
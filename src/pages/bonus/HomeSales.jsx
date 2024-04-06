import React, { useState, useEffect } from 'react'
import HistoryTransfer from './HistoryTransfer';
import ListTotalSales from './ListTotalSales';
const HomeSales = () => {
  const [chagePage, setChagePage] = useState(false);
  useEffect(() => {
    setChagePage(1);
  }, [])

  const handleChangePage = (e) => {
    setChagePage(e)
  }

  return (
    <div className="card-main">
      <div class="orders-button">
        
              <>
                <button type="button" class={`btn-order  ${chagePage === 1 ? 'btn-warning' : 'btn-secondary'}`} onClick={() => handleChangePage(1)}>ລາຍຊື່ທີ່ໄດ້ຮັບໂບນັດ</button>
                <button type="button" class={`btn-order  ${chagePage === 2 ? 'btn-info' : 'btn-secondary'}`} onClick={() => handleChangePage(2)}>ປະຫວັດ</button>
              </>
          

      </div>

      {chagePage === 1 && <ListTotalSales /> }
      {chagePage === 2 && <HistoryTransfer />}

    </div>
  )
}

export default HomeSales

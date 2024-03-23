import React from 'react'
import DataTable from "react-data-table-component";
const TableTotalSale = ({columns,OrderList,customStyles,setSelectableRow,setStatusClick}) => {
  return (
    <DataTable
        columns={columns}
        data={OrderList}
        pagination
        customStyles={customStyles}
        selectableRows
        onSelectedRowsChange={(row)=>{
          setSelectableRow(row.selectedRows)
          setStatusClick(statusClick=>!statusClick)
        }}
    />
  )
}

export default TableTotalSale
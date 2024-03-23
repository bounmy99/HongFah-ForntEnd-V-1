import React from 'react'
import DataTable from "react-data-table-component";
const DataTables = ({columns,data,customStyles}) => {
  return (
    <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
    />
  )
}

export default DataTables
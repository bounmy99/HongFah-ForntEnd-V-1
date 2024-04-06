import React from 'react'
import { Table } from 'antd'
const TableAntd = ({columns,dataSource}) => {
  return (
    <div>
        <Table columns={columns} dataSource = {dataSource} />
    </div>
  )
}

export default TableAntd

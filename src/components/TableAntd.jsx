import React from 'react'
import { Table } from 'antd'
const TableAntd = ({columns,dataSource, loading}) => {
  return (
    <div>
        <Table columns={columns} dataSource = {dataSource} loading={loading} />
    </div>
  )
}

export default TableAntd

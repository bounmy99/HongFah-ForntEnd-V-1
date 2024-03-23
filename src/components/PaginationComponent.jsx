import React from 'react'
import { Pagination } from 'antd';
const PaginationComponent = ({count,pageSize,setPages,pages,setPageSize}) => {
  const onShowSizeChange = (current,pageSize)=>{
    setPageSize(pageSize)
  }
  const itemRender = (current,type, originalElement)=>{
    if(type === "prev"){
      return <a><i className='bx bx-chevrons-left'></i></a>
    }
    if(type === "next"){
      return <a><i className='bx bx-chevrons-right'></i></a>
    }

    return originalElement
  }
  return (
    <div>
         <div className="pagination">
              <Pagination
                current={pages}
                total={count}
                pageSize={pageSize}
                // showSizeChanger
                // showQuickJumper
                onShowSizeChange={onShowSizeChange}
                itemRender={itemRender}
                onChange={(value)=>setPages(value)}
              />
            </div>
    </div>
  )
}

export default PaginationComponent

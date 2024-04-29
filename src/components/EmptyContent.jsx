import React from 'react'
import { Empty } from 'antd'
const EmptyContent = ({Messages}) => {
  return (
    <>
      <div className="empty-card">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <a>{Messages}</a>
              </span>
            }
          >
          </Empty>
        </div>
    </>
  )
}

export default EmptyContent

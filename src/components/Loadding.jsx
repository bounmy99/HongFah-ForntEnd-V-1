import React from 'react';
import { Skeleton } from 'antd';
const Loading = ({paragraph}) => (
  <Skeleton
    active
    style={{marginTop : 15}}
    paragraph={{
      rows: paragraph,
    }}
  />
);
export default Loading;
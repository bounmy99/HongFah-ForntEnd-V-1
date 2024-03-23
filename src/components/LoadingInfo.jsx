import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Skeleton } from 'antd';

const LoadingInfo = ({count}) => {
    const cards = ()=>{
        let Total = []

        for(let i = 0; i < count; i++){
            Total.push(
                <Skeleton  active avatar />
            )
        }
        return Total
    }


  return (
    <>
        {cards()}    
    </>
  );
};
export default LoadingInfo;
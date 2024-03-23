import React from 'react'
import { Skeleton } from 'antd'
const LoadingCard = ({count,styles}) => {

    const cards = ()=>{
        let TotalCards = []

        for(let i = 0 ; i < count ; i++){
            TotalCards.push(
                <Skeleton.Image active style={styles} />
            )
        }
        return TotalCards
    }
  return (
    <div>
        {cards()}
    </div>
  )
}

export default LoadingCard
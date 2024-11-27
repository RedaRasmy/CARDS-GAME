import React, { ReactNode } from 'react'

export default function GameContainer({children}:{
    children:ReactNode
}) {
    return (
        <div className='game-grid w-full h-full'>
            {children}
        </div>
    )
}

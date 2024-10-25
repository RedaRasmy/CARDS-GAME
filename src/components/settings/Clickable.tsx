import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import React, { ReactNode, use } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const {playWithClick} = useCard()

    const handleClick = () => {
        if (isClickable) {
            playWithClick(id)
        }
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

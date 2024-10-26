import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import { ReactNode } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const {playWithClick,BotPlay} = useCard()

    const handleClick = () => {
        if (isClickable) {
            const isPlayed = playWithClick(id)
            if (isPlayed && (id%10 !== 9)) { // if skip card
                BotPlay(id)
            } 
            
        }
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

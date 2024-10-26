import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import { ReactNode } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const {playWithClick,BotPlay,playerTurn} = useCard()

    if(!playerTurn && (id%10 !== 9)) {
        BotPlay(id)
    }
    const handleClick = () => {
        if (isClickable && playerTurn) {
            playWithClick(id)
        }
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

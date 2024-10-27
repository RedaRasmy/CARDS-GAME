import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import { ReactNode } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const playerTurn = useAppSelector(state=>state.gameFlow.playerTurn)
    const {playWithClick,BotPlay,requirementsValue} = useCard()


    if(!playerTurn) {
        BotPlay(requirementsValue)
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

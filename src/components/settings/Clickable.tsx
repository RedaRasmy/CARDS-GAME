import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import { ReactNode } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const playerTurn = useAppSelector(state=>state.gameFlow.playerTurn)
    const {playWithClick,BotPlay,requirementsValue} = useCard()
    const modalOpen = useAppSelector(state=>state.gameFlow.modalOpen)

    if(!playerTurn) {
        const isBlock = BotPlay(requirementsValue)
        if (isBlock){
            BotPlay([requirementsValue[0]])
        }
    }
    const handleClick = () => {
        if (isClickable && playerTurn && !modalOpen) {
            playWithClick(id)
        }
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

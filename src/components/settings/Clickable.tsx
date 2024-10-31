import useBot from '@/library/Hooks/useBot'
import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import { ReactNode } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const playerTurn = useAppSelector(state=>state.gameFlow.playerTurn)
    const {playWithClick,requirementsValue} = useCard()
    const {modalOpen,gameIsOn} = useAppSelector(state=>state.gameFlow)
    const {BotPlay} = useBot('easy')

    if(!playerTurn) {
        const isBlock = BotPlay(requirementsValue)
        if (isBlock){
            BotPlay([requirementsValue[0]])
        }
        // BotPlay(requirementsValue)
    }
    const handleClick = () => {
        if (isClickable && gameIsOn && playerTurn && !modalOpen) {
            playWithClick(id)
        }
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

import useCard from '@/library/Hooks/useCard'
import { useAppSelector } from '@/library/redux/store'
import { ReactNode } from 'react'

export default function Clickable({children,id}:{children:ReactNode,id:number}) {
    const isClickable = useAppSelector(state=>state.settings.clicking)
    const {playWithClick,BotPlay} = useCard()

    const handleClick = () => {
        if (isClickable) {
            playWithClick(id)
            BotPlay()
        }
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

import  { useEffect, useState } from 'react'
import useCard from './useCard'
import { useAppDispatch } from '../redux/store'
import { gameOff } from '../redux/slices/gameFlow'
import getMin from '../functions/getMin'

export default function useWinOrLose() {
    const dispatch = useAppDispatch()
    const [win,setWin] = useState(false)
    const [lose,setLose] = useState(false)
    const [isVisible, setIsVisible] = useState(true);


    const {hands,cardsLeft} = useCard()
    const [min,] = getMin(hands)

    useEffect(()=>{
        if(cardsLeft.length===0){
            if(hands[0].length > min){
                setLose(true)
            }else{
                setWin(true)
            }
            dispatch(gameOff())
            console.log('game toggled')
        }
        if(hands[0].length === 0 ){
            setWin(true)
            dispatch(gameOff())
            console.log('game toggled')
        }
        if((min === 0) && (hands[0].length !== 0) ){
            setLose(true)
            dispatch(gameOff())
            console.log('game toggled')
        }
    },[hands,cardsLeft])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (win || lose) {
                setIsVisible(false);
            }
        }, 2000); // 2000ms = 2 seconds
        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [lose,win]);
    return {
        win,
        lose,
        isVisible
    }
}

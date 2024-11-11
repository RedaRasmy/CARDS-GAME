
import { useAppDispatch, useAppSelector} from '../store'
import { redistribute } from './cardsFlow'
import { clearHistory, toggleGame } from './gameFlow'

export default function useGame() {
    const {gameIsOn} = useAppSelector(state=>state.gameFlow)
    const dispatch = useAppDispatch()

    function quitGame() {
        if (gameIsOn) {
            dispatch(toggleGame())
            dispatch(clearHistory())
            dispatch(redistribute())
        }
    }
    return {
        gameIsOn,
        quitGame,
    }
}


import { useAppDispatch, useAppSelector} from '../store'
import { toggleGame } from './gameFlow'

export default function useGame() {
    const {gameIsOn} = useAppSelector(state=>state.gameFlow)
    const dispatch = useAppDispatch()

    function quitGame() {
        if (gameIsOn) {
            dispatch(toggleGame())
        }
    }
    return {
        gameIsOn,
        quitGame,
    }
}

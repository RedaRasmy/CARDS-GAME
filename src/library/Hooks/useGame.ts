import { useAppDispatch, useAppSelector } from "../redux/store";
import { redistribute } from "../redux/slices/cardsFlow";
import { changeDiff, changePlayersNumber, clearHistory, PlayersNumber, setIsPreGame, toggleGame } from "../redux/slices/gameFlow";
import { Difficulty } from "../functions/bot";

export default function useGame() {
    const dispatch = useAppDispatch();
    const { gameIsOn,difficulty,isPreGame,playersNumber} = useAppSelector((state) => state.gameFlow);

    function changeDifficulty(diff:Difficulty) {
        dispatch(changeDiff(diff))
    }
    const midlePlayerCondition = (playersNumber === 2 || playersNumber ===4)
    const cornersPlayersCondition = (playersNumber !== 2)
    function changePlayers(number:PlayersNumber){
        dispatch(changePlayersNumber(number))
    }
    function quitGame() {
        if (gameIsOn) {
            dispatch(toggleGame());
            dispatch(clearHistory());
            dispatch(redistribute());
            changePreGameTo(true)
        }
    }
    function startGame() {
        if (!gameIsOn) {
            dispatch(toggleGame());
            dispatch(clearHistory());
            changePreGameTo(false)
        }
    }
    function changePreGameTo(bool:boolean){
        dispatch(setIsPreGame(bool))
    }
    return {
        difficulty,
        gameIsOn,
        quitGame,
        changeDifficulty,
        startGame,
        changePlayers,
        isPreGame,
        changePreGameTo,
        playersNumber,
        midlePlayerCondition,
        cornersPlayersCondition
    };
}
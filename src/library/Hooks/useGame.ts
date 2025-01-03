import { useAppDispatch, useAppSelector } from "../redux/store";
import { changePlayersNumber2, redistribute } from "../redux/slices/cardsFlow";
import { changeDiff, changePlayersNumber, clearHistory, PlayersNumber, resetCurrentPlayer, setIsPreGame, gameOn , gameOff, toggleModal } from "../redux/slices/gameFlow";
import { Difficulty } from "../functions/bot";

export default function useGame() {
    const dispatch = useAppDispatch();
    const { 
        gameIsOn,
        difficulty,
        isPreGame,
        playersNumber,
        modalOpen
    } = useAppSelector((state) => state.gameFlow);

    function changeDifficulty(diff:Difficulty) {
        dispatch(changeDiff(diff))
    }
    const midlePlayerCondition = (playersNumber === 2 || playersNumber ===4)
    const cornersPlayersCondition = (playersNumber !== 2)
    function changePlayers(number:PlayersNumber){
        dispatch(changePlayersNumber(number))
        dispatch(changePlayersNumber2(number))
    }
    function quitGame() {
        if (gameIsOn) {
            dispatch(gameOff());
            dispatch(clearHistory());
            dispatch(redistribute());
            changePreGameTo(true)
        }
    }
    function startGame() {
        if (!gameIsOn) {
            dispatch(redistribute())
            dispatch(gameOn());
            dispatch(clearHistory());
            changePreGameTo(false)
            console.log('game started')
        }
    }
    const restart = ()=>{
        dispatch(redistribute())
        dispatch(gameOn())
        dispatch(clearHistory())
        dispatch(resetCurrentPlayer())
        console.log('game resarted')
    }
    function changePreGameTo(bool:boolean){
        dispatch(setIsPreGame(bool))
    }
    function toggleModalShortcut(){
        dispatch(toggleModal())
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
        cornersPlayersCondition,
        modalOpen,
        toggleModalShortcut,
        restart
    };
}

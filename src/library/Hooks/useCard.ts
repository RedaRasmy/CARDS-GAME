import { useAppDispatch,useAppSelector } from "../redux/store"
import randomIdFrom from "../functions/randomIdFrom"
import isIdentical from "../functions/isIdentical"
import { addCard, removeCard,changeCurrentCard,takeCard, changeRequirements, } from "../redux/slices/cardsFlow"
import { addTurn, finishTurn, toggleModal } from "../redux/slices/gameFlow"
import requirements from "../functions/requirements"
import capitalize from "../functions/capitalize"
import { playSound } from "../functions/playSounds"
import { useEffect, useState } from "react"

export default function useCard() {
    const dispatch = useAppDispatch()
    const cardsFlow = useAppSelector((state)=>state.cardsFlow)
    // const {sorting,dragging} = useAppSelector(state=>state.settings)
    const {currentPlayer,gameIsOn} = useAppSelector(state=>state.gameFlow)
    ///
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const currentCardId = cardsFlow.currentCardId
    const cardsLeft = cardsFlow.cardsLeft
    const hands = cardsFlow.hands
    const requirementsValue = cardsFlow.requirements
    const goodCards:number[] = []
    for(const card of hands[0]) {
        if (isIdentical(card,requirementsValue)){
            goodCards.push(card)
        }
    }

    /// FUNCTIONS
    function chooseColor(color:string){
        dispatch(changeRequirements([capitalize(color)]))
        dispatch(finishTurn())
    }

    function playWithClick(id:number){
        if (!gameIsOn) return;
        if(isIdentical(id,requirementsValue) && (currentPlayer === 0)){
            playSound('/sounds/playCardSound.wav')
            // save turn's data
            dispatch(addTurn({
                player: 0,
                action: '-Card',
                cardId: id,
            }))
            if (id % 10 !== 8) {
                dispatch(changeCurrentCard(id))
                dispatch(changeRequirements(requirements(id)))
                dispatch(removeCard({cardId:id,playerId:0}))
                // +3 Card
                if (id % 10 === 7){
                    Add3CardsTo(1)
                }
                if (id % 10 === 9) { // if BLOCK card (dont finish turn)
                    dispatch(finishTurn())
                }
                dispatch(finishTurn())
            }
            else { // if JUDGE card
                dispatch(removeCard({cardId:id,playerId:0}))
                dispatch(changeCurrentCard(id))
                if (hands[0].length > 1 ){
                    dispatch(toggleModal())
                    setModalIsOpen(true)
                }else {
                    dispatch(changeRequirements(requirements(id)))
                }
            }
        }
    }
    
    useEffect(()=>{
        if (!gameIsOn) return;
        const timer = setTimeout(()=>{
            if (modalIsOpen) {
                dispatch(toggleModal())
                dispatch(changeRequirements(requirements(currentCardId)))
            } else {
                playerTakeCard()
                console.log('card taked by time')
            }
        },10000)
        return () => clearTimeout(timer);
    },[currentPlayer,gameIsOn,currentCardId,dispatch,modalIsOpen,])

    function Add3CardsTo(playerId:number){
        const cardsToAdd = randomIdFrom(cardsLeft,3) as number[]
        for (let i=0 ; i<3 ; i++) {
            dispatch(takeCard(cardsToAdd[i]))
            dispatch(addCard({cardId:cardsToAdd[i],playerId:playerId}))
        }
    }
    function playerTakeCard(){
        if (!gameIsOn) return;
        if ((cardsLeft.length > 0) && (currentPlayer ===0)) {
            const randomId = randomIdFrom(cardsLeft) as number
            playSound('/sounds/takeCardSound.wav')
            dispatch(addCard({cardId:randomId,playerId:0}))
            dispatch(takeCard(randomId))
            dispatch(finishTurn())
            // save turn's data
            dispatch(addTurn({
                player: 0,
                action: '+Card',
                cardId: randomId,
            }))
            return randomId
        }
        return null
    }

    return {
        // infos
            cardsLeft,
            hands,
            currentCardId,
            requirementsValue,
            currentPlayer,
            goodCards,
        // functions
            Add3CardsTo,
            playerTakeCard,
            playWithClick,
            // handleDragEnd,
            chooseColor,
    }
}
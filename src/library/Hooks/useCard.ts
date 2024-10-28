'use client'
import { useAppDispatch,useAppSelector } from "../redux/store"
import randomIdFrom from "../functions/randomIdFrom"
import isIdentical from "../functions/isIdentical"
import { addCard, removeCard,changeCurrentCard,takeCard, changeCardOrder, changeRequirements, } from "../redux/slices/cardsFlow"
import { toggleModal, toggleTurn } from "../redux/slices/gameFlow"
import { DragEndEvent } from "@dnd-kit/core"
import requirements, { Requirements } from "../functions/requirements"
import capitalize from "../functions/capitalize"

export default function useCard() {
    const dispatch = useAppDispatch()
    const cardsFlow = useAppSelector((state)=>state.cardsFlow)
    const currentCardId = cardsFlow.currentCardId
    const cardsLeft = cardsFlow.cardsLeft
    const playerCards = cardsFlow.playerCards
    const botCards = cardsFlow.botCards
    const requirementsValue = cardsFlow.requirements
    const isSortable = useAppSelector(state=>state.settings.sorting)
    const playerTurn = useAppSelector(state=>state.gameFlow.playerTurn)

    //// FUNCTIONS
    function chooseColor(color:string){
        dispatch(changeRequirements([capitalize(color)]))
        dispatch(toggleTurn())
        }
    
    function BotPlay(requ:Requirements){
        for (const card of botCards){
            if (isIdentical(card,requ)){
                dispatch(changeCurrentCard(card))
                console.log('requirements :',requirementsValue)
                dispatch(changeRequirements(requirements(card)))
                dispatch(removeCard({cardId:card,player:'bot'}))
                // +3 Card
                if (card%10 === 7){
                    Add3CardsTo("player")
                }
                // Judge Card 
                else if (card%10 === 8){
                    // for now Just Random
                    const randomColor = ['Yellow',"Blue",'Red',"Green"][Math.floor(Math.random()*4)] 
                    dispatch(changeRequirements([randomColor]))
                }
                // skip Card
                if (card % 10 === 9) {
                    return true
                }
                dispatch(toggleTurn())
                return;
            }
        }
        const randomId = randomIdFrom(cardsLeft) as number
        dispatch(takeCard(randomId))
        dispatch(addCard({cardId:randomId,player:'bot'}))
        dispatch(toggleTurn())
    }

    function playWithClick(id:number){
        if(isIdentical(id,requirementsValue)){
            if (id % 10 !== 8) {
                dispatch(changeCurrentCard(id))
                console.log('requirements :',requirementsValue)
                dispatch(changeRequirements(requirements(id)))
                dispatch(removeCard({cardId:id,player:'player'}))
                // +3 Card
                if (id % 10 === 7){
                    Add3CardsTo("bot")
                }
                if (id % 10 === 9) { // if BLOCK card (dont toggle turn)
                    return;
                }
                dispatch(toggleTurn())
            }
            else { // if JUDGE card
                dispatch(removeCard({cardId:id,player:'player'}))
                dispatch(changeCurrentCard(id))
                dispatch(toggleModal())
            }
        }
    }

    function Add3CardsTo(name:('player'|'bot')){
        const cardsToAdd = randomIdFrom(cardsLeft,3) as number[]
        dispatch(takeCard(cardsToAdd[0]))
        dispatch(addCard({cardId:cardsToAdd[0],player:name}))
        dispatch(takeCard(cardsToAdd[1]))
        dispatch(addCard({cardId:cardsToAdd[1],player:name}))
        dispatch(takeCard(cardsToAdd[2]))
        dispatch(addCard({cardId:cardsToAdd[2],player:name}))
    }
    
    function playerTakeCard(){
        const randomId = randomIdFrom(cardsLeft) as number
        if (cardsLeft.length>0) {
            dispatch(addCard({cardId:randomId,player:'player'}))
            dispatch(takeCard(randomId))
            dispatch(toggleTurn())
        }
    }
    const getCardIndex = (id:number) => playerCards.findIndex(cardId=> cardId === id)

    const handleDragEnd = (event:DragEndEvent)=>{
        // Sorting Logic
        const {active,over} = event
        const i1 = getCardIndex(Number(active.id))
        const i2 = getCardIndex(Number(over?.id))
        
        if (isSortable && (active.id !== over?.id)){
            dispatch(changeCardOrder({index1:i1,index2:i2}))
        }
        // Dropping Logic
        if (over && (over.id === 'droppable')){
            // Test
            const cardIdToTest = Number(active.id)
            if(isIdentical(cardIdToTest,requirementsValue)){
                dispatch(changeCurrentCard(cardIdToTest))
                dispatch(removeCard({cardId:cardIdToTest,player:'player'}))
                // BotPlay()
            }
        }
    }
    return {
        // infos
            cardsLeft,
            playerCards,
            botCards,
            currentCardId,
            requirementsValue,
            playerTurn,
        // functions
            playerTakeCard,
            playWithClick,
            BotPlay,
            handleDragEnd,
            chooseColor
    }
}
'use client'
import { useAppDispatch,useAppSelector } from "../redux/store"
import randomIdFrom from "../functions/randomIdFrom"
import isIdentical from "../functions/isIdentical"
import { addCard, removeCard,changeCurrentCard,takeCard, changeCardOrder, changeRequirements, } from "../redux/slices/cardsFlow"
import { addTurn, toggleModal, toggleTurn } from "../redux/slices/gameFlow"
import { DragEndEvent } from "@dnd-kit/core"
import requirements from "../functions/requirements"
import capitalize from "../functions/capitalize"
import { useState } from "react"

export default function useCard() {
    // const gameIsOn = useAppSelector(state=>state.gameFlow.gameIsOn)
    const dispatch = useAppDispatch()
    const cardsFlow = useAppSelector((state)=>state.cardsFlow)
    const currentCardId = cardsFlow.currentCardId
    const cardsLeft = cardsFlow.cardsLeft
    const playerCards = cardsFlow.playerCards
    const botCards = cardsFlow.botCards
    const requirementsValue = cardsFlow.requirements
    const {sorting,dragging} = useAppSelector(state=>state.settings)
    const playerTurn = useAppSelector(state=>state.gameFlow.playerTurn)
    const [scrollIntoView,setscrollIntoView] = useState(false)
    const goodCards:number[] = []
    for(const card of playerCards) {
        if (isIdentical(card,requirementsValue)){
            goodCards.push(card)
        }
    }

    //// FUNCTIONS
    function chooseColor(color:string){
        dispatch(changeRequirements([capitalize(color)]))
        dispatch(toggleTurn())
        }
    

    function playWithClick(id:number){
        if(isIdentical(id,requirementsValue)){
            // save turn's data
            dispatch(addTurn({
                player: 'player',
                action: '-Card',
                cardId: id,
            }))
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
                if (playerCards.length >1){
                    dispatch(toggleModal())
                }else {
                    dispatch(changeRequirements(requirements(id)))
                }
            }
        }
    }

    function Add3CardsTo(name:('player'|'bot')){
        const cardsToAdd = randomIdFrom(cardsLeft,3) as number[]
        for (let i=0 ; i<3 ; i++) {
            dispatch(takeCard(cardsToAdd[i]))
            dispatch(addCard({cardId:cardsToAdd[i],player:name}))
        }
    }
    // function handleTakeCard(){
    //     dispatch(startTakeCard(true))
    // }
    function playerTakeCard(){
        const randomId = randomIdFrom(cardsLeft) as number
        if (cardsLeft.length>0) {
            setscrollIntoView(true)
            dispatch(addCard({cardId:randomId,player:'player'}))
            dispatch(takeCard(randomId))
            dispatch(toggleTurn())
            // save turn's data
            dispatch(addTurn({
                player: 'player',
                action: '+Card',
                cardId: randomId,
            }))
        }
    }
    const getCardIndex = (id:number) => playerCards.findIndex(cardId=> cardId === id)

    const handleDragEnd = (event:DragEndEvent)=>{
        // Sorting Logic
        const {active,over} = event
        const i1 = getCardIndex(Number(active.id))
        const i2 = getCardIndex(Number(over?.id))
        
        if (sorting && (active.id !== over?.id)){
            dispatch(changeCardOrder({index1:i1,index2:i2}))
        }
        // Dropping Logic
        if (over && dragging && (over.id === 'droppable')){
            // Test
            const id = Number(active.id)
            if(isIdentical(id,requirementsValue)){
                // save turn's data
                dispatch(addTurn({
                    player: 'player',
                    action: '-Card',
                    cardId: id,
                }))
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
                    if (playerCards.length >1){
                        dispatch(toggleModal())
                    }else {
                        dispatch(changeRequirements(requirements(id)))
                    }
                }
            }
        }
    }


    return {
        // infos
            scrollIntoView,
            cardsLeft,
            playerCards,
            botCards,
            currentCardId,
            requirementsValue,
            playerTurn,
            goodCards,
        // functions
            Add3CardsTo,
            playerTakeCard,
            playWithClick,
            handleDragEnd,
            chooseColor
    }
}
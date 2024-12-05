import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import startTheGame from "../../functions/startTheGame";
import { arrayMove } from "@dnd-kit/sortable";
import requirements, { Requirements } from "@/library/functions/requirements";
import { PlayersNumber } from "./gameFlow";



const { initialCurrentCard, initialCardsLeft } = startTheGame();

const cardsFlow = createSlice({
    name: "cardsFlow",
    initialState: {
        currentCardId: initialCurrentCard,
        requirements: requirements(initialCurrentCard),
        hands: [] as number[][],
        cardsLeft: initialCardsLeft,
        playersNumber: 2 as PlayersNumber,
    },
    reducers: {
        changePlayersNumber2: (state, action: PayloadAction<PlayersNumber>) => {
        return {
            ...state,
            playersNumber: action.payload,
        };
        },
        redistribute: (state) => {
        const { initialCurrentCard, hands, initialCardsLeft } = startTheGame(
            state.playersNumber
        );
        return {
            ...state,
            currentCardId: initialCurrentCard,
            requirements: requirements(initialCurrentCard),
            hands: hands,
            cardsLeft: initialCardsLeft,
        };
        },
        takeCard: (state, action: PayloadAction<number>) => {
        const newCards = state.cardsLeft.filter((id) => id !== action.payload);
        return {
            ...state,
            cardsLeft: newCards,
        };
        },
        changeCurrentCard: (state, action: PayloadAction<number>) => {
        return {
            ...state,
            cardsLeft: [...state.cardsLeft, state.currentCardId],
            currentCardId: action.payload,
            // requirements:requirements(action.payload),
        };
        },
        changeRequirements: (state, action: PayloadAction<Requirements>) => {
        return {
            ...state,
            requirements: action.payload,
        };
        },
        addCard: (
            state,
            action: PayloadAction<{ cardId: number; playerId: number }>
            ) => {
            const { cardId, playerId } = action.payload;
            // const newHand = [...state.hands[playerId], cardId];
            if (state.hands[playerId]) {
                state.hands[playerId].push(cardId);
            }
        },
        removeCard: (
            state,
            action: PayloadAction<{ cardId: number; playerId: number }>
            ) => {
            const { cardId, playerId } = action.payload;
            const newHand = state.hands[playerId].filter((id) => id !== cardId)
            if (state.hands[playerId]) {
                state.hands[playerId] = newHand
            }
        },
        changeCardOrder: (
        state,
        action: PayloadAction<{ index1: number; index2: number }>
        ) => {
        return {
            ...state,
            playerCards: arrayMove(
                state.hands[0],
                action.payload.index1,
                action.payload.index2
            ),
        };
        },
    },
});

export const {
    changeRequirements,
    redistribute,
    takeCard,
    changeCurrentCard,
    addCard,
    removeCard,
    changeCardOrder,
    changePlayersNumber2,
} = cardsFlow.actions;

export default cardsFlow.reducer;

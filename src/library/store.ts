import { configureStore } from "@reduxjs/toolkit";
import currentCardIdSlice from "./slices/currentCardIdSlice"
import playerCardsSlice from "./slices/playerCardsSlice"
import cardsLeftSlice from "./slices/cardsLeftSlice"

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        currentCardId : currentCardIdSlice,
        playerCards:playerCardsSlice,
        cardsLeft:cardsLeftSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: ()=>typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
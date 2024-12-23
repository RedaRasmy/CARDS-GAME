import { configureStore } from "@reduxjs/toolkit";
import cardsFlow from "./slices/cardsFlow"
import settings from './slices/settings'
import gameFlow from './slices/gameFlow'
import animations from './slices/animations'
import userInfos from './slices/animations'

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";



export const store = configureStore({
    reducer: {
        cardsFlow,
        settings,
        gameFlow,
        animations,
        userInfos
    }
})


export const useAppDispatch: ()=>typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
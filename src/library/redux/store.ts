import { configureStore } from "@reduxjs/toolkit";
import cardsFlow from "./slices/cardsFlow"
import settings from './slices/settings'
import gameFlow from './slices/gameFlow'
import userInfos from './slices/userInfos'

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        cardsFlow,
        settings,
        gameFlow,
        userInfos
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: ()=>typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
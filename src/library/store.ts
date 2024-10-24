import { configureStore } from "@reduxjs/toolkit";
import cardsFlow from "./slices/cardsFlow"

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        cardsFlow:cardsFlow
    }
})


export const useAppDispatch: ()=>typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
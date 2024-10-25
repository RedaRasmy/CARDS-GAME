'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/redux/store";
import GameField from "@/components/GameField";
import { useState } from "react";
import useCard from "@/library/Hooks/useCard";


export default function Home() {


    return (
        <div className="flex flex-col justify-around items-center h-full">

            <Provider store={store}>
                    <SettingsButton/>
                    <GameField/>
            </Provider>
        </div>
    );
}

export function StartButton({handleClick}:{handleClick:()=>void}) {
    return (
        <button 
        onClick={handleClick}
        className="bg-red-900 px-5 py-3 rounded-md">
            START
        </button>
    )
}
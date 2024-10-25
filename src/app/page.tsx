'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/store";
import GameField from "@/components/GameField";
import { useState } from "react";


export default function Home() {
    const [started,setStarted] = useState(false)
    return (
        <div className="flex flex-col justify-around items-center h-full">
            <SettingsButton/>
            <Provider store={store}>
                    {started? <GameField/> : <StartButton handleClick={()=>{setStarted(true)}}/>}
            </Provider>
        </div>
    );
}

function StartButton({handleClick}:{handleClick:()=>void}) {
    return (
        <button 
        onClick={handleClick}
        className="bg-red-900 px-5 py-3 rounded-md">
            START
        </button>
    )
}
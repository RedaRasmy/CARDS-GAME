'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/store";
import GameField from "@/components/GameField";


export default function Home() {
    return (
        <div className="flex flex-col justify-around items-center h-full">
            <SettingsButton/>
            <Provider store={store} >
                <GameField/>
            </Provider>
        </div>
    );
}

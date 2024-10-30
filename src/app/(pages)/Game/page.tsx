'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/redux/store";
import GameField from "@/components/GameField";
import GameBackground from "@/components/backgrounds/gameBackground";

export default function page() {

    return (
        // <DndContext>
            <GameBackground>
                <div className="flex flex-col justify-around items-center h-full z-10 overflow-hidden">    
                    <Provider store={store}>
                            <SettingsButton/>
                            <GameField/>
                    </Provider>
                </div>
            </GameBackground>
        // </DndContext>
    )
}

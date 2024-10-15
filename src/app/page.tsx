'use client'
import Board from "@/components/Board";
// import Card from "@/components/Card";
import SettingsButton from "@/components/settings/SettingsButton";


export default function Home() {
    return (
        <div className="flex justify-center items-center h-full">
            <SettingsButton/>
            <Board/>
            {/* <Card number={6} type="Flag"/> */}
        </div>
    );
}

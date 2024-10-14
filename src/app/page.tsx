'use client'
import Card from "@/components/Card";
import SettingsButton from "@/components/SettingsButton";


export default function Home() {
    return (
        <div className="flex justify-center items-center h-full">
            <SettingsButton/>
            <Card number={6} type="Money"/>
        </div>
    );
}

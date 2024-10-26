import React from 'react'

type SettingsOptionProps = {
    label:string,
    onToggle:()=>void,
    defaultValue:boolean
}
export default function SettingsToggle({label,onToggle,defaultValue}:SettingsOptionProps) {
    return (
        <div>
            <label className="label cursor-pointer">
                <span className="label-text text-[18px] mr-3">{label}</span>
                <input type="checkbox" className="toggle toggle-success " checked={defaultValue} onChange={onToggle}/>
            </label>
        </div>
    )
}

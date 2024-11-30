import { ReactNode } from 'react';
import { useDraggable} from '@dnd-kit/core';
import { useAppSelector } from '../redux/store';
import {CSS} from '@dnd-kit/utilities';

export default function Draggable({children,id}:{children:ReactNode,id:number}) {
    // implement settings (create useSettings)
    const {dragging} = useAppSelector(state=>state.settings)
    const {attributes, listeners, setNodeRef, transform,isDragging,over} = useDraggable({
        id,
    });
    const style = transform && dragging ? {
        // transform: `translate3d(${transform.x}px, ${transform.y}px,0 ) ${over?.rect ? 'scale(1)' :undefined}`,
        transform:CSS.Translate.toString(transform)
        // opacity:isDragging ? 0 : 1
    } : undefined;
    
    return (
        <div className='' ref={setNodeRef} style={style} {...listeners} {...attributes} >
            {children}
        </div>
    );
}

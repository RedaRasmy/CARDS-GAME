import { ReactNode } from 'react';
import {useDraggable} from '@dnd-kit/core';

export default function Draggable({children,id}:{children:ReactNode,id:number}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} >
            {children}
        </div>
    );
}

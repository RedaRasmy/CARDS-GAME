import { ReactNode } from 'react';
import { useDraggable} from '@dnd-kit/core';
import { useAppSelector } from '../redux/store';

export default function Draggable({children,id}:{children:ReactNode,id:number}) {
    // implement settings (create useSettings)
    const {dragging} = useAppSelector(state=>state.settings)
    const {attributes, listeners, setNodeRef, transform,isDragging,over} = useDraggable({
        id,
    });
    const style = transform && dragging ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) ${over?.rect ? 'scale(2)' :undefined}`,
        opacity:isDragging ? 0 : 1
    } : undefined;
    
    return (
        <div className='touch-manipulation' ref={setNodeRef} style={style} {...listeners} {...attributes} >
            {children}
        </div>

    );
}

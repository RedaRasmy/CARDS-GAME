import  {ReactNode } from 'react';
import {useDroppable} from '@dnd-kit/core';


export default function Droppable({children}:{children:ReactNode}) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        // backgroundColor: isOver ? 'green' : undefined,
        transform: isOver ? "" : undefined ,
    };
    
    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}
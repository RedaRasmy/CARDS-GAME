import  { ReactNode } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useAppSelector } from '../redux/store';
// import { useDraggable } from '@dnd-kit/core';

type sortableProps = {
    children : ReactNode,
    id:number
}
export function SortableItem({children,id}:sortableProps) {
    const {dragging} = useAppSelector(state=>state.settings)

    // const {isDragging} = useDraggable({id})

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
        // 
    } = useSortable({
        id:id,
        // disabled:!isSortable
    })
    // const position = isDragging? 'absolute':undefined
    // const index = isDragging? '1000':undefined

    const style = dragging ? {
        // position:position,
        // zIndex:index,
        transform: CSS.Transform.toString(transform),
        transition
    } : undefined
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}


import React, { ReactNode } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

type sortableProps = {
    children : ReactNode,
    id:number
}
export function SortableItem({children,id}:sortableProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id:id});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex:100,
    };
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}


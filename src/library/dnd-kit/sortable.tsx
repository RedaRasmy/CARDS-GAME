import  { ReactNode } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useAppSelector } from '../redux/store';

type sortableProps = {
    children : ReactNode,
    id:number
}
export function SortableItem({children,id}:sortableProps) {
    const {sorting,dragging} = useAppSelector(state=>state.settings)

    

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
        // isDragging
    } = useSortable({
        id,
        // disabled:!isSortable
    })

    const style = dragging ? {
        transform: CSS.Transform.toString(transform),
        transition
    } : undefined
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}


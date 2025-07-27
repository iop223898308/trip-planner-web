import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export default function TripPlannerPage({ tripId }: { tripId: string }) {
  // 假設 slots 是你從 Firestore 取得的行程資料
  const [slots, setSlots] = useState([
    { id: '1', name: '羅浮宮' },
    { id: '2', name: '奧賽美術館' },
    { id: '3', name: '塞納河遊船' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = slots.findIndex(item => item.id === active.id);
      const newIndex = slots.findIndex(item => item.id === over.id);
      setSlots(arrayMove(slots, oldIndex, newIndex));
      // 這裡可以加上 Firestore 更新順序的邏輯
    }
  };

  function SortableSlot({ id, name }: { id: string; name: string }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      background: isDragging ? '#e0e7ff' : '#fff',
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      marginBottom: 8,
      cursor: 'grab',
      boxShadow: isDragging ? '0 2px 8px #8882' : undefined,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {name}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={slots.map(item => item.id)} strategy={verticalListSortingStrategy}>
        {slots.map(item => (
          <SortableSlot key={item.id} id={item.id} name={item.name} />
        ))}
      </SortableContext>
    </DndContext>
  );
} 
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { getById, saveCharacter } from "../../utils/localStorageHelper";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Stats } from "../../models/Stats";
import Button from "../../common/Button";

const slots = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

type DraggableItem = {
  id: string;
  value: number;
};

type Assignment = Record<string, string | null>;

const DraggableNumber = ({
  item,
}: {
  item: DraggableItem;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  });

  const style: React.CSSProperties = {
    padding: "8px",
    margin: "4px",
    backgroundColor: isDragging ? "#CF8BE0" : "#936BE8",
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    borderRadius: "4px",
    cursor: "grab",
    width: "40px",
    textAlign: "center",
    color: "black",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {item.value}
    </div>
  );
};

const DroppableSlot: React.FC<{
  id: string;
  assignedItem: DraggableItem | null;
}> = ({ id, assignedItem }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const style: React.CSSProperties = {
    height: "50px",
    width: "50px",
    margin: "25px",
    border: "2px #888",
    borderRadius: "4px",
    backgroundColor: isOver ? "#def" : "#aaf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "black",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {assignedItem ? assignedItem.value : ""}
    </div>
  );
};

const ChooseStats = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (id === undefined) {
    return <div><p>Invalid id</p></div>;
  }

  const character = getById(id);
  if (character === undefined) {
    return <div><p>Invalid id</p></div>;
  }

  const originalNumbers: number[] = character.rolledStats;

  const initialItems: DraggableItem[] = originalNumbers.map((value, index) => ({
    id: `item-${index}`,
    value,
  }));

  const [items] = useState<DraggableItem[]>(initialItems);

  const [assignments, setAssignments] = useState<Assignment>(() =>
    Object.fromEntries(slots.map((slot) => [slot, null]))
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const dropSlot = over.id.toString();
    const draggedId = active.id.toString();

    setAssignments((prev) => {
      const updated = { ...prev };

      for (const key of Object.keys(updated)) {
        if (updated[key] === draggedId) {
          updated[key] = null;
        }
      }

      updated[dropSlot] = draggedId;

      return updated;
    });
  };

  const [warning, setWarning] = useState(false);

  const handleSubmit = () => {
    const result: Record<string, number> = {};
    let hasEmpty = false

    for (const slot of slots) {
      const itemId = assignments[slot];
      const item = items.find((i) => i.id === itemId);
      if (!item) {
        hasEmpty = true;
        break;
      } else {
        result[slot] = item.value;
      }
    }

    if (hasEmpty) {
      setWarning(true);
      return;
    }

    character.stats = result as Stats;
    saveCharacter(character);
    navigate(`/choose_skills/${id}`)

  };

  const assignedIds = Object.values(assignments).filter(Boolean) as string[];

  const unassignedItems = items.filter((i) => !assignedIds.includes(i.id));

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-2">Choose your stats</h1>
      {warning && <p className="border py-1 px-2 my-1">Please assign all values</p>}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-row my-5">
          {unassignedItems.map((item) => (
            <DraggableNumber key={item.id} item={item} />
          ))}
        </div>

        <div className="flex flex-wrap ">
          {slots.map((slot) => {
            const itemId = assignments[slot];
            const item = items.find((i) => i.id === itemId) ?? null;

            return (<div >
              <p>{slot}</p>
              <DroppableSlot key={slot} id={slot} assignedItem={item} />
            </div>
            );
          })}
        </div>
      </DndContext>
      <div className="w-full flex justify-center ">
        <Button onClick={handleReload}>Reset</Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </div>
    </div>
  );
};

export default ChooseStats;

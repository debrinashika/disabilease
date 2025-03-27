import { IApiBaseTaskCategory } from "@interfaces/taskCategory";
import { BaseButton } from "@components/shares/Buttons";
import { DotsVertical } from "@assets/icons/Dots";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DndCardPropType = {
  taskCategory: IApiBaseTaskCategory;
  buttonClassName: string;
  iconClassName: string;
};

export const DndCard = ({ 
  taskCategory,
  buttonClassName,
  iconClassName
}: DndCardPropType) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: taskCategory.task_category_id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="touch-none"
    >
      <BaseButton
        className={`w-full bg-white-01 text-base text-neutral-550 font-normal rounded-[10px] border text-left ${buttonClassName}`}
      >
        <div className="mx-4 flex flex-row items-center justify-between">
          <p className="text-neutral-550 font-normal">
            {taskCategory.task_category_name}
          </p>
          <DotsVertical fillClassName={iconClassName} />
        </div>
      </BaseButton>
    </div>
  );
}
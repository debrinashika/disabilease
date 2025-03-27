import { PrimaryButton } from "@components/shares/Buttons";


export const TopicButtonList = () => {
    const topics = ["Academic", "Relationship", "Family", "Work", "Grief"];

    return (
        <div className="flex flex-nowrap overflow-x-auto">
            {topics.map((topic, index) => (
              <PrimaryButton
                    key={ index }
                    type = {index === 0 ? "topic" : "disabled"}
                    text={ topic }
                    color= "green"
                    className="ml-4"
              />

            ))}
        </div>
    );   
};

import { PrimaryButton } from "@components/shares/Buttons";


export const StudentsTopicList = () => {
    const topics = ["All", "Favorites", "Latest", "Academic", "Others"];

    return (
        <div className="flex flex-nowrap overflow-x-auto">
            {topics.map((topic, index) => (
              <PrimaryButton
                    key={ index }
                    type = {index === 0 ? "topic" : "disabled"}
                    text={ topic }
                    color="yellow"
                    className="ml-4"
              />

            ))}
        </div>
    );   
};

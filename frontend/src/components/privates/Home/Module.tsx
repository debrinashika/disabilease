import { LongArrow } from "@assets/icons/Arrow";
import { Angry } from "@assets/icons/Face/Angry";
import { Fear } from "@assets/icons/Face/Fear";
import { Happy } from "@assets/icons/Face/Happy";
import { Sad } from "@assets/icons/Face/Sad";
import { Tired } from "@assets/icons/Face/Tired";
import { Send } from "@assets/icons/Send";
import { PrimaryButton } from "@components/shares/Buttons";
import { BaseButton } from "@components/shares/Buttons";
import { PrimaryCard } from "@components/shares/Cards";
import { PrimaryInputText } from "@components/shares/Inputs";
import { ChangeEvent, useState } from "react";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Module = () => {
  // TODO: use form instead
  const navigate = useNavigate();
  const [diary, setDiary] = useState<string>("");

  const handleDiaryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiary(event.target.value);
  };

  const [selectedMood, setSelectedMood] = useState<string>("");

  const handleMoodClick = (mood: string) => {
    if (selectedMood === mood) {
      setSelectedMood("");
    } else {
      setSelectedMood(mood);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-4">
      <div className="flex flex-col gap-4 mx-5">
        <h2 className="font-medium">How are you today?</h2>
        <div className="flex justify-around *:flex *:flex-col *:gap-2 *:items-center *:ease-linear *:duration-200">
          <BaseButton
            className={selectedMood === "happy" ? "drop-shadow-face-01" : ""}
            onClick={() => handleMoodClick("happy")}
          >
            <Happy />
            <p className="text-xs">Happy</p>
          </BaseButton>
          <BaseButton
            className={selectedMood === "fear" ? "drop-shadow-face-02" : ""}
            onClick={() => handleMoodClick("fear")}
          >
            <Fear />
            <p className="text-xs">Fear</p>
          </BaseButton>
          <BaseButton
            className={selectedMood === "sad" ? "drop-shadow-face-03" : ""}
            onClick={() => handleMoodClick("sad")}
          >
            <Sad />
            <p className="text-xs">Sad</p>
          </BaseButton>
          <BaseButton
            className={selectedMood === "tired" ? "drop-shadow-face-04" : ""}
            onClick={() => handleMoodClick("tired")}
          >
            <Tired />
            <p className="text-xs">Tired</p>
          </BaseButton>
          <BaseButton
            className={selectedMood === "angry" ? "drop-shadow-face-05" : ""}
            onClick={() => handleMoodClick("angry")}
          >
            <Angry />
            <p className="text-xs">Angry</p>
          </BaseButton>
        </div>

        <PrimaryInputText
          id="diary-feel"
          placeholder="How do you feel ?"
          value={diary}
          setValue={handleDiaryChange}
          button={
            <PrimaryButton
              onClick={() => console.log()}
              type="icon-only"
              icon={<Send fillClassName="fill-neutral-500" />}
            />
          }
        />

        <PrimaryCard className="flex flex-col gap-2 bg-green-04 bg-assessment bg-center bg-no-repeat rounded-xl mt-2">
          <p className="text-green-01 font-semibold">
            Mental Health Assessment
          </p>
          <div className="flex flex-row gap-4">
            <p className="text-xs leading-[18px] text-green-01">
              Adjust recommendations to match your mental health condition here!
            </p>
            <div className="flex justify-center items-center">
              <PrimaryButton
                text="Start"
                type="default"
                className="bg-green-01 text-xs text-white-01 font-semibold"
                onClick={() => {
                  navigate("/assessment");
                }}
              />
            </div>
          </div>
        </PrimaryCard>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between px-5">
          <p className="text-green-02 font-semibold">Healthy Mind 101</p>
          <PrimaryButton
            text="View All"
            type="text-only"
            className="text-black-01 text-sm font-medium"
            onClick={() => console.log()}
          />
        </div>

        <div className="flex flex-row gap-4 px-5 overflow-x-auto pb-2">
          <PrimaryCard className="relative justify-between bg-cream-01 bg-artikel-1 bg-right bg-no-repeat rounded-2xl min-w-32 max-w-32 h-32">
            <p className="text-xs leading-[18px] text-orange-02 font-semibold">
              Managing Health Anxiety and Panic
            </p>
            <div className="absolute bottom-0 right-0 m-4">
              <button
                className="p-0"
                style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer"
                }}
                onClick={() => {
                    navigate("/healthymind");
                }}
            >
                <LongArrow fillClassName="fill-orange-01" />
            </button>
            </div>
          </PrimaryCard>
          <PrimaryCard className="relative justify-between bg-blue-03 bg-artikel-2 bg-right bg-no-repeat rounded-2xl min-w-32 max-w-32 h-32">
            <p className="text-xs leading-[18px] text-blue-02 font-semibold">
              Insomnia and Sleep Disorder
            </p>
            <div className="absolute bottom-0 right-0 m-4">
              <button
                  className="p-0"
                  style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer"
                  }}
                  onClick={() => {
                      navigate("/healthymind");
                  }}
              >
                  <LongArrow fillClassName="fill-blue-01" />
              </button>
            </div>
          </PrimaryCard>
          <PrimaryCard className="relative justify-between bg-purple-02 bg-artikel-3 bg-right bg-no-repeat rounded-2xl min-w-32 max-w-32 h-32">
            <p className="text-xs leading-[18px] text-purple-01 font-semibold">
              Managing Schizophernia
            </p>
            <div className="absolute bottom-0 right-0 m-4">
              <button
                    className="p-0"
                    style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        navigate("/healthymind");
                    }}
                >
                    <LongArrow fillClassName="fill-purple-01" />
                </button>
            </div>
          </PrimaryCard>
        </div>

        <div className="mx-5">
          <PrimaryCard className="flex flex-col gap-2 rounded-xl bg-students-module bg-right bg-no-repeat">
            <p className="text-brown-02 font-semibold">Student's Module</p>
            <div className="flex flex-col gap-4">
              <p className="w-2/3 text-xs leading-[18px] text-brown-01">
                Universities life, time management, handle depression, etc.
              </p>
              <PrimaryButton
                text="Access Now"
                type="default"
                className="bg-white-01 text-xs text-orange-01 w-fit font-semibold"
                onClick={() => {
                  navigate("/module");
                }}
              />
            </div>
          </PrimaryCard>
        </div>
      </div>
    </div>
  );
};

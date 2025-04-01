/* eslint-disable react-hooks/exhaustive-deps */
import { apiBase } from "@apis";
import { BaseButton, PrimaryButton } from "@components/shares/Buttons";
import { IApiBaseError } from "@interfaces/api";
import { IApiBaseAssessmentForm, IApiBaseQuestion } from "@interfaces/assessment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { closestCorners, DndContext, DragEndEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { IApiBaseTaskCategory } from "@interfaces/taskCategory";
import { DndCard } from "@components/shares/DndCards";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAuth } from "@contexts";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@assets/icons/Caret";

const initialAssessmentForm: IApiBaseAssessmentForm = {
  tests: [],
  task_categories: []
}

export const AssessmentForm = () => {
  const apiBaseError = apiBase().error<IApiBaseError>();

  // Assessment form
  const [questions, setQuestions] = useState<IApiBaseQuestion[]>([]);
  const [assessmentForm, setAssessmentForm] = useState<IApiBaseAssessmentForm>(initialAssessmentForm);
  const [page, setPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(1);

  const fetchQuestions = async () => {
    try {
      const res = await apiBase().assessment().getQuestions();

      if (res.status === "success") {
        // Set questions data
        setQuestions(res.data);
        setTotalData(res.data.length);

        // Assessment form
        const assessmentTest = res.data.map(question => ({
          question_id: question.question_id,
          category_id: question.category_id,
          answer_id: -1
        }));

        setAssessmentForm((prevState: IApiBaseAssessmentForm) => ({
          ...prevState,
          tests: assessmentTest,
        }));
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  }

  const handleNext = async (question_id: number, answer_id: number) => {
    setAssessmentForm((prevForm) => {
      const index = prevForm.tests.findIndex(
        (item) => item.question_id === question_id
      );

      const updatedTests = [...prevForm.tests];
      updatedTests[index] = { ...updatedTests[index], answer_id };
      return { ...prevForm, tests: updatedTests };
    });

    setPage(page+1);
  };

  const { self } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      assessmentForm.task_categories = taskCategories;
      
      const res = await apiBase().assessment().submitAssessmentTest(
        assessmentForm
      );

      if (res.status === "success") {
        toast.success(res.message);

        const resSelf = await self();

        if (resSelf.data.already_test) {
          navigate("/");
        }
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Task categories
  const [taskCategories, setTaskCategories] = useState<IApiBaseTaskCategory[]>([]);
  const fetchTaskCategories = async () => {
    try {
      const res = await apiBase().taskCategory().getTaskCategories();

      if (res.status === "success") {
        // Set task categories data
        setTaskCategories(res.data);
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  };

  useEffect(() => {
    fetchTaskCategories();
  }, []);

  // Drag and drop
  const sortableItems = taskCategories.map((category) => ({
    id: category.task_category_id,
    ...category,
  }));

  const getTaskCategoryPos = (id: number) =>
    taskCategories.findIndex((task) => {
      return task.task_category_id === id;
    });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      if (active.id.toString() === over.id.toString()) return;

      setTaskCategories((categories) => {
        const originalPos = getTaskCategoryPos(parseInt(active.id.toString()));
        const newPos = getTaskCategoryPos(parseInt(over.id.toString()));

        return arrayMove(categories, originalPos, newPos);
      });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  // Progress bar
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.max = totalData.toString();
      progressBarRef.current.value = (page - 1).toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${((page - 1) / totalData) * 100}%`
      );
    }
  }, [page, totalData]);

  // Back
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col pt-8 pb-12">
      <div className="flex flex-col items-center relative w-full mt-2">
        <input type="range" ref={progressBarRef} />
      </div>

      {(page !== 1 || user?.already_test) && (
        <div className="flex px-4 pt-4 items-center">
          <BaseButton
            className="flex flex-row items-center gap-1"
            onClick={() => {
              if (page === 1) {
                navigate("/");
              } else {
                setPage(page - 1);
              }
            }}
          >

          </BaseButton>
        </div>
      )}

    <img
        src="/images/quiz-1.svg" // Gantilah dengan path gambar yang sesuai
        alt="Star Character"
        className="w-full mt-[-50px] mb-[-20px]"
      />

      <div
        className={`flex flex-col flex-grow transition-all ease-in-out duration-500 
          ${questions.length == 0 ? "translate-x-full" : "translate-x-0"}
      `}
      >
        {questions.length > 0 && page <= totalData+1 && (
          <div className="flex flex-col justify-center items-center px-12">
            <h1 className="text-indigo-950 text-xl font-normal text-center">
              {questions[page - 1].question}
            </h1>

            <div className="h-[1.5vh]" />
            <div className="flex flex-col gap-4">
              {questions[page - 1].answers.map((answer) => (
                <div key={answer.answer_id}>
                  <PrimaryButton
                    text={answer.answer}
                    type="default"
                    className="w-full bg-white-01 text-base text-neutral-550 font-normal rounded-xl border border-purple-02"
                    onClick={() =>
                      handleNext(
                        questions[page - 1].question_id,
                        answer.answer_id
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {page== totalData+1 && (
          <>
          
           
            <div className="px-6 mt-3">
              <PrimaryButton
                text="Finish"
                type="default"
                className="bg-purple-01 text-neutral-0 py-2.5 font-semibold w-full"
                onClick={handleSubmit}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

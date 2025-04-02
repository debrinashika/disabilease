/* eslint-disable react-hooks/exhaustive-deps */
import { apiBase } from "@apis";
import { BaseButton, PrimaryButton } from "@components/shares/Buttons";
import { IApiBaseError } from "@interfaces/api";
import { IApiBaseAssessmentForm, IApiBaseQuestion } from "@interfaces/assessment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { IApiBaseTaskCategory } from "@interfaces/taskCategory";
import { useAuth } from "@contexts";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@assets/icons/Caret";

const initialAssessmentForm: IApiBaseAssessmentForm = {
  tests: [],
  task_categories: []
};

export const AssessmentForm = () => {
  const apiBaseError = apiBase().error<IApiBaseError>();
  const [questions, setQuestions] = useState<IApiBaseQuestion[]>([]);
  const [assessmentForm, setAssessmentForm] = useState<IApiBaseAssessmentForm>(initialAssessmentForm);
  const [page, setPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchQuestions = async () => {
    try {
      const res = await apiBase().assessment().getQuestions();
      if (res.status === "success") {
        setQuestions(res.data);
        setTotalData(res.data.length);
        setAssessmentForm({
          ...initialAssessmentForm,
          tests: res.data.map(question => ({
            question_id: question.question_id,
            category_id: question.category_id,
            answer_id: -1
          }))
        });
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occurred");
    }
  };

  const handleNext = (question_id: number, answer_id: number) => {
    setAssessmentForm(prevForm => {
      const updatedTests = prevForm.tests.map(test =>
        test.question_id === question_id ? { ...test, answer_id } : test
      );
      return { ...prevForm, tests: updatedTests };
    });
    if (page < totalData) {
      setPage(page + 1);
    }
  };

  const { self } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {

      assessmentForm.task_categories = taskCategories;
      const res = await apiBase().assessment().submitAssessmentTest(assessmentForm);
      if (res.status === "success") {
        toast.success(res.message);
        const resSelf = await self();
        if (resSelf.data.already_test) {
          navigate("/result");
        }
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occurred");
    }
  };
  

  useEffect(() => {
    fetchQuestions();
  }, []);

  const [taskCategories, setTaskCategories] = useState<IApiBaseTaskCategory[]>([]);
  const fetchTaskCategories = async () => {
    try {
      const res = await apiBase().taskCategory().getTaskCategories();
      if (res.status === "success") {
        setTaskCategories(res.data);
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occurred");
    }
  };

  useEffect(() => {
    fetchTaskCategories();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const progressBarRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.max = totalData.toString();
      progressBarRef.current.value = (page - 1).toString();
      progressBarRef.current.style.setProperty("--range-progress", `${((page - 1) / totalData) * 100}%`);
    }
  }, [page, totalData]);

  return (
    <div className="h-screen flex flex-col pt-8 pb-12">
      <div className="flex flex-col items-center relative w-full mt-2">
        <input type="range" ref={progressBarRef} />
      </div>
     
      <img src="/images/quiz-1.svg" alt="Star Character" className="w-full mt-[-30px] mb-[-20px]" />
      <div className={`flex flex-col flex-grow transition-all ease-in-out duration-500 ${questions.length === 0 ? "translate-x-full" : "translate-x-0"}`}>
        {questions.length > 0 && page <= totalData && (
          <div className="flex flex-col justify-center items-center px-12">
            <h1 className="text-indigo-950 text-xl font-normal text-center">{questions[page - 1].question}</h1>
            <div className="h-[1.5vh]" />
            <div className="flex flex-col gap-4">
              {questions[page - 1].answers.map(answer => (
                <PrimaryButton key={answer.answer_id} text={answer.answer} className="w-full bg-white-01 text-base text-neutral-550 font-normal rounded-xl border border-purple-02" onClick={() => handleNext(questions[page - 1].question_id, answer.answer_id)} />
              ))}
            </div>
          </div>
        )}
        {page === totalData && (
          <div className="px-6 mt-5 mb-2">
            <PrimaryButton text="Finish" className="bg-purple-01 text-neutral-0 py-2.5 font-semibold w-full" onClick={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};
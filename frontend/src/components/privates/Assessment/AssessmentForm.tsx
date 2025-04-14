/* eslint-disable react-hooks/exhaustive-deps */
import { apiBase } from "@apis";
import { PrimaryButton } from "@components/shares/Buttons";
import { IApiBaseError } from "@interfaces/api";
import { IApiBaseAssessmentForm, IApiBaseQuestion } from "@interfaces/assessment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IApiBaseTaskCategory } from "@interfaces/taskCategory";
import { useAuth } from "@contexts";
import { useNavigate } from "react-router-dom";

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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

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
            answer_id: 1
          }))
        });
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occurred");
    }
  };

  const handleAnswerSelect = (answer_id: number) => {
    setSelectedAnswer(answer_id);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    setAssessmentForm(prevForm => {
      const updatedTests = prevForm.tests.map(test =>
        test.question_id === questions[page - 1].question_id 
          ? { ...test, answer_id: selectedAnswer } 
          : test
      );
      return { ...prevForm, tests: updatedTests };
    });

    setSelectedAnswer(null);
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
        {questions.length > 0 && (
          <div className="flex flex-col justify-center items-center px-4 sm:px-12">
            <h1 className="text-indigo-950 text-xl font-normal text-center mb-4">
              {questions[page - 1].question}
            </h1>
            
            <div className="w-full max-w-md flex flex-col gap-3 mb-4">
              {questions[page - 1].answers.map(answer => (
                <PrimaryButton 
                  key={answer.answer_id} 
                  text={answer.answer} 
                  className={`w-full text-base text-neutral-550 font-normal rounded-xl border border-purple-02 py-3 px-4 text-left min-h-[60px] flex items-center ${
                    selectedAnswer === answer.answer_id 
                      ? "bg-purple-01 text-white border-purple-01" 
                      : "bg-white-01 hover:bg-purple-01/10"
                  }`}
                  onClick={() => handleAnswerSelect(answer.answer_id)}
                />
              ))}
            </div>

            {page < totalData ? (
              <PrimaryButton 
                text="Next" 
                className="bg-purple-01 text-neutral-0 py-2.5 font-semibold w-full max-w-md"
                onClick={handleNext}
                disabled={selectedAnswer === null}
              />
            ) : (
              <PrimaryButton 
                text="Finish" 
                className="bg-purple-01 text-neutral-0 py-2.5 font-semibold w-full max-w-md"
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
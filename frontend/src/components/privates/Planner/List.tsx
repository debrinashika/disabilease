import { apiBase } from "@apis";
import { BaseButton, PrimaryButton } from "@components/shares/Buttons";
import { IApiBaseError } from "@interfaces/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DateCard } from "./DateCard";
import { IApiBaseTaskCategory } from "@interfaces/taskCategory";
import { IApiBaseTask } from "@interfaces/task";
import { libs } from "@libs";
import { TaskCard } from "./TaskCard";
import { History } from "@assets/icons/History";
import { ViewToggle } from "../DayliInput/ViewToggle"

const initialTaskForm: IApiBaseTask = {
  task_id: -1,
  task_name: "",
  deadline: "",
  task_duration: 0,
  status: 0,
  task_category_id: -1
}

export const List = () => {
  // const { user } = useAuth();
  const apiBaseError = apiBase().error<IApiBaseError>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

 
  const [modalAddTaskOpen, setModalAddTaskOpen] = useState<boolean>(false);
  const [taskForm, setTaskForm] = useState<IApiBaseTask>(initialTaskForm);

  const handleAddTask = async () => {
    try {
      const res = await apiBase().task().addOrUpdateTask(
        taskForm
      );

      if (res.status === "success") {
        setModalAddTaskOpen(false);
        toast.success(res.message);
        
        await fetchTasks(selectedDate);

        apiBaseError.clear();
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  }

  const handleEdit = (task: IApiBaseTask) => {
    setModalAddTaskOpen(true);
    setTaskForm(task);
  }

  const [isHistory, setIsHistory] = useState<boolean>(false);

  const handleFetchHistory = async () => {
    try {
      const res = await apiBase().task().getCompletedTask();

      if (res.status === "success") {
        setTasks(res.data);

        apiBaseError.clear();
        setIsHistory(true);
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  }

  const handleCheckTask = async (task: IApiBaseTask) => {
    try {
      if (task.task_id) {
        const res = await apiBase().task().checkTask(task.task_id);

        if (res.status === "success") {
          toast.success(res.message);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (isHistory) {
            await handleFetchHistory();
          } else {
            await fetchTasks(selectedDate);
          }

          apiBaseError.clear();
        }
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  }

  const customLib = libs();
  const handleTaskFormDataChange = (
    name: keyof IApiBaseTask,
    value: string | number
  ) => {
    let parsedVal: string | number = value;

    if (name === "task_duration" && typeof value == "string") {
      parsedVal = customLib.timeStringToMinutes(value);
    }

    setTaskForm({
      ...taskForm,
      [name]: parsedVal,
    });
  };

  const [tasks, setTasks] = useState<any[]>([]);
  const fetchTasks = async (date: Date) => {
    try {
      const res = await apiBase().task().getTask(
        customLib.formatDateInput(date)
      );

      if (res.status === "success") {
        // Set tasks data
        setTasks(res.data);
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occured");
    }
  };

  useEffect(() => {
    fetchTasks(today);
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    fetchTasks(date);
    setIsHistory(false);
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10); 

    return () => clearTimeout(timeout);
  }, []);

  const [taskCategories, setTaskCategories] = useState<IApiBaseTaskCategory[]>(
    []
  );
  const fetchTaskCategories = async () => {
    try {
      const res = await apiBase().taskCategory().getTaskCategories();

      if (res.status === "success") {
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

  
 
  return (
    <>
      <div
        className={`absolute left-0 w-full h-screen z-10 transition-all ease-in-out duration-500 pb-[68px]
        ${loading ? "-bottom-full" : "bottom-0"}
        `}
      >
        <div className="fixed top-0 w-full max-w-[430px] h-[20vh] flex flex-col  text-neutral-700 p-5">
          <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-semibold text-center text-white w-full">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>
            <div className="flex gap-1">
              <PrimaryButton
                type="icon-only"
                icon={
                  <History
                    fillClassName="fill-white"
                    strokeClassName="stroke-white"
                  />
                }
                onClick={handleFetchHistory}
              />
           
            </div>
          </div>
          <div className="flex-grow grid grid-cols-7 gap-3 items-center justify-center">
            {dates.map((date, index) => (
              <BaseButton key={index} onClick={() => handleDateChange(date)}>
                <DateCard date={date} selectedDate={selectedDate} />
              </BaseButton>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-[82vh] z-10 bg-purple-03 rounded-t-2xl px-7 py-5 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-16">     
            <ViewToggle />
            {tasks &&
              tasks.map((task, index) => (
                <div key={`${task.task_name}-${index}`}>
                  <TaskCard
                    is_recommendation={task.rec_name != null}
                    name={task.task_name ?? task.rec_name}
                    duration={
                      task.task_duration
                        ? customLib.formatTime(task.task_duration)
                        : customLib.formatTime(task.rec_duration)
                    }
                    status={task.status ?? undefined}
                    deadline={
                      task.deadline
                        ? customLib.formatDeadline(task.deadline)
                        : undefined
                    }
                    category={
                      task.task_category_id
                        ? taskCategories.find(
                            (category) =>
                              category.task_category_id ===
                              task.task_category_id
                          )?.task_category_name
                        : undefined
                    }
                    onClick={() => {
                      handleCheckTask(task);
                    }}
                    onEdit={() => handleEdit(task)}
                  />
                </div>
              ))}
          </div>
        </div>

    
      </div>
    </>
  );
};

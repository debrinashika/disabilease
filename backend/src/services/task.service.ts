import { PrismaClient, Task } from '@prisma/client';
import { TaskCategoryService } from './task.category.service';
import { AssessmentResultService } from './assessment.result.service';
import { RecommendationService } from './recommendation.service';
import { IApiBaseTask } from '../interfaces/task.interface';
import { TaskUtils } from '../utils/task.utils';

export class TaskService {
  private taskModel = new PrismaClient().task;

  public async getTaskById(task_id: number): Promise<Task> {
    const task = await this.taskModel.findUnique({
      where: {
        task_id: task_id,
      },
    });

    return task;
  }

  public async createOrUpdateTask(user_id: number, taskData: IApiBaseTask): Promise<IApiBaseTask> {
    const newTaskData = {
      user_id: user_id,
      task_name: taskData.task_name,
      deadline: taskData.deadline,
      task_duration: taskData.task_duration,
      status: taskData.status,
      task_category_id: taskData.task_category_id
    };
    
    const updatedTask = await this.taskModel.upsert({
      where: {
        user_id: user_id,
        task_id: taskData.task_id
      },
      create: { ...newTaskData },
      update: { ...taskData },
      select: {
        task_id: true,
        task_name: true,
        deadline: true,
        task_duration: true,
        status: true,
        task_category_id: true,
      }
    });

    return updatedTask;
  }

  public async getTask(user_id: number, date: string) {
    const tasks = await this.taskModel.findMany({
      where: {
        user_id: user_id,
        status: 0
      },
      orderBy: {
        deadline: "asc"
      },
      select: {
        task_id: true,
        task_name: true,
        deadline: true,
        task_duration: true,
        status: true,
        task_category_id: true,
      }
    });

    // Root
    const deadlineIn3Days: any[] = [];
    let deadlineOver3Days: any[] = [];

    // Split the tasks into 2
    for (const task of tasks) {
      const classification = await TaskUtils.isWithin3Days(new Date(task.deadline), new Date(date));

      if (classification === -1) {
        // Deadline in the past
      } else if (classification === 0) {
        // Deadline within 3 days
        deadlineIn3Days.push(task);
      } else {
        // Deadline over 3 days
        deadlineOver3Days.push(task);
      }
    }

    /* DEADLINE IN 3 DAYS */
    // Level 1
    // Priority = deadline in 1 days

    let deadlineIn1Days: any[] = [];
    let deadlineOver1Days: any[] = [];

    // Split deadlineIn3Days into 2
    for (const task of deadlineIn3Days) {
      const isWithin1Days = await TaskUtils.isWithin1Days(task.deadline, new Date(date));

      if (isWithin1Days) {
        deadlineIn1Days.push(task)
      }  else {
        deadlineOver1Days.push(task);
      }
    }

    if (deadlineIn3Days.length > 0) {
      console.log("in 3 days");

      if (deadlineIn1Days.length > 0) {
        console.log("in 1 day");

        const totalMinutesDeadlineIn1Days = deadlineIn1Days.reduce((totalMinutes, task) => {
          return totalMinutes + task.task_duration;
        }, 0);

        if (totalMinutesDeadlineIn1Days > 10 * 60) {
          console.log("> 10 hours in 1 day");

          deadlineIn1Days = await this.getRecommendations(user_id, deadlineIn1Days);
          return deadlineIn1Days;
        } else {
          console.log("<= 10 hours in 1 day");

          deadlineOver1Days = await this.getUnder10Hours(user_id, totalMinutesDeadlineIn1Days, deadlineOver1Days);

          const totalMinutesDeadlineIn1DaysAndOver1Days = totalMinutesDeadlineIn1Days + deadlineOver1Days.reduce((totalMinutes, task) => {
            return totalMinutes + task.task_duration;
          }, 0);

          const mergedList = deadlineIn1Days.concat(deadlineOver1Days);

          if (totalMinutesDeadlineIn1DaysAndOver1Days <= 10 * 60) {
            deadlineOver3Days = await this.getUnder10Hours(user_id, totalMinutesDeadlineIn1DaysAndOver1Days, deadlineOver3Days);

            const mergedList2 = mergedList.concat(deadlineOver3Days);

            return await this.getRecommendations(user_id, mergedList2);
          }

          return await this.getRecommendations(user_id, mergedList);
        }
      } else {
        console.log("over 1 day");

        const totalMinutesDeadlineOver1Days = deadlineOver1Days.reduce((totalMinutes, task) => {
          return totalMinutes + task.task_duration;
        }, 0);

        if (totalMinutesDeadlineOver1Days > 10 * 60) {
          console.log("> 10 hours in over 1 day");

          deadlineOver1Days = await this.getUnder10Hours(user_id, totalMinutesDeadlineOver1Days, deadlineOver1Days);

          return await this.getRecommendations(user_id, deadlineOver1Days);
        } else {
          console.log("<= 10 hours in over 1 day");

          deadlineOver3Days = await this.getUnder10Hours(user_id, totalMinutesDeadlineOver1Days, deadlineOver3Days);

          const mergedList = deadlineOver1Days.concat(deadlineOver3Days);

          return await this.getRecommendations(user_id, mergedList);
        }
      }
    } else {
      console.log("over 3 days", deadlineOver3Days);
      const totalMinutesDeadlineOver3Days = deadlineOver3Days.reduce((totalMinutes, task) => {
        return totalMinutes + task.task_duration;
      }, 0);

      deadlineOver3Days = await this.getUnder10Hours(user_id, totalMinutesDeadlineOver3Days, deadlineOver3Days);

      console.log(deadlineOver3Days);

      return await this.getRecommendations(user_id, deadlineOver3Days);
    }
  }
  
  public async getCompletedTask(user_id: number): Promise<IApiBaseTask[]> {
    const tasks = await this.taskModel.findMany({
      where: {
        user_id: user_id,
        status: 1
      },
      orderBy: {
        deadline: "asc"
      },
      select: {
        task_id: true,
        task_name: true,
        deadline: true,
        task_duration: true,
        status: true,
        task_category_id: true,
      }
    });

    return tasks;
  }

  private async getUnder10Hours(user_id: number, total_minutes: number, remainingList: any[]): Promise<any[]> {
    const mood = 0;
    // 0: belum ngisi
    // 1-2: good mood
    // 3-5: bad mood

    // Task categories
    const taskCategoryService = new TaskCategoryService();
    const userTaskCategoies = await taskCategoryService.getTaskCategoriesWithPriorityByUserId(user_id);
    
    if (mood <= 2) {
      // sort by priority asc and sort by duration longest to shortest duration
      remainingList.sort((a, b) => {
        // Sort by user task categories priority ascending
        const priorityA = userTaskCategoies.find(category => category.task_category_id === a.task_category_id).priority;
        const priorityB = userTaskCategoies.find(category => category.task_category_id === b.task_category_id).priority;

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        // If priorities are the same, sort by task duration (descending)
        return b.task_duration - a.task_duration;
      });
    } else {
      // sort by priority desc and sort by duration shortest to longest duration
      remainingList.sort((a, b) => {
        // Sort by user task categories priority descending
        const priorityA = userTaskCategoies.find(category => category.task_category_id === a.task_category_id).priority;
        const priorityB = userTaskCategoies.find(category => category.task_category_id === b.task_category_id).priority;

        if (priorityA !== priorityB) {
          return priorityB - priorityA; // Compare in descending order
        }

        // If priorities are the same, sort by task duration (ascending)
        return a.task_duration - b.task_duration;
      });
    }

    const returnList: IApiBaseTask[] = [];

    let min = total_minutes;
    for (const task of remainingList) {
      if (min + task.task_duration <= 10 * 60) {
        returnList.push(task);

        min += task.task_duration;
      }

      if (min > 10 * 60) {
        break;
      }
    }

    return returnList;
  }

  private async getRecommendations(user_id: number, resultList: any[]): Promise<any[]> {
    // Add recommendations
    // Assessment results
    const assessmentResultService = new AssessmentResultService();
    // Assessment results order by total_points ascending
    const userAssessmentResults = await assessmentResultService.getUserAssessmentResults(user_id);

    // Recommendations
    const recommendationService = new RecommendationService();

    // 1. Rekomendasi 1: Worst mental health
    const userWorstMentalHealth = userAssessmentResults[0];
    const recommendationForUserWorstMentalHealth = await recommendationService.getRecommendationByCategoryId(userWorstMentalHealth.category_id);

    // Find longest task duration from resultList
    // Find the index to insert the recommendation
    let insertionIndex = 0;
    let longestTaskDuration = 0;

    resultList.forEach((task, index) => {
      if (task.task_duration > longestTaskDuration) {
        longestTaskDuration = task.task_duration;
        insertionIndex = index + 1;
      }
    });

    // Insert recommendationForUserWorstMentalHealth at the calculated index
    resultList.splice(insertionIndex, 0, recommendationForUserWorstMentalHealth);
    
    // 2. Rekomendasi 2: User mental health goal

    // Insert recommendation for user mental health goal
    const assessmentResult = await assessmentResultService.getUserGoalAnswer(user_id);
    const points = assessmentResult.total_points;

    let category_id: number;


    if (points == 0) {
      category_id = 2;
    } else if (points == 1) {
      category_id = 3;
    } else if (points == 2) {
      category_id = 4;
    } else if (points == 3) {
      category_id = 5;
    } else { // no goal
      category_id = Math.floor(Math.random() * ((5 - 2) + 1)) + 2;
    }

    const recommendationForUserMentalHealthGoal = await recommendationService.getRecommendationByCategoryId(category_id, recommendationForUserWorstMentalHealth.rec_id);

    resultList.push(recommendationForUserMentalHealthGoal);

    return resultList;
  }

  public async checkTask(user_id: number, task_id: number): Promise<void> {
    const currentTask = await this.taskModel.findUnique({
      where: {
        user_id: user_id,
        task_id: task_id
      }
    });

    if (currentTask) {
      const newStatus = currentTask.status === 0 ? 1 : 0;

      await this.taskModel.update({
        where: {
          user_id: user_id,
          task_id: task_id
        },
        data: {
          status: newStatus
        }
      });
    }
  }
}

import auth from "@apis/auth"
import user from "@apis/user"
import error from "@apis/error"
import assessment from "@apis/assessment"
import taskCategory from "@apis/taskCategory"
import task from "@apis/task"

export const apiBase = () => {
  return {
    auth,
    user,
    error,
    assessment,
    taskCategory,
    task
  }
}
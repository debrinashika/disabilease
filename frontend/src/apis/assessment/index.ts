import { api, support } from "@apis/support";
import { IApiBaseResponse } from "@interfaces/api";
import { IApiBaseAssessmentForm, IApiBaseQuestion } from "@interfaces/assessment";

const assessment = () => {
  const { apiUrl } = support();

  const url = {
    questions: apiUrl.assessment.questions,
    submit: apiUrl.assessment.submit
  }

  const getQuestions = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseQuestion[]>>(
      url.questions
    );

    return response.data;
  }

  const submitAssessmentTest = async (assessmentForm: IApiBaseAssessmentForm) => {
    const response = await api.post<IApiBaseResponse<undefined>>(
      url.submit,
      assessmentForm
    );

    return response.data;
  }

  return {
    getQuestions,
    submitAssessmentTest
  }
}

export default assessment;
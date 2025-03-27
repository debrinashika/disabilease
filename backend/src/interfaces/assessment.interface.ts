export interface IApiBaseAnswer {
  answer_id: number;
  answer: string;
}

export interface IApiBaseQuestion {
  question_id: number;
  category_id: number;
  question: string;
  answers: IApiBaseAnswer[];
}

export interface IApiBaseAssessmentTest {
  question_id: number;
  category_id: number;
  answer_id: number;
}
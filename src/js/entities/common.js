import {ID} from "../components/Common";

export const ONE_ANSWER_TYPE = 'oneAnswer';
export const MULTIPLE_ANSWERS_TYPE = 'multipleAnswers';
export const DEFAULT_TYPE = ONE_ANSWER_TYPE;

const getCommonEntityFields = () => ({
    id: ID(),
    text: ''
})

export const createQuestionObject = () => ({
    ...getCommonEntityFields(),
    type: DEFAULT_TYPE,
})

export const createAnswerObject = (questionId) => ({
    ...getCommonEntityFields(),
    correct: false,
    questionId,
})
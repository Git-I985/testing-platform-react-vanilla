import {MULTIPLE_ANSWERS_TYPE, ONE_ANSWER_TYPE} from "../entities/common";

/**
 * Валидирует данные
 *
 * @return {Boolean}
 * @param {Array} questions
 */
export const dataIsValid = (questions) => {
    /**
     * Валидация:
     * - У каждого вопроса есть ответы
     * - У вопроса задан текст
     * - корректный тип ответа
     * - У вопроса все ответы имеют его id
     * - У всех ответов задан текст ответа
     * - Выбран корректный ответ
     */
    const valid = ({answers, text, type, id}) => [
        answers && answers.length,
        text.trim(),
        [ONE_ANSWER_TYPE, MULTIPLE_ANSWERS_TYPE].includes(type),
        answers.every(({questionId}) => questionId === id),
        answers.every(({text}) => text.trim()),
        answers.some(({correct}) => correct)
    ].every(Boolean)

    return questions.every(valid)
}

/**
 * Собирает ответы и вопросы в нужном формате
 *
 * @param {Object}
 * @return {Object}
 */
export const combineAnswersAndQuestions = ({answers, questions}) => questions.map(question => ({
    ...question,
    answers: answers.filter(({questionId}) => questionId === question.id) || []
}))

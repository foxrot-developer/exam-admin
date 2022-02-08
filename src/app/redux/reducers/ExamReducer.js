import {
    GET_QUESTION,
    GET_PAID_EXAM,
    GET_EXAM_RESULT,
    EXAM_CLEAR,
    GET_LANGUAGE_EXAMS,
} from '../actions/ExamAction'

const initialState = {
    questions: [],
    exam: [],
    result: [],
    allLanguageExam: {
        english: [],
        arabic: [],
        netherlands: [],
    },
}

const ExamReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTION:
            return {
                ...state,
                questions: action.payload,
            }
        case GET_PAID_EXAM:
            return {
                ...state,
                exam: action.payload,
            }

        case GET_EXAM_RESULT:
            return {
                ...state,
                result: action.payload,
            }
        case EXAM_CLEAR:
            return {
                ...state,
                exam: [],
                result: [],
            }
        case GET_LANGUAGE_EXAMS:
            return {
                ...state,
                allLanguageExam: action.payload,
            }
        default:
            return state
    }
}

export default ExamReducer

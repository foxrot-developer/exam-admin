import Toast from 'Toast'
import axiosInstance from '../../../axios'
export const GET_QUESTION = 'GET_QUESTION'
export const GET_PAID_EXAM = 'GET_PAID_EXAM'
export const EXAM_CLEAR = 'EXAM_CLEAR'
export const GET_LANGUAGE_EXAMS = 'GET_LANGUAGE_EXAMS'

export const createFreeExam =
    (exam, setOpen, setQuestion, lang) => (dispatch) => {
        axiosInstance
            .post('free-exam/create-free-exam', exam)
            .then((res) => {
                setOpen(false)
                setQuestion({
                    question: '',
                    options: ['', '', ''],
                    answer: '',
                    part: '',
                    question_ar: '',
                    options_ar: ['', '', ''],
                    answer_ar: '',
                    part_ar: '',
                    question_nl: '',
                    options_nl: ['', '', ''],
                    answer_nl: '',
                    part_nl: '',
                    image: null,
                })
                Toast.success('Exam created successfully')
                dispatch(getFreeExam(lang))
            })
            .catch((err) => Toast.error(err.response.data.message))
    }

export const createImproveFreeExam = (exam) => (dispatch) => {
    axiosInstance
        .post('free-exam/create-free-exam', exam)
        .then((res) => {
            Toast.success('Exam created successfully')
        })
        .catch((err) => Toast.error(err.response.data.message))
}
export const approveAllImportFreeExam = (formData) => (dispatch) => {
    axiosInstance
        .post('free-exam/free-approve-questions', formData)
        .then(() => {
            Toast.success('Exam created successfully')
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const approveAllImportPaidExam = (formData) => (dispatch) => {
    axiosInstance
        .post('paid-exam/approve-questions', formData)
        .then((res) => {
            Toast.success(res.data.message)
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const isFreeExam = (lang, examId) => (dispatch) => {
    axiosInstance
        .get('free-exam', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {})
        .catch((err) => {
            Toast.error(err.response.data.message)
            dispatch({
                type: GET_QUESTION,
                payload: [],
            })
        })
}

export const getFreeExam = (lang) => (dispatch) => {
    axiosInstance
        .get('free-exam', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_QUESTION,
                payload: res.data.free_questions,
            })
        })
        .catch((err) => {
            Toast.error(err.response.data.message)
            dispatch({
                type: GET_QUESTION,
                payload: [],
            })
        })
}

export const updateFreeExam = (exam, id, setEditMode, lang) => (dispatch) => {
    axiosInstance
        .patch(`free-exam/edit-question/${id}`, exam)
        .then(() => {
            setEditMode(false)
            Toast.success('Question updated successfully')
            dispatch(getFreeExam(lang))
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const deleteFreeExam = (id, lang) => (dispatch) => {
    axiosInstance
        .delete(`free-exam/delete-question/${id}`)
        .then(() => {
            Toast.success('Question deleted successfully')
            dispatch(getFreeExam(lang))
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const createPaidExam = (exam, setOpen, lang) => (dispatch) => {
    axiosInstance
        .post('paid-exam/add-paid-exam', exam)
        .then((res) => {
            setOpen(false)
            Toast.success('Exam created successfully')
            if (lang === '') {
                dispatch(getPaidExam('en'))
            } else {
                dispatch(getPaidExam(lang))
            }
        })
        .catch((err) => Toast.error(err.response.data.message))
}
export const createImportPaidExam = (exam) => (dispatch) => {
    axiosInstance
        .post('paid-exam/add-paid-exam-question', exam)
        .then((res) => {
            Toast.success('Exam created successfully')
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const getPaidExam = (lang) => (dispatch) => {
    axiosInstance
        .get('paid-exam', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_PAID_EXAM,
                payload: res.data,
            })
        })
        .catch((err) =>
            dispatch({
                type: GET_PAID_EXAM,
                payload: [],
            })
        )
}

export const updatePaidExam = (id, exam, setEditMode, lang) => (dispatch) => {
    axiosInstance
        .patch(`paid-exam/edit-paid-exam/${id}`, exam, {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            Toast.success(res.data.message)
            setEditMode(false)
            dispatch(getPaidExam(lang))
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const deletePaidExam = (id, lang) => (dispatch) => {
    axiosInstance
        .delete(`paid-exam/delete-paid-exam/${id}`)
        .then((res) => {
            Toast.success(res.data.message)
            dispatch(getPaidExam(lang))
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const createPaidExamQuestion =
    (exam, setOpen, setQuestion, lang, setCircles) => (dispatch) => {
        axiosInstance
            .post('paid-exam/add-paid-exam-question', exam)
            .then(() => {
                setOpen(false)
                setQuestion({
                    question: '',
                    options: ['', '', ''],
                    answer: '',
                    part: '',
                    question_ar: '',
                    options_ar: ['', '', ''],
                    answer_ar: '',
                    part_ar: '',
                    question_nl: '',
                    options_nl: ['', '', ''],
                    answer_nl: '',
                    part_nl: '',
                    circle: [],
                    reason: '',
                    reason_ar: '',
                    reason_nl: '',
                    image: null,
                })
                setCircles([])
                Toast.success('Question added successfully')
                dispatch(getPaidQuestion(lang))
            })
            .catch((err) => Toast.error(err.response.data.message))
    }

export const getPaidExamQuestion = (id, lang) => (dispatch) => {
    axiosInstance
        .get(`paid-exam/exam-details/${id}`, {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_QUESTION,
                payload: res.data.exam_details,
            })
        })
        .catch((err) =>
            dispatch({
                type: GET_QUESTION,
                payload: [],
            })
        )
}

export const getPaidQuestion = (lang) => (dispatch) => {
    axiosInstance
        .get('paid-exam/all-paid-questions', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_QUESTION,
                payload: res.data.paid_questions,
            })
        })
        .catch((err) =>
            dispatch({
                type: GET_QUESTION,
                payload: [],
            })
        )
}

export const updatePaidQuestion =
    (exam, id, setEditMode, lang) => (dispatch) => {
        axiosInstance
            .patch(`paid-exam/edit-paid-exam-question/${id}`, exam, {
                headers: {
                    lang: lang,
                },
            })
            .then((res) => {
                setEditMode(false)
                Toast.success(res.data.message)
                dispatch(getPaidQuestion(lang))
            })
            .catch((err) => Toast.error(err.response.data.message))
    }

export const deletePaidQuestion = (id, lang) => (dispatch) => {
    axiosInstance
        .delete(`paid-exam/delete-paid-exam-question/${id}`)
        .then((res) => {
            Toast.success(res.data.message)
            dispatch(getPaidQuestion(lang))
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const GET_EXAM_RESULT = 'GET_EXAM_RESULT'

export const getAllPaidExamResult = (lang) => (dispatch) => {
    axiosInstance
        .get('paid-exam/all-exam-results', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_EXAM_RESULT,
                payload: res.data.results,
            })
        })
        .catch((err) =>
            dispatch({
                type: GET_EXAM_RESULT,
                payload: [],
            })
        )
}

export const makeFreeExam = (exam, setOpen, lang) => (dispatch) => {
    axiosInstance
        .post(`free-exam/select-free-exam/${exam}`)
        .then((res) => {
            setOpen(false)
            Toast.success(res.data.message)
            if (lang === '') {
                dispatch(getPaidExam('en'))
            } else {
                dispatch(getPaidExam(lang))
            }
        })
        .catch((err) => Toast.error(err.response.data.message))
}

export const getAllLanguageExams = () => (dispatch) => {
    axiosInstance.get('paid-exam/all-lang-questions').then((res) => {
        console.log(res.data)
        const { paid_questions_en, paid_questions_ar, paid_questions_nl } =
            res.data
        dispatch({
            type: GET_LANGUAGE_EXAMS,
            payload: {
                english: paid_questions_en,
                arabic: paid_questions_ar,
                netherlands: paid_questions_nl,
            },
        })
    })
}

export const getReplacedQuestion = (examId, data, setModal) => (dispatch) => {
    axiosInstance
        .patch(`paid-exam/replace-question/${examId}`, data)
        .then((res) => {
            setModal(false)
            Toast.success(res.data.message)
            dispatch(getPaidExamQuestion(examId, 'en'))
        })
        .catch((err) =>
            err.response !== undefined
                ? Toast.error(err.response.data.message)
                : Toast.error('Something went wrong')
        )
}

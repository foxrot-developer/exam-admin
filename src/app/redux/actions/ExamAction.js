import axiosInstance from '../../../axios'
export const GET_QUESTION = 'GET_QUESTION'
export const GET_PAID_EXAM = 'GET_PAID_EXAM'
export const EXAM_CLEAR = 'EXAM_CLEAR'

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
                dispatch(getFreeExam(lang))
            })
            .catch((err) => console.log(err))
    }

export const getFreeExam = (lang) => (dispatch) => {
    axiosInstance
        .get('free-exam', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: GET_QUESTION,
                payload: res.data.questions,
            })
        })
        .catch((err) => {
            console.log(err)
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
            dispatch(getFreeExam(lang))
        })
        .catch((err) => console.log(err))
}

export const deleteFreeExam = (id, lang) => (dispatch) => {
    console.log(id)
    axiosInstance
        .delete(`free-exam/delete-question/${id}`)
        .then(() => {
            dispatch(getFreeExam(lang))
        })
        .catch((err) => console.log(err))
}

export const createPaidExam = (exam, setOpen, lang) => (dispatch) => {
    axiosInstance
        .post('paid-exam/add-paid-exam', exam)
        .then((res) => {
            setOpen(false)
            dispatch(getPaidExam(lang))
        })
        .catch((err) => console.log(err))
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
                payload: res.data.paid_exams,
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
        .then(() => {
            setEditMode(false)
            dispatch(getPaidExam(lang))
        })
        .catch((err) => console.log(err))
}

export const deletePaidExam = (id, lang) => (dispatch) => {
    console.log(id)
    axiosInstance
        .delete(`paid-exam/delete-paid-exam/${id}`)
        .then(() => {
            dispatch(getPaidExam(lang))
        })
        .catch((err) => console.log(err))
}

export const createPaidExamQuestion =
    (exam, setOpen, setQuestion, lang) => (dispatch) => {
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
                    image: null,
                })
                dispatch(getPaidQuestion('en'))
            })
            .catch((err) => console.log(err))
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
            console.log(res.data)
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
            .patch(`paid-exam/edit-paid-exam-question/${id}`, exam)
            .then(() => {
                setEditMode(false)
                dispatch(getPaidQuestion(lang))
            })
            .catch((err) => console.log(err))
    }

export const deletePaidQuestion = (id, lang) => (dispatch) => {
    axiosInstance
        .delete(`paid-exam/delete-paid-exam-question/${id}`)
        .then(() => {
            dispatch(getPaidQuestion(lang))
        })
        .catch((err) => console.log(err))
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
            console.log(res.data)
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

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton,
    TableCell,
    Icon,
    Button,
    TextField,
    Box,
    Typography,
    Grid,
} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CustomModal from 'app/components/Custom/Modal'
import { useDispatch } from 'react-redux'
import {
    createImportPaidExam,
    createImproveFreeExam,
} from 'app/redux/actions/ExamAction'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
    },
    btnRoot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    modalContent: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageBtnContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    langSpinner: {
        width: '250px',
    },
}))
const CustomTableCell = ({
    subscriber,
    index,
    setData,
    data,
    removeUser,
    mainQuestion,
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [question, setQuestion] = useState({
        question: subscriber.question,
        question_ar: subscriber.question_ar,
        question_nl: subscriber.question_nl,
        optionA: JSON.parse(subscriber.options)[0],
        optionB: JSON.parse(subscriber.options)[1],
        optionC: JSON.parse(subscriber.options)[2],
        optionA_ar: JSON.parse(subscriber.options_ar)[0],
        optionB_ar: JSON.parse(subscriber.options_ar)[1],
        optionC_ar: JSON.parse(subscriber.options_ar)[2],
        optionA_nl: JSON.parse(subscriber.options_nl)[0],
        optionB_nl: JSON.parse(subscriber.options_nl)[1],
        optionC_nl: JSON.parse(subscriber.options_nl)[2],
        reason: subscriber.reason,
        reason_ar: subscriber.reason_ar,
        reason_nl: subscriber.reason_nl,
        answer: '',
        answer_ar: '',
        answer_nl: '',
        image: '',
    })

    const [circles, setCircles] = useState([])

    const getClickCoords = (event) => {
        var e = event.target
        var dim = e.getBoundingClientRect()
        var x = event.clientX - dim.left
        var y = event.clientY - dim.top
        return [x, y]
    }

    const addCircle = (event) => {
        if (
            circles.length <
            JSON.parse(subscriber.options).filter((a) => a).length
        ) {
            let [x, y] = getClickCoords(event)
            let newCircle = (
                <g id="UrTavla">
                    <circle
                        key={circles.length + 1}
                        cx={x}
                        cy={y}
                        r="20"
                        stroke="black"
                        strokeWidth="1"
                        fill="white"
                    ></circle>
                    <text
                        x={x}
                        y={y}
                        text-anchor="middle"
                        stroke="#51c5cf"
                        stroke-width="2px"
                        dy=".3em"
                    >
                        {circles.length + 1}
                    </text>
                </g>
            )
            let allCircles = [...circles, newCircle]
            setCircles(allCircles)
            setQuestion({
                ...question,
                answer: [
                    ...question.answer,
                    {
                        x: x,
                        y: y,
                        id: circles.length + 1,
                    },
                ],
                answer_ar: [
                    ...question.answer,
                    {
                        x: x,
                        y: y,
                        id: circles.length + 1,
                    },
                ],
                answer_nl: [
                    ...question.answer,
                    {
                        x: x,
                        y: y,
                        id: circles.length + 1,
                    },
                ],
            })
        }
    }

    const { type } = useParams()

    const [isEditMode, setEditMode] = React.useState(false)
    const [dragAbleOpen, setDragAbleOpen] = React.useState(false)
    return (
        <>
            <CustomModal
                open={dragAbleOpen}
                setOpen={() => setDragAbleOpen(false)}
            >
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Select Point</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <svg
                                onClick={addCircle}
                                style={{
                                    width: '750px',
                                    height: '550px',
                                    backgroundImage:
                                        question.image !== null &&
                                        `url(${
                                            question.image !== ''
                                                ? URL.createObjectURL(
                                                      question.image
                                                  )
                                                : subscriber.image
                                        })`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundColor: '#ccc',
                                    backgroundSize: 'cover',
                                    alignSelf: 'center',
                                }}
                            >
                                {circles}
                            </svg>
                        </Grid>
                        <Button
                            onClick={() => {
                                setCircles([])
                                setQuestion({
                                    ...question,
                                    answer: [],
                                    answer_ar: [],
                                    answer_nl: [],
                                })
                            }}
                            variant="outlined"
                        >
                            Reset
                        </Button>

                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    const tempData = mainQuestion
                                    if (subscriber.part === 'part 1') {
                                        tempData.part1[index].answer =
                                            JSON.stringify(question.answer)
                                        tempData.part1[index].answer_ar =
                                            JSON.stringify(question.answer_ar)
                                        tempData.part1[index].answer_nl =
                                            JSON.stringify(question.answer_nl)
                                        setData(tempData)
                                    } else if (subscriber.part === 'part 2') {
                                        tempData.part2[index].answer =
                                            JSON.stringify(question.answer)
                                        tempData.part2[index].answer_ar =
                                            JSON.stringify(question.answer_ar)
                                        tempData.part2[index].answer_nl =
                                            JSON.stringify(question.answer_nl)
                                        setData(tempData)
                                    } else if (subscriber.part === 'part 3') {
                                        tempData.part3[index].answer =
                                            JSON.stringify(question.answer)
                                        tempData.part3[index].answer_ar =
                                            JSON.stringify(question.answer_ar)
                                        tempData.part3[index].answer_nl =
                                            JSON.stringify(question.answer_nl)
                                        setData(tempData)
                                    }
                                    setDragAbleOpen(false)
                                }}
                                variant="contained"
                                style={{
                                    backgroundColor: '#EEBC1D',
                                    fontWeight: '600',
                                    boxShadow: '3px 3px 10px #EEBC1D',
                                    marginBottom: '10px',
                                    padding: '10px',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    </Grid>
                </FormControl>
            </CustomModal>
            <TableCell className="px-0 " align="left">
                <li>{subscriber.part}</li>
                <li>{subscriber.part_ar}</li>
                <li>{subscriber.part_nl}</li>
            </TableCell>
            <TableCell className="px-0 " align="left">
                {JSON.parse(subscriber.options)[0] === 1 ||
                JSON.parse(subscriber.options)[0] === 2 ||
                JSON.parse(subscriber.options)[0] === 3 ||
                JSON.parse(subscriber.options)[1] === 1 ||
                JSON.parse(subscriber.options)[1] === 2 ||
                JSON.parse(subscriber.options)[1] === 3 ||
                JSON.parse(subscriber.options)[2] === 1 ||
                JSON.parse(subscriber.options)[2] === 2 ||
                JSON.parse(subscriber.options)[2] === 3 ||
                JSON.parse(subscriber.options)[1] === '' ||
                JSON.parse(subscriber.options)[1] === null
                    ? 'Draggable'
                    : 'Not Draggable'}
            </TableCell>
            <TableCell className="px-0 " align="left">
                <div>
                    {question.image !== '' && question.image !== undefined ? (
                        <img
                            src={URL.createObjectURL(question.image)}
                            alt=""
                            style={{
                                width: '70px',
                                height: 'auto',
                                aspectRatio: 1,
                            }}
                        />
                    ) : (
                        <a href={subscriber.image} download target="_blank">
                            <img
                                src={subscriber.image}
                                alt=""
                                style={{
                                    width: '70px',
                                    height: 'auto',
                                    aspectRatio: 1,
                                }}
                            />
                        </a>
                    )}
                    <TextField
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        required
                        accept=".jpg, .png, .jpeg"
                        type={'file'}
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                image: e.target.files[0],
                            })
                            const tempData = mainQuestion
                            if (subscriber.part === 'part 1') {
                                tempData.part1[index].image = e.target.files[0]
                                setData(tempData)
                            } else if (subscriber.part === 'part 2') {
                                tempData.part2[index].image = e.target.files[0]
                                setData(tempData)
                            } else if (subscriber.part === 'part 3') {
                                tempData.part3[index].image = e.target.files[0]
                                setData(tempData)
                            }
                        }}
                    />
                </div>
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.question}
                        name="English"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                question: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.question}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.question_ar}
                        name="Arabic"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                question_ar: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.question_ar}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.question_nl}
                        name="Dutch"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                question_nl: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.question_nl}</li>
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionA}
                        name="English"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionA: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionA}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionA_ar}
                        name="Arabic"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionA_ar: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionA_ar}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionA_nl}
                        name="Dutch"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionA_nl: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionA_nl}</li>
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionB}
                        name="English"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionB: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionB}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionB_ar}
                        name="Arabic"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionB_ar: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionB_ar}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionB_nl}
                        name="Dutch"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionB_nl: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionB_nl}</li>
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionC}
                        name="English"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionC: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionC}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionC_ar}
                        name="Arabic"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionC_ar: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionC_ar}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.optionC_nl}
                        name="Dutch"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                optionC_nl: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.optionC_nl}</li>
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {JSON.parse(subscriber.options)[0] === 1 ||
                JSON.parse(subscriber.options)[0] === 2 ||
                JSON.parse(subscriber.options)[0] === 3 ||
                JSON.parse(subscriber.options)[1] === 1 ||
                JSON.parse(subscriber.options)[1] === 2 ||
                JSON.parse(subscriber.options)[1] === 3 ||
                JSON.parse(subscriber.options)[2] === 1 ||
                JSON.parse(subscriber.options)[2] === 2 ||
                JSON.parse(subscriber.options)[2] === 3 ||
                JSON.parse(subscriber.options)[1] === '' ||
                JSON.parse(subscriber.options)[1] === null ? (
                    <img
                        src={
                            question.image !== ''
                                ? URL.createObjectURL(question.image)
                                : subscriber.image
                        }
                        alt=""
                        style={{
                            width: '100%',
                            height: 'auto',
                            aspectRatio: 1,
                        }}
                        onClick={() => {
                            if (question.image !== '') {
                                setDragAbleOpen(true)
                            }
                        }}
                    />
                ) : (
                    <FormControl fullWidth>
                        <InputLabel id="correct-answer">
                            Correct Aswer
                        </InputLabel>
                        <Select
                            labelId="correct-answer"
                            id="correct-answer"
                            label="Correct Answer"
                            value={question.answer}
                            required
                            onChange={(e) => {
                                var indexSub = JSON.parse(
                                    subscriber.options
                                ).indexOf(e.target.value)
                                setQuestion({
                                    ...question,
                                    answer: JSON.parse(subscriber.options)[
                                        indexSub
                                    ],
                                    answer_ar: JSON.parse(
                                        subscriber.options_ar
                                    )[indexSub],
                                    answer_nl: JSON.parse(
                                        subscriber.options_nl
                                    )[indexSub],
                                })
                                if (subscriber.part === 'part 1') {
                                    const tempData = mainQuestion
                                    console.log({
                                        tempData,
                                        index,
                                    })
                                    tempData.part1[index].answer = JSON.parse(
                                        subscriber.options
                                    )[indexSub]
                                    tempData.part1[index].answer_ar =
                                        JSON.parse(subscriber.options_ar)[
                                            indexSub
                                        ]
                                    tempData.part1[index].answer_nl =
                                        JSON.parse(subscriber.options_nl)[
                                            indexSub
                                        ]

                                    setData(tempData)
                                    console.log(tempData)
                                } else if (subscriber.part === 'part 2') {
                                    const tempData = mainQuestion
                                    console.log({
                                        tempData,
                                        index,
                                    })
                                    tempData.part2[index].answer = JSON.parse(
                                        subscriber.options
                                    )[indexSub]
                                    tempData.part2[index].answer_ar =
                                        JSON.parse(subscriber.options_ar)[
                                            indexSub
                                        ]
                                    tempData.part2[index].answer_nl =
                                        JSON.parse(subscriber.options_nl)[
                                            indexSub
                                        ]
                                    setData(tempData)
                                    console.log(tempData)
                                } else if (subscriber.part === 'part 3') {
                                    const tempData = mainQuestion
                                    console.log({
                                        tempData,
                                        index,
                                    })
                                    tempData.part3[index].answer = JSON.parse(
                                        subscriber.options
                                    )[indexSub]
                                    tempData.part3[index].answer_ar =
                                        JSON.parse(subscriber.options_ar)[
                                            indexSub
                                        ]
                                    tempData.part3[index].answer_nl =
                                        JSON.parse(subscriber.options_nl)[
                                            indexSub
                                        ]
                                    setData(tempData)
                                    console.log(tempData)
                                }
                            }}
                        >
                            {JSON.parse(subscriber.options).map(
                                (option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.reason}
                        name="English"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                reason: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.reason}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.reason_ar}
                        name="Arabic"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                reason_ar: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.reason_ar}</li>
                )}
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={question.reason_nl}
                        name="Dutch"
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                reason_nl: e.target.value,
                            })
                        }}
                        className={classes.input}
                    />
                ) : (
                    <li>{question.reason_nl}</li>
                )}
            </TableCell>
            <TableCell align="center" className="px-0">
                <IconButton
                    onClick={() => {
                        const data = new FormData()
                        if (!subscriber.draggable) {
                            data.append('question', question.question)
                            data.append(
                                'options',
                                JSON.stringify([
                                    question.optionA,
                                    question.optionB,
                                    question.optionC,
                                ])
                            )
                            data.append('answer', question.answer)
                            data.append('part', subscriber.part)
                            data.append('question_ar', question.question_ar)
                            data.append(
                                'options_ar',
                                JSON.stringify([
                                    question.optionA_ar,
                                    question.optionB_ar,
                                    question.optionC_ar,
                                ])
                            )
                            data.append('answer_ar', question.answer_ar)
                            data.append('part_ar', subscriber.part_ar)
                            data.append('question_nl', question.question_nl)
                            data.append(
                                'options_nl',
                                JSON.stringify([
                                    question.optionA_nl,
                                    question.optionB_nl,
                                    question.optionC_nl,
                                ])
                            )
                            data.append('answer_nl', question.answer_nl)
                            data.append('part_nl', subscriber.part_nl)
                            data.append('questionImage', question.image)
                            data.append('reason', question.reason)
                            data.append('reason_ar', question.reason_ar)
                            data.append('reason_nl', question.reason_nl)
                            data.append('draggable', subscriber.draggable)
                        } else {
                            data.append('question', question.question)
                            data.append(
                                'options',
                                JSON.stringify([
                                    question.optionA,
                                    question.optionB,
                                    question.optionC,
                                ])
                            )
                            data.append(
                                'answer',
                                JSON.stringify(question.answer)
                            )
                            data.append('part', subscriber.part)
                            data.append('question_ar', question.question_ar)
                            data.append(
                                'options_ar',
                                JSON.stringify([
                                    question.optionA_ar,
                                    question.optionB_ar,
                                    question.optionC_ar,
                                ])
                            )
                            data.append(
                                'answer_ar',
                                JSON.stringify(question.answer_ar)
                            )
                            data.append('part_ar', subscriber.part_ar)
                            data.append('question_nl', question.question_nl)
                            data.append(
                                'options_nl',
                                JSON.stringify([
                                    question.optionA_nl,
                                    question.optionB_nl,
                                    question.optionC_nl,
                                ])
                            )
                            data.append(
                                'answer_nl',
                                JSON.stringify(question.answer_nl)
                            )
                            data.append('part_nl', subscriber.part_nl)
                            data.append('questionImage', question.image)
                            data.append('reason', question.reason)
                            data.append('reason_ar', question.reason_ar)
                            data.append('reason_nl', question.reason_nl)
                            data.append('draggable', subscriber.draggable)
                        }
                        if (type !== 'paid-question') {
                            dispatch(createImproveFreeExam(data))
                        } else {
                            dispatch(createImportPaidExam(data))
                        }
                    }}
                >
                    <Icon>done</Icon>
                </IconButton>
                {isEditMode ? (
                    <IconButton
                        onClick={() => {
                            const tempData = mainQuestion
                            if (subscriber.part === 'part 1') {
                                tempData.part1[index].question =
                                    question.question
                                tempData.part1[index].options = JSON.stringify([
                                    question.optionA,
                                    question.optionB,
                                    question.optionC,
                                ])
                                tempData.part1[index].answer = question.answer
                                tempData.part1[index].question_ar =
                                    question.question_ar
                                tempData.part1[index].options_ar =
                                    JSON.stringify([
                                        question.optionA_ar,
                                        question.optionB_ar,
                                        question.optionC_ar,
                                    ])
                                tempData.part1[index].answer_ar =
                                    question.answer_ar
                                tempData.part1[index].question_nl =
                                    question.question_nl
                                tempData.part1[index].options_nl =
                                    JSON.stringify([
                                        question.optionA_nl,
                                        question.optionB_nl,
                                        question.optionC_nl,
                                    ])
                                tempData.part1[index].answer_nl =
                                    question.answer_nl
                                tempData.part1[index].image = question.image
                                tempData.part1[index].reason = question.reason
                                tempData.part1[index].reason_ar =
                                    question.reason_ar
                                tempData.part1[index].reason_nl =
                                    question.reason_nl
                                tempData.part1[index].draggable =
                                    subscriber.draggable
                            } else if (subscriber.part === 'part 2') {
                                tempData.part2[index].question =
                                    question.question
                                tempData.part2[index].options = JSON.stringify([
                                    question.optionA,
                                    question.optionB,
                                    question.optionC,
                                ])
                                tempData.part2[index].answer = question.answer
                                tempData.part2[index].question_ar =
                                    question.question_ar
                                tempData.part2[index].options_ar =
                                    JSON.stringify([
                                        question.optionA_ar,
                                        question.optionB_ar,
                                        question.optionC_ar,
                                    ])
                                tempData.part2[index].answer_ar =
                                    question.answer_ar
                                tempData.part2[index].question_nl =
                                    question.question_nl
                                tempData.part2[index].options_nl =
                                    JSON.stringify([
                                        question.optionA_nl,
                                        question.optionB_nl,
                                        question.optionC_nl,
                                    ])
                                tempData.part2[index].answer_nl =
                                    question.answer_nl
                                tempData.part2[index].image = question.image
                                tempData.part2[index].reason = question.reason
                                tempData.part2[index].reason_ar =
                                    question.reason_ar
                                tempData.part2[index].reason_nl =
                                    question.reason_nl
                                tempData.part2[index].draggable =
                                    subscriber.draggable
                            } else if (subscriber.part === 'part 3') {
                                tempData.part3[index].question =
                                    question.question
                                tempData.part3[index].options = JSON.stringify([
                                    question.optionA,
                                    question.optionB,
                                    question.optionC,
                                ])
                                tempData.part3[index].answer = question.answer
                                tempData.part3[index].question_ar =
                                    question.question_ar
                                tempData.part3[index].options_ar =
                                    JSON.stringify([
                                        question.optionA_ar,
                                        question.optionB_ar,
                                        question.optionC_ar,
                                    ])
                                tempData.part3[index].answer_ar =
                                    question.answer_ar
                                tempData.part3[index].question_nl =
                                    question.question_nl
                                tempData.part3[index].options_nl =
                                    JSON.stringify([
                                        question.optionA_nl,
                                        question.optionB_nl,
                                        question.optionC_nl,
                                    ])
                                tempData.part3[index].answer_nl =
                                    question.answer_nl
                                tempData.part3[index].image = question.image
                                tempData.part3[index].reason = question.reason
                                tempData.part3[index].reason_ar =
                                    question.reason_ar
                                tempData.part3[index].reason_nl =
                                    question.reason_nl
                                tempData.part3[index].draggable =
                                    subscriber.draggable
                            }
                            setEditMode(false)
                        }}
                    >
                        <Icon>save</Icon>2
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setEditMode(true)}>
                        <Icon>edit</Icon>
                    </IconButton>
                )}
                <IconButton
                    onClick={() => removeUser(subscriber.id, subscriber.part)}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </TableCell>
        </>
    )
}

export default CustomTableCell

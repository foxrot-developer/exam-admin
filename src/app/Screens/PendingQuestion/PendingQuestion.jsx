import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    responsiveFontSizes,
    Select,
    Typography,
} from '@material-ui/core'
import { Box, Grid } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CSVReader from 'react-csv-reader'
import './PendingQuestion.css'
import { SimpleCard } from 'app/components'
import PaginationTable from './components/PaginationTable'
import CustomModal from 'app/components/Custom/Modal'
import CustomButton from 'app/components/Custom/CustomButton'
import useDownloader from 'react-use-downloader'
import { useHistory, useParams } from 'react-router-dom'
import {
    approveAllImportFreeExam,
    approveAllImportPaidExam,
} from 'app/redux/actions/ExamAction'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        backgroundColor: palette.background.default,
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
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

const PendingQuestion = () => {
    const { type } = useParams()
    const classes = useStyles()
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })
    const [csvData, setCsvData] = useState({
        english: {
            part1: [],
            part2: [],
            part3: [],
        },
        arabic: {
            part1: [],
            part2: [],
            part3: [],
        },
        netherlands: {
            part1: [],
            part2: [],
            part3: [],
        },
    })

    const [mainQuestion, setMainQuestion] = useState({
        part1: [],
        part2: [],
        part3: [],
    })

    const [activePart, setActivePart] = useState({
        part1: true,
        part2: false,
        part3: false,
    })

    const { size, elapsed, percentage, download, cancel, error, isInProgress } =
        useDownloader()

    const englishPart = ['part 1', 'part 2', 'part 3']
    const arabicPart = ['الجزء 1', 'الجزء 2', 'الجزء 3']
    const netherlandsPart = ['Deel 1', 'Deel 2', 'Deel 3']

    const handleFiles = (data, fileInfo) => {
        console.log({ data, csvData })
        if (language.isEnglish) {
            if (activePart.part1) {
                setCsvData({
                    ...csvData,
                    english: {
                        ...csvData.english,
                        part1: data,
                    },
                })
            } else if (activePart.part2) {
                setCsvData({
                    ...csvData,
                    english: {
                        ...csvData.english,
                        part2: data,
                    },
                })
            } else if (activePart.part3) {
                setCsvData({
                    ...csvData,
                    english: {
                        ...csvData.english,
                        part3: data,
                    },
                })
            }
        } else if (language.isArabic) {
            if (activePart.part1) {
                setCsvData({
                    ...csvData,
                    arabic: {
                        ...csvData.arabic,
                        part1: data,
                    },
                })
            } else if (activePart.part2) {
                setCsvData({
                    ...csvData,
                    arabic: {
                        ...csvData.arabic,
                        part2: data,
                    },
                })
            } else if (activePart.part3) {
                setCsvData({
                    ...csvData,
                    arabic: {
                        ...csvData.arabic,
                        part3: data,
                    },
                })
            }
        } else if (language.isNetherlands) {
            if (activePart.part1) {
                setCsvData({
                    ...csvData,
                    netherlands: {
                        ...csvData.netherlands,
                        part1: data,
                    },
                })
            } else if (activePart.part2) {
                setCsvData({
                    ...csvData,
                    netherlands: {
                        ...csvData.netherlands,
                        part2: data,
                    },
                })
            } else if (activePart.part3) {
                setCsvData({
                    ...csvData,
                    netherlands: {
                        ...csvData.netherlands,
                        part3: data,
                    },
                })
            }
        }
    }
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    return (
        <Box component="div" className={classes.root}>
            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Import Question
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                component="div"
                                className={classes.languageBtnContainer}
                            >
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isEnglish
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: true,
                                            isArabic: false,
                                            isNetherlands: false,
                                        })
                                    }}
                                >
                                    English
                                </Button>
                                <Button
                                    dis
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isArabic
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: false,
                                            isArabic: true,
                                            isNetherlands: false,
                                        })
                                    }}
                                >
                                    Arabic
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isNetherlands
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: false,
                                            isArabic: false,
                                            isNetherlands: true,
                                        })
                                    }}
                                >
                                    Netherland
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Part
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    defaultValue={0}
                                    onChange={(e) => {
                                        if (e.target.value === 0) {
                                            setActivePart({
                                                part1: true,
                                                part2: false,
                                                part3: false,
                                            })
                                        } else if (e.target.value === 1) {
                                            setActivePart({
                                                part1: false,
                                                part2: true,
                                                part3: false,
                                            })
                                        } else {
                                            setActivePart({
                                                part1: false,
                                                part2: false,
                                                part3: true,
                                            })
                                        }
                                    }}
                                    required
                                >
                                    {language.isEnglish
                                        ? englishPart.map((part, index) => (
                                              <MenuItem
                                                  key={index}
                                                  value={index}
                                              >
                                                  {part}
                                              </MenuItem>
                                          ))
                                        : language.isArabic
                                        ? arabicPart.map((part, index) => (
                                              <MenuItem
                                                  key={index}
                                                  value={index}
                                              >
                                                  {part}
                                              </MenuItem>
                                          ))
                                        : language.isNetherlands
                                        ? netherlandsPart.map((part, index) => (
                                              <MenuItem
                                                  key={index}
                                                  value={index}
                                              >
                                                  {part}
                                              </MenuItem>
                                          ))
                                        : null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <CSVReader
                            cssClass="react-csv-input"
                            label="Select CSV with secret Death Star statistics"
                            onFileLoaded={handleFiles}
                            parserOptions={{
                                header: true,
                                dynamicTyping: true,
                                skipEmptyLines: true,
                                transformHeader: (header) =>
                                    header.toLowerCase().replace(/\W/g, '_'),
                            }}
                        />
                        {/* question_nl,option1_nl,option2_nl,option3_nl,reason_nl,image_nl */}
                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    var part1 = []
                                    var part2 = []
                                    var part3 = []
                                    if (csvData.english.part1.length > 0) {
                                        for (let i = 0; i < 25; i++) {
                                            part1.push({
                                                id: i,
                                                question:
                                                    csvData.english.part1[i]
                                                        .question,
                                                options: JSON.stringify([
                                                    csvData.english.part1[i]
                                                        .option1,
                                                    csvData.english.part1[i]
                                                        .option2,
                                                    csvData.english.part1[i]
                                                        .option3,
                                                ]),
                                                answer: '',
                                                reason: csvData.english.part1[
                                                    i
                                                ].reason
                                                    .replace(
                                                        /(\r\n|\n|\r)/gm,
                                                        ''
                                                    )
                                                    .trim(),
                                                reason_nl:
                                                    csvData.netherlands.part1[
                                                        i
                                                    ].reason_nl.replace(
                                                        /(\r\n|\n|\r)/gm,
                                                        ''
                                                    ),
                                                reason_ar: csvData.arabic.part1[
                                                    i
                                                ].reason_ar
                                                    .replace(
                                                        /(\r\n|\n|\r)/gm,
                                                        ''
                                                    )
                                                    .trim(),
                                                part: englishPart[0],
                                                question_ar:
                                                    csvData.arabic.part1[i]
                                                        .question_ar,
                                                options_ar: JSON.stringify([
                                                    csvData.arabic.part1[i]
                                                        .option1_ar,
                                                    csvData.arabic.part1[i]
                                                        .option2_ar,
                                                    csvData.arabic.part1[i]
                                                        .option3_ar,
                                                ]),
                                                answer_ar: '',
                                                part_ar: arabicPart[0],
                                                question_nl:
                                                    csvData.netherlands.part1[i]
                                                        .question_nl,
                                                options_nl: JSON.stringify([
                                                    csvData.netherlands.part1[i]
                                                        .option1_nl,
                                                    csvData.netherlands.part1[i]
                                                        .option2_nl,
                                                    csvData.netherlands.part1[i]
                                                        .option3_nl,
                                                ]),
                                                answer_nl: '',
                                                part_nl: netherlandsPart[0],
                                                draggable: false,
                                                image: csvData.english.part1[i]
                                                    .image,
                                            })
                                        }
                                    }
                                    for (
                                        let i = 0;
                                        i < csvData.english.part2.length;
                                        i++
                                    ) {
                                        part2.push({
                                            id: i,
                                            question:
                                                csvData.english.part2[i]
                                                    .question,
                                            options: JSON.stringify([
                                                csvData.english.part2[i]
                                                    .option1,
                                                csvData.english.part2[i]
                                                    .option2 !== null
                                                    ? csvData.english.part2[i]
                                                          .option2
                                                    : '',
                                                csvData.english.part2[i]
                                                    .option3 !== null
                                                    ? csvData.english.part2[i]
                                                          .option3
                                                    : '',
                                            ]),
                                            answer: '',
                                            reason: csvData.english.part2[
                                                i
                                            ].reason
                                                .replace(/(\r\n|\n|\r)/gm, '')
                                                .trim(),
                                            reason_nl:
                                                csvData.netherlands.part2[
                                                    i
                                                ].reason_nl
                                                    .replace(
                                                        /(\r\n|\n|\r)/gm,
                                                        ''
                                                    )
                                                    .trim(),
                                            reason_ar: csvData.arabic.part2[i]
                                                .reason_ar
                                                ? csvData.arabic.part2[
                                                      i
                                                  ].reason_ar
                                                      .replace(
                                                          /(\r\n|\n|\r)/gm,
                                                          ''
                                                      )
                                                      .trim()
                                                : '',
                                            part: englishPart[1],
                                            question_ar:
                                                csvData.arabic.part2[i]
                                                    .question_ar,
                                            options_ar: JSON.stringify([
                                                csvData.arabic.part2[i]
                                                    .option1_ar,
                                                csvData.arabic.part2[i]
                                                    .option2_ar !== null
                                                    ? csvData.arabic.part2[i]
                                                          .option2_ar
                                                    : '',
                                                csvData.arabic.part2[i]
                                                    .option3_ar !== null
                                                    ? csvData.arabic.part2[i]
                                                          .option3_ar
                                                    : '',
                                            ]),
                                            answer_ar: '',
                                            part_ar: arabicPart[1],
                                            question_nl:
                                                csvData.netherlands.part2[i]
                                                    .question_nl,
                                            options_nl: JSON.stringify([
                                                csvData.netherlands.part2[i]
                                                    .option1_nl,
                                                csvData.netherlands.part2[i]
                                                    .option2_nl !== null
                                                    ? csvData.netherlands.part2[
                                                          i
                                                      ].option2_nl
                                                    : '',
                                                csvData.netherlands.part2[i]
                                                    .option3_nl !== null
                                                    ? csvData.netherlands.part2[
                                                          i
                                                      ].option3_nl
                                                    : '',
                                            ]),
                                            answer_nl: '',
                                            part_nl: netherlandsPart[1],
                                            draggable:
                                                csvData.english.part2[i]
                                                    .option1 === 1 ||
                                                csvData.english.part2[i]
                                                    .option1 === 2 ||
                                                csvData.english.part2[i]
                                                    .option1 === 3 ||
                                                csvData.english.part2[i]
                                                    .option2 === 1 ||
                                                csvData.english.part2[i]
                                                    .option2 === 2 ||
                                                csvData.english.part2[i]
                                                    .option2 === 3 ||
                                                csvData.english.part2[i]
                                                    .option3 === 1 ||
                                                csvData.english.part2[i]
                                                    .option3 === 2 ||
                                                csvData.english.part2[i]
                                                    .option3 === 3 ||
                                                csvData.english.part2[i]
                                                    .option2 === '' ||
                                                csvData.english.part2[i]
                                                    .option2 === null,
                                            image: csvData.english.part2[i]
                                                .image,
                                        })
                                    }
                                    for (
                                        let i = 0;
                                        i < csvData.english.part3.length;
                                        i++
                                    ) {
                                        part3.push({
                                            id: i,
                                            question:
                                                csvData.english.part3[i]
                                                    .question,
                                            options: JSON.stringify([
                                                csvData.english.part3[i]
                                                    .option1,
                                                csvData.english.part3[i]
                                                    .option2 !== null
                                                    ? csvData.english.part3[i]
                                                          .option2
                                                    : '',
                                                csvData.english.part3[i]
                                                    .option2 !== null
                                                    ? csvData.english.part3[i]
                                                          .option3
                                                    : '',
                                            ]),
                                            answer: '',
                                            part: englishPart[2],
                                            reason: csvData.english.part3[
                                                i
                                            ].reason
                                                .replace(/(\r\n|\n|\r)/gm, '')
                                                .trim(),
                                            reason_nl:
                                                csvData.netherlands.part3[
                                                    i
                                                ].reason_nl
                                                    .replace(
                                                        /(\r\n|\n|\r)/gm,
                                                        ''
                                                    )
                                                    .trim(),
                                            reason_ar: csvData.arabic.part3[i]
                                                .reason_ar
                                                ? csvData.arabic.part3[
                                                      i
                                                  ].reason_ar
                                                      .replace(
                                                          /(\r\n|\n|\r)/gm,
                                                          ''
                                                      )
                                                      .trim()
                                                : '',
                                            question_ar:
                                                csvData.arabic.part3[i]
                                                    .question_ar,
                                            options_ar: JSON.stringify([
                                                csvData.arabic.part3[i]
                                                    .option1_ar,
                                                csvData.arabic.part3[i]
                                                    .option2_ar !== null
                                                    ? csvData.arabic.part3[i]
                                                          .option2_ar
                                                    : '',
                                                csvData.arabic.part3[i]
                                                    .option3_ar !== null
                                                    ? csvData.arabic.part3[i]
                                                          .option3_ar
                                                    : '',
                                            ]),
                                            draggable:
                                                csvData.english.part3[i]
                                                    .option1 === 1 ||
                                                csvData.english.part3[i]
                                                    .option1 === 2 ||
                                                csvData.english.part3[i]
                                                    .option1 === 3 ||
                                                csvData.english.part3[i]
                                                    .option2 === 1 ||
                                                csvData.english.part3[i]
                                                    .option2 === 2 ||
                                                csvData.english.part3[i]
                                                    .option2 === 3 ||
                                                csvData.english.part3[i]
                                                    .option3 === 1 ||
                                                csvData.english.part3[i]
                                                    .option3 === 2 ||
                                                csvData.english.part3[i]
                                                    .option3 === 3 ||
                                                csvData.english.part3[i]
                                                    .option2 === '' ||
                                                csvData.english.part3[i]
                                                    .option2 === null,
                                            answer_ar: '',
                                            part_ar: arabicPart[2],
                                            question_nl:
                                                csvData.netherlands.part3[i]
                                                    .question_nl,
                                            options_nl: JSON.stringify([
                                                csvData.netherlands.part3[i]
                                                    .option1_nl,
                                                csvData.netherlands.part3[i]
                                                    .option2_nl !== null
                                                    ? csvData.netherlands.part3[
                                                          i
                                                      ].option2_nl
                                                    : '',
                                                csvData.netherlands.part3[i]
                                                    .option3_nl !== null
                                                    ? csvData.netherlands.part3[
                                                          i
                                                      ].option3_nl
                                                    : '',
                                            ]),
                                            answer_nl: '',
                                            part_nl: netherlandsPart[2],
                                            image: csvData.english.part3[i]
                                                .image,
                                        })
                                    }

                                    setMainQuestion({
                                        part1,
                                        part2,
                                        part3,
                                    })
                                    console.log({ part1, part3, part2 })
                                    setOpen(false)
                                }}
                                variant="contained"
                                // disabled={
                                //     csvData.english.part1.length === 0 ||
                                //     csvData.english.part2.length === 0 ||
                                //     csvData.english.part3.length === 0 ||
                                //     csvData.arabic.part1.length === 0 ||
                                //     csvData.arabic.part2.length === 0 ||
                                //     csvData.arabic.part3.length === 0 ||
                                //     csvData.netherlands.part1.length === 0 ||
                                //     csvData.netherlands.part2.length === 0 ||
                                //     csvData.netherlands.part3.length === 0
                                // }
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
                                Import
                            </Button>
                        </Box>
                    </Grid>
                </FormControl>
            </CustomModal>

            <CustomButton
                eventHandler={() => {
                    setOpen(true)
                }}
                title="Import CSV"
            />
            <CustomButton
                eventHandler={() => {
                    var formData = new FormData()
                    mainQuestion.part1.forEach((item, index) => {
                        formData.append('questionImages', item.image)
                    })
                    mainQuestion.part2.forEach((item, index) => {
                        formData.append('questionImages', item.image)
                    })
                    mainQuestion.part3.forEach((item, index) => {
                        formData.append('questionImages', item.image)
                    })
                    const allQuestion = [
                        ...mainQuestion.part1,
                        ...mainQuestion.part2,
                        ...mainQuestion.part3,
                    ]
                    console.log(allQuestion)
                    formData.append('questions', JSON.stringify(allQuestion))
                    // if (type !== 'paid-question')
                    // dispatch(approveAllImportFreeExam(formData))
                    // else
                    dispatch(approveAllImportPaidExam(formData))
                    setMainQuestion({
                        part1: [],
                        part2: [],
                        part3: [],
                    })
                }}
                title="Approve All"
            />
            <SimpleCard title="Part 1">
                <PaginationTable
                    data={mainQuestion.part1}
                    setData={setMainQuestion}
                    mainQuestion={mainQuestion}
                />
            </SimpleCard>
            <SimpleCard title="Part 2">
                <PaginationTable
                    data={mainQuestion.part2}
                    setData={setMainQuestion}
                    mainQuestion={mainQuestion}
                />
            </SimpleCard>
            <SimpleCard title="Part 3">
                <PaginationTable
                    data={mainQuestion.part3}
                    setData={setMainQuestion}
                    mainQuestion={mainQuestion}
                />
            </SimpleCard>
        </Box>
    )
}

export default PendingQuestion

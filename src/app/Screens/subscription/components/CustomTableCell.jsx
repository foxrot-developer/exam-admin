import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton,
    TableCell,
    Icon,
    Grid,
    Typography,
    Box,
    Button,
    TableRow,
} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CustomModal from 'app/components/Custom/Modal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { styled } from '@mui/material/styles'
import { packageStatus } from 'app/redux/actions/PackageActions'
import { useDispatch } from 'react-redux'
import { Add, ArrowForward, Delete } from '@material-ui/icons'
import { ListItemText, TextField } from '@mui/material'

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
    noPadding: {
        padding: 0,
    },
}))

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '100%',
}))

const CustomTableCell = ({ subscriber, removeUser, updateData, lang }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    const [description, setDescription] = React.useState('')
    const [packages, setPackage] = useState({
        package_name: '',
        price: '',
        description: [],
        duration: '',
        no_exam: '',
        repeat: '',
        langs: [],
        package_name_ar: '',
        price_ar: '',
        description_ar: [],
        duration_ar: '',
        langs_ar: [],
        package_name_nl: '',
        price_nl: '',
        description_nl: [],
        duration_nl: '',
        langs_nl: [],
    })

    const [isOpen, setIsOpen] = React.useState(false)
    const englishDuration = ['day', 'week', 'month', 'year']
    const arabicDuration = ['يوم', 'أسبوع', 'شهر', 'سنة']
    const netherlandsDuration = ['dag', 'week', 'maand', 'jaar']

    useEffect(() => {
        if (subscriber !== undefined && subscriber !== null) {
            console.log({ subscriber: subscriber })
            if (lang === 'en') {
                var index = englishDuration.indexOf(subscriber.duration)
                setPackage({
                    package_name: subscriber.package_name,
                    price: subscriber.price,
                    description: JSON.parse(subscriber.description),
                    duration: subscriber.duration,
                    no_exam: subscriber.no_exam,
                    repeat: subscriber.repeat,
                    langs: JSON.parse(subscriber.langs),
                    package_name_ar: '',
                    price_ar: '',
                    description_ar: [],
                    duration_ar: arabicDuration[index],
                    langs_ar: [],
                    package_name_nl: '',
                    price_nl: '',
                    description_nl: [],
                    duration_nl: netherlandsDuration[index],
                    langs_nl: [],
                })
            } else if (lang === 'ar') {
                var index = arabicDuration.indexOf(subscriber.duration_ar)
                setPackage({
                    package_name: '',
                    price: '',
                    description: [],
                    duration: englishDuration[index],
                    no_exam: '',
                    repeat: '',
                    langs: [],
                    package_name_ar: subscriber.package_name,
                    price_ar: subscriber.price,
                    description_ar: JSON.parse(subscriber.description),
                    duration_ar: subscriber.duration,
                    langs_ar: JSON.parse(subscriber.langs),
                    package_name_nl: '',
                    price_nl: '',
                    description_nl: [],
                    duration_nl: netherlandsDuration[index],
                    langs_nl: [],
                })
            } else if (lang === 'nl') {
                var index = netherlandsDuration.indexOf(subscriber.duration_nl)
                setPackage({
                    package_name: '',
                    price: '',
                    description: [],
                    duration: englishDuration[index],
                    no_exam: '',
                    repeat: '',
                    langs: [],
                    package_name_ar: '',
                    price_ar: '',
                    description_ar: [],
                    duration_ar: arabicDuration[index],
                    langs_ar: [],
                    package_name_nl: subscriber.package_name,
                    price_nl: subscriber.price,
                    description_nl: JSON.parse(subscriber.description),
                    duration_nl: subscriber.duration,
                    langs_nl: JSON.parse(subscriber.langs),
                })
            }
        }
    }, [subscriber])

    return (
        <>
            <CustomModal open={isOpen} setOpen={setIsOpen}>
                <Grid container spacing={2}>
                    <Typography variant="h6">Update Package</Typography>
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
                    <TextField
                        margin="dense"
                        fullWidth
                        id="outlined-basic"
                        label="Package Name"
                        variant="outlined"
                        value={
                            language.isEnglish
                                ? packages.package_name
                                : language.isArabic
                                ? packages.package_name_ar
                                : packages.package_name_nl
                        }
                        onChange={(e) => {
                            if (language.isEnglish) {
                                setPackage({
                                    ...packages,
                                    package_name: e.target.value,
                                })
                            } else if (language.isArabic) {
                                setPackage({
                                    ...packages,
                                    package_name_ar: e.target.value,
                                })
                            } else if (language.isNetherlands) {
                                setPackage({
                                    ...packages,
                                    package_name_nl: e.target.value,
                                })
                            }
                        }}
                        required
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        id="outlined-basic"
                        label="Price"
                        type="number"
                        variant="outlined"
                        value={
                            language.isEnglish
                                ? packages.price
                                : language.isArabic
                                ? packages.price_ar
                                : packages.price_nl
                        }
                        onChange={(e) => {
                            setPackage({
                                ...packages,
                                price: e.target.value,
                                price_ar: e.target.value,
                                price_nl: e.target.value,
                            })
                        }}
                        required
                    />
                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Duration
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Duration"
                            margin="dense"
                            value={
                                language.isEnglish
                                    ? packages.duration
                                    : language.isArabic
                                    ? packages.duration_ar
                                    : packages.duration_nl
                            }
                            onChange={(e) => {
                                var index = englishDuration.indexOf(
                                    e.target.value
                                )
                                setPackage({
                                    ...packages,
                                    duration: englishDuration[index],
                                    duration_ar: arabicDuration[index],
                                    duration_nl: netherlandsDuration[index],
                                })
                            }}
                            required
                        >
                            {language.isEnglish
                                ? englishDuration.map((part, index) => (
                                      <MenuItem key={index} value={part}>
                                          {part}
                                      </MenuItem>
                                  ))
                                : language.isArabic
                                ? arabicDuration.map((part, index) => (
                                      <MenuItem key={index} value={part}>
                                          {part}
                                      </MenuItem>
                                  ))
                                : language.isNetherlands
                                ? netherlandsDuration.map((part, index) => (
                                      <MenuItem key={index} value={part}>
                                          {part}
                                      </MenuItem>
                                  ))
                                : null}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        fullWidth
                        id="outlined-basic"
                        label="No of Exams"
                        variant="outlined"
                        type="number"
                        value={packages.no_exam}
                        onChange={(e) => {
                            setPackage({
                                ...packages,
                                no_exam: e.target.value,
                            })
                        }}
                        required
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        id="outlined-basic"
                        label="Repeat"
                        variant="outlined"
                        type="number"
                        value={packages.repeat}
                        onChange={(e) =>
                            setPackage({ ...packages, repeat: e.target.value })
                        }
                        required
                    />

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Exam Languages
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            multiple
                            onChange={(e) => {
                                console.log(e.target.value)
                                if (language.isEnglish) {
                                    setPackage({
                                        ...packages,
                                        langs: e.target.value,
                                    })
                                } else if (language.isArabic) {
                                    setPackage({
                                        ...packages,
                                        langs_ar: e.target.value,
                                    })
                                } else if (language.isNetherlands) {
                                    setPackage({
                                        ...packages,
                                        langs_nl: e.target.value,
                                    })
                                }
                            }}
                            label="Supperted Languages"
                            value={
                                language.isEnglish
                                    ? packages.langs
                                    : language.isArabic
                                    ? packages.langs_ar
                                    : packages.langs_nl
                            }
                            className={classes.noPadding}
                            required
                        >
                            <MenuItem value={'en'}>English</MenuItem>
                            <MenuItem value={'ar'}>Arabic</MenuItem>
                            <MenuItem value={'nl'}>Netherland</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            <TextField
                                margin="dense"
                                fullWidth
                                id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            item
                            xs={1}
                        >
                            <IconButton
                                onClick={() => {
                                    if (description.length > 0) {
                                        if (language.isEnglish) {
                                            setPackage({
                                                ...packages,
                                                description: [
                                                    ...packages.description,
                                                    description,
                                                ],
                                            })
                                            setDescription('')
                                        } else if (language.isArabic) {
                                            setPackage({
                                                ...packages,
                                                description_ar: [
                                                    ...packages.description_ar,
                                                    description,
                                                ],
                                            })
                                            setDescription('')
                                        } else if (language.isNetherlands) {
                                            setPackage({
                                                ...packages,
                                                description_nl: [
                                                    ...packages.description_nl,
                                                    description,
                                                ],
                                            })
                                            setDescription('')
                                        }
                                    }
                                }}
                                edge="end"
                                aria-label="add"
                            >
                                <Add />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Demo>
                        <List dense={true}>
                            {language.isEnglish
                                ? packages.description.map((item, index) => (
                                      <ListItem
                                          secondaryAction={
                                              <IconButton
                                                  onClick={() => {
                                                      setPackage({
                                                          ...packages,
                                                          description:
                                                              packages.description.filter(
                                                                  (i) =>
                                                                      i !== item
                                                              ),
                                                      })
                                                  }}
                                                  edge="end"
                                                  aria-label="delete"
                                              >
                                                  <Delete />
                                              </IconButton>
                                          }
                                      >
                                          <ListItemAvatar>
                                              <ArrowForward />
                                          </ListItemAvatar>
                                          <ListItemText primary={item} />
                                      </ListItem>
                                  ))
                                : language.isArabic
                                ? packages.description_ar.map((item, index) => (
                                      <ListItem
                                          secondaryAction={
                                              <IconButton
                                                  onClick={() => {
                                                      setPackage({
                                                          ...packages,
                                                          description_ar:
                                                              packages.description_ar.filter(
                                                                  (i) =>
                                                                      i !== item
                                                              ),
                                                      })
                                                  }}
                                              >
                                                  <Delete />
                                              </IconButton>
                                          }
                                      >
                                          <ListItemAvatar>
                                              <ArrowForward />
                                          </ListItemAvatar>
                                          <ListItemText primary={item} />
                                      </ListItem>
                                  ))
                                : language.isNetherlands
                                ? packages.description_nl.map((item, index) => (
                                      <ListItem
                                          secondaryAction={
                                              <IconButton
                                                  onClick={() => {
                                                      setPackage({
                                                          ...packages,
                                                          description_nl:
                                                              packages.description_nl.filter(
                                                                  (i) =>
                                                                      i !== item
                                                              ),
                                                      })
                                                  }}
                                              >
                                                  <Delete />
                                              </IconButton>
                                          }
                                      >
                                          <ListItemAvatar>
                                              <ArrowForward />
                                          </ListItemAvatar>
                                          <ListItemText primary={item} />
                                      </ListItem>
                                  ))
                                : null}
                        </List>
                    </Demo>
                    <Box component="div" className={classes.modalContent}>
                        <Button
                            onClick={() => {
                                if (lang === 'en') {
                                    updateData(packages, subscriber.id)
                                } else {
                                    updateData(packages, subscriber.enid, lang)
                                }
                            }}
                            variant="contained"
                            disabled={language.isNetherlands ? false : true}
                            style={{
                                backgroundColor: '#EEBC1D',
                                fontWeight: '600',
                                boxShadow: '0px 0px 10px #EEBC1D',
                                marginBottom: '10px',
                            }}
                        >
                            Update
                        </Button>
                    </Box>
                </Grid>
            </CustomModal>
            <TableRow key={subscriber.id}>
                <TableCell colSpan={3}>{subscriber.package_name}</TableCell>
                <TableCell>{subscriber.price}</TableCell>
                <TableCell>{subscriber.duration}</TableCell>
                <TableCell>{subscriber?.no_exam}</TableCell>
                <TableCell align="center">
                    <>
                        <IconButton
                            onClick={() => {
                                if (lang === 'en') {
                                    removeUser(subscriber.id, lang)
                                } else {
                                    removeUser(subscriber.enid, lang)
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                        <IconButton onClick={() => setIsOpen(true)}>
                            <Icon>edit</Icon>
                        </IconButton>
                        {subscriber.active ? (
                            <IconButton
                                onClick={() => {
                                    if (lang === 'en') {
                                        dispatch(
                                            packageStatus(subscriber.id, false)
                                        )
                                    } else {
                                        dispatch(
                                            packageStatus(
                                                subscriber.enid,
                                                false
                                            )
                                        )
                                    }
                                }}
                            >
                                <Icon>lock_open</Icon>
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    if (lang === 'en') {
                                        dispatch(
                                            packageStatus(subscriber.id, true)
                                        )
                                    } else {
                                        dispatch(
                                            packageStatus(subscriber.enid, true)
                                        )
                                    }
                                }}
                            >
                                <Icon>lock</Icon>
                            </IconButton>
                        )}
                    </>
                </TableCell>
            </TableRow>
        </>
    )
}

export default CustomTableCell

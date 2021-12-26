import React, { useState } from 'react'
import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import { Add, ArrowBack, ArrowForward, Delete } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import PaginationTable from './components/PaginationTable'
import { createPackage, getPackageList } from 'app/redux/actions/PackageActions'
import CustomModal from 'app/components/Custom/Modal'
import { ListItemText, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'

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

const Subscription = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [isOpen, setIsOpen] = React.useState(false)
    const [description, setDescription] = React.useState('')
    const packageList = useSelector((state) => state.package.packageList)
    console.log({ packageList })
    const [packages, setPackage] = useState({
        package_name: '',
        price: '',
        description: [],
        duration: '',
        no_exam: '',
        repeat: '',
        langs: [],
        interval: '',
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

    const onCreateHandler = () => {
        if (language.isNetherlands) {
            const data = {
                package_name: packages.package_name,
                price: packages.price,
                description: JSON.stringify(packages.description),
                duration: packages.duration,
                no_exam: packages.no_exam,
                repeat: packages.repeat,
                interval: packages.interval,
                langs: JSON.stringify(packages.langs),
                package_name_ar: packages.package_name_ar,
                price_ar: packages.price_ar,
                description_ar: JSON.stringify(packages.description_ar),
                duration_ar: packages.duration_ar,
                langs_ar: JSON.stringify(packages.langs_ar),
                package_name_nl: packages.package_name_nl,
                price_nl: packages.price_nl,
                description_nl: JSON.stringify(packages.description_nl),
                duration_nl: packages.duration_nl,
                langs_nl: JSON.stringify(packages.langs_nl),
            }

            dispatch(createPackage(data, setIsOpen, lang))
        } else if (language.isEnglish) {
            setLanguage({
                isEnglish: false,
                isArabic: true,
                isNetherlands: false,
            })
        } else if (language.isArabic) {
            setLanguage({
                isEnglish: false,
                isArabic: false,
                isNetherlands: true,
            })
        }
    }
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    React.useEffect(() => {
        dispatch(getPackageList('en'))
    }, [])

    const englishDuration = ['day', 'week', 'month', 'year']
    const arabicDuration = ['يوم', 'أسبوع', 'شهر', 'سنة']
    const netherlandsDuration = ['dag', 'week', 'maand', 'jaar']

    const [lang, setLang] = useState('en')

    return (
        <Box component="div" className={classes.root}>
            <CustomModal open={isOpen} setOpen={setIsOpen}>
                <Grid container spacing={2}>
                    <Typography variant="h6">Create Package</Typography>
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
                    <TextField
                        margin="dense"
                        fullWidth
                        id="outlined-basic"
                        label="Interval"
                        type="number"
                        max={12}
                        variant="outlined"
                        value={packages.interval}
                        onChange={(e) => {
                            setPackage({
                                ...packages,
                                interval: e.target.value,
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
                            onClick={onCreateHandler}
                            variant="contained"
                            disabled={
                                packages.package_name === '' ||
                                packages.price === '' ||
                                packages.description.length === 0 ||
                                packages.duration === '' ||
                                packages.no_exam === '' ||
                                packages.repeat === '' ||
                                packages.langs.length === 0 ||
                                packages.package_name_ar === '' ||
                                packages.price_ar === '' ||
                                packages.description_ar.length === 0 ||
                                packages.duration_ar === '' ||
                                packages.langs_ar.length === 0 ||
                                packages.package_name_nl === '' ||
                                packages.price_nl === '' ||
                                packages.description_nl.length === 0 ||
                                packages.duration_nl === '' ||
                                packages.langs_nl.length === 0
                                    ? true
                                    : false
                            }
                            style={{
                                backgroundColor: '#EEBC1D',
                                fontWeight: '600',
                                boxShadow: '0px 0px 10px #EEBC1D',
                                marginBottom: '10px',
                            }}
                        >
                            Create
                        </Button>
                    </Box>
                </Grid>
            </CustomModal>
            <Box component="div" mb={4} className={classes.btnRoot}>
                <IconButton
                    onClick={() => {
                        window.history.back()
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4">Packages</Typography>
            </Box>
            <Box component="div" className={classes.btnContainer}>
                <FormControl className={classes.langSpinner}>
                    <InputLabel id="demo-simple-select-label">
                        Language
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Language"
                        value={lang}
                        onChange={(e) => {
                            setLang(e.target.value)
                            dispatch(getPackageList(e.target.value))
                        }}
                        required
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'ar'}>Arabic</MenuItem>
                        <MenuItem value={'nl'}>Netherland</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    variant="contained"
                    style={{
                        backgroundColor: '#EEBC1D',
                        fontWeight: '600',
                        boxShadow: '3px 3px 10px #EEBC1D',
                        marginBottom: '10px',
                        alignSelf: 'flex-end',
                    }}
                >
                    Create Package
                </Button>
            </Box>
            <SimpleCard title="List">
                <PaginationTable data={packageList} lang={lang} />
            </SimpleCard>
        </Box>
    )
}

export default Subscription

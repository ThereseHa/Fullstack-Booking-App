import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Grid, Button, Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { red } from '@mui/material/colors'

export default function ResponsiveDateTimePickers() {
    const [availableTimes, setAvailableTimes] = useState([])
    const [selectedDateTime, setSelectedDateTime] = useState(null)
    const [bookedTimes, setBookedTimes] = useState([])

    useEffect(() => {
        fetchBookedTimes()
    }, [])

    useEffect(() => {
        if (selectedDateTime) {
            fetchAvailableTimes(selectedDateTime)
        }
    }, [selectedDateTime])

    const fetchAvailableTimes = async (dateTime) => {
        try {
            const formattedDateTime = dateTime.toISOString()
            const response = await axios.get(
                'http://localhost:8800/available-times',
                {
                    params: {
                        date: formattedDateTime
                    }
                }
            )
            const { availableTimes, bookedTimes } = response.data
            setAvailableTimes(availableTimes)
            setBookedTimes(bookedTimes)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchBookedTimes = async () => {
        try {
            const response = await axios.get('http://localhost:8800/bookings')
            const bookedTimes = response.data.map(
                (booking) => booking.booking_date
            )
            setBookedTimes(bookedTimes)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDateChange = (newDate) => {
        setSelectedDateTime(newDate)
        fetchAvailableTimes(newDate)
    }

    const handleTimeClick = async (time) => {
        if (!selectedDateTime) {
            alert('Välj först ett datum.')
            return
        }

        const selectedDateTimeCopy = new Date(selectedDateTime)
        selectedDateTimeCopy.setHours(parseInt(time.slice(0, 2)), 0, 0)

        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        if (selectedDateTimeCopy < currentDate) {
            alert('Du kan inte boka tider i det förflutna.')
            return
        }

        try {
            await axios.post('http://localhost:8800/bookings', {
                dateTime: selectedDateTimeCopy.toISOString()
            })

            fetchBookedTimes()
            alert('Bokningen lyckades!')
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(error.response.data.error)
            } else {
                console.error(error)
                alert('Ett fel uppstod vid bokningen.')
            }
        }
    }

    const handleDeleteClick = async (time) => {
        try {
            await axios.delete('http://localhost:8800/bookings', {
                data: { dateTime: time }
            })
            fetchBookedTimes()
            alert('Bokningen raderades!')
        } catch (error) {
            console.error(error)
            alert('Ett fel uppstod vid radering av bokningen.')
        }
    }

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Välj Datum och Tid</Typography>
                    <Box mt={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar onChange={handleDateChange} />
                        </LocalizationProvider>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5">Tillgängliga Tider:</Typography>
                    {availableTimes.length > 0 ? (
                        availableTimes.map((time) => {
                            const isBooked = bookedTimes.some(
                                (bookedTime) =>
                                    format(new Date(bookedTime), 'HH:mm') ===
                                    time
                            )

                            return (
                                <Button
                                    key={time}
                                    onClick={() => handleTimeClick(time)}
                                    disabled={isBooked}
                                    variant="contained"
                                    sx={{
                                        mr: 1,
                                        mt: 1,
                                        color: isBooked ? 'white' : 'inherit',
                                        backgroundColor: isBooked
                                            ? red[500]
                                            : 'primary.main',
                                        '&:disabled': {
                                            backgroundColor: red[500],
                                            opacity: 0.5
                                        }
                                    }}
                                >
                                    {time}
                                </Button>
                            )
                        })
                    ) : (
                        <Typography sx={{ mt: 1 }}>
                            Välj datum för att se tillgängliga tider.
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5">Bokade Tider:</Typography>
                    {bookedTimes.map((time) => (
                        <Box
                            key={time}
                            display="flex"
                            alignItems="center"
                            sx={{ mt: 1 }}
                        >
                            <Typography>
                                {format(new Date(time), 'yyyy-MM-dd HH:mm')}
                            </Typography>
                            <IconButton
                                onClick={() => handleDeleteClick(time)}
                                size="small"
                                sx={{ ml: 1 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    )
}

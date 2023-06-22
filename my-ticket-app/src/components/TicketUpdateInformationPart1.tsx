import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, TimePicker, InputNumber, Input, Button } from 'antd';


import "./review.css";
import dayjs, { Dayjs } from 'dayjs';


const { TextArea } = Input;



function TicketUpdateInformationPart1({ formTicketInformation, setTicketInformation, activeStep, setActiveStep, steps }: any) {
    const { valueEventDate, valueEventTime, valueVenue, valueTicketPrice } = formTicketInformation


    const onChangedate: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log(dateString);
        // setValue_EventDate(dateString);
        setTicketInformation({ ...formTicketInformation, valueEventDate: dateString });
    };

    const onChangetime: TimePickerProps['onChange'] = (time, timeString) => {
        // console.log(timeString);
        // setValue_EventTime(timeString);
        setTicketInformation({ ...formTicketInformation, valueEventTime: timeString });
    };
    const onChangeprice = (value: any) => {
        // console.log('changed', value);
        setTicketInformation({ ...formTicketInformation, valueTicketPrice: value });
    };
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                handleBack();
                return newLoadings;
            });
        }, 3000);
    };

    const enterLoadingnext = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                activeStep === steps.length ? handleSubmit() : handleNext();
                return newLoadings;
            });
        }, 3000);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        window.location.href = "/"
    };
    const handleSubmit = () => {
        // console.log("Submit");
    };



    return (

        <Box
            id='boxFrame'
        >

            <Box
                id='ticketFormFrame'
                sx={{ marginTop: 9 }}
            >


                <Typography id='textTopic'>
                    Update Ticket Information
                </Typography >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>

                        <Typography id='textSubTopic' variant="h6" gutterBottom >
                            Event Date
                        </Typography>
                        <DatePicker
                            size={'large'}
                            style={{ width: '100%', height: '50%' }}
                            defaultValue={dayjs(dayjs(valueEventDate, 'YYYY-MM-DD').isValid()
                                ? valueEventDate : dayjs().format('YYYY-MM-DD'), 'YYYY-MM-DD')}
                            onChange={onChangedate}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Event Time
                        </Typography>
                        <TimePicker
                            size={'large'}
                            style={{ width: '100%', height: '50%' }}
                            defaultValue={dayjs(dayjs(valueEventTime, 'HH:mm:ss').isValid()
                                ? valueEventDate : dayjs().format('HH:mm:ss'), 'HH:mm:ss')}
                            onChange={onChangetime}
                        />

                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Venue
                        </Typography>
                        <TextArea
                            value={valueVenue}

                            onChange={(e) => setTicketInformation({ ...formTicketInformation, valueVenue: e.target.value })}
                            placeholder="Please enter Venue"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Ticket Price
                        </Typography>
                        <InputNumber
                            size={'large'}
                            style={{ width: '100%', height: '40%', textAlign: 'center' }}
                            defaultValue={0.00}
                            value={valueTicketPrice}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            onChange={onChangeprice}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Container
                maxWidth="md"
                sx={{ marginTop: 5 }}
            >
                <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <Grid container >
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type="primary"
                                    style={{ width: '80%', backgroundColor: 'red' }}
                                    loading={loadings[0]}
                                    onClick={() => enterLoading(0)}
                                >
                                    Back
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type="primary"
                                    style={{ width: '80%', backgroundColor: 'green' }}
                                    loading={loadings[1]}
                                    onClick={() => enterLoadingnext(1)}
                                >
                                    Next
                                </Button>
                            </div>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{ width: '100%', marginTop: 5 }}>
                <Stepper activeStep={activeStep - 1} alternativeLabel >
                    {steps.map((label: any) => (
                        <Step
                            key={label}
                            sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: 'secondary.dark', // circle color (COMPLETED)
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'grey.500', // Just text label (COMPLETED)
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: 'secondary.main', // circle color (ACTIVE)
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'common.white', // Just text label (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: 'common.white', // circle's number (ACTIVE)
                                },
                            }}>
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

            </Box>
            <br />
        </Box>
    );

} export default TicketUpdateInformationPart1
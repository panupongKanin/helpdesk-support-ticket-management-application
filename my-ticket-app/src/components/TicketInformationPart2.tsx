import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import type { DatePickerProps } from 'antd';
import { DatePicker, TimePicker, InputNumber, Input, Button } from 'antd';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2

import "./sTicket.css";


const { TextArea } = Input;



function TicketInformationPart1({ formTicketInformation, setTicketInformation, activeStep, setActiveStep, steps }: any) {
    const { valueEventDate, valueEventTime, valueVenue, valueTicketPrice, valueSales, valueRestrictions, valueTermsConditions } = formTicketInformation

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
                submit();
                return newLoadings;
            });
        }, 3000);
    };



    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    async function submit() {
        // Data ที่จะนำไปบันทึกลงในตาราง REVIEW
        let data = {
            EventDate: valueEventDate,
            EventTime: valueEventTime,
            Venue: valueVenue,
            TicketPrice: valueTicketPrice,
            Sales: valueSales,
            Restrictions: valueRestrictions,
            TermsConditions: valueTermsConditions,
        };


        const apiUrl = "http://localhost:8080/CreatTicketInformation";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Done");
                    handleNext();

                    // Alert การบันทึกสำเส็จ
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    });

                } else {
                    console.log(res.error);
                    
                    console.log("Error");
                    Swal.fire({
                        // Display Back-end text response 
                        icon: 'error',
                        title: res.error.split(";")[0],
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
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
                    Ticket Information
                </Typography >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Sales
                        </Typography>
                        <TextArea
                            value={valueSales}
                            onChange={(e) => setTicketInformation({ ...formTicketInformation, valueSales: e.target.value })}
                            placeholder="Please enter Sales"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Restrictions
                        </Typography>
                        <TextArea
                            value={valueRestrictions}
                            onChange={(e) => setTicketInformation({ ...formTicketInformation, valueRestrictions: e.target.value })}
                            placeholder="Please enter Restrictions"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Terms Conditions
                        </Typography>
                        <TextArea
                            value={valueTermsConditions}
                            onChange={(e) => setTicketInformation({ ...formTicketInformation, valueTermsConditions: e.target.value })}
                            placeholder="Please enter Terms Conditions"
                            autoSize={{ minRows: 2, maxRows: 5 }}
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
                                <Button type="primary" style={{ width: '80%', backgroundColor: 'red' }} loading={loadings[0]} onClick={() => enterLoading(0)}>
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
                                    Save
                                </Button>
                            </div>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{ width: '100%', marginTop: 5}}>
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

} export default TicketInformationPart1
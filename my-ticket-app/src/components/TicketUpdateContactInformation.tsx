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

function TicketUpdateContactInformation({ formContactInformation, setContactInformation, activeStep, setActiveStep, steps }: any) {
    const { ContactInformationID, Email, Phone, Address } = formContactInformation
    const [loadings, setLoadings] = useState<boolean[]>([]);

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
                submitEdit();
                return newLoadings;
            });
        }, 3000);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    async function submitEdit() {
        // Data ที่จะนำไปอัพเดทข้อมูลลงในตาราง TicketInformation
        let data = {
            ID: ContactInformationID,
            Email: Email,
            Phone: Phone,
            Address: Address,
        };

        const apiUrl = "http://localhost:8080/updateContactInformation";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    handleNext();

                    // Alert การบันทึกสำเส็จ
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    });

                } else {
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
                    Update Contact Information
                </Typography >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Email
                        </Typography>
                        <TextArea
                            value={Email}
                            onChange={(e) => setContactInformation({ ...formContactInformation, Email: e.target.value })}
                            placeholder="Please enter Venue"
                            autoSize={{ minRows: 2, maxRows: 3 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Phone
                        </Typography>
                        <TextArea
                            value={Phone}
                            onChange={(e) => setContactInformation({ ...formContactInformation, Phone: e.target.value })}
                            placeholder="Please enter Venue"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Address
                        </Typography>
                        <TextArea
                            value={Address}
                            onChange={(e) => setContactInformation({ ...formContactInformation, Address: e.target.value })}
                            placeholder="Please enter Venue"
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

                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type="primary"
                                    style={{ width: '40%', backgroundColor: 'green' }}
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
            <Box sx={{ width: '100%', marginTop: 5, marginBottom: 5 }}>
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

} export default TicketUpdateContactInformation
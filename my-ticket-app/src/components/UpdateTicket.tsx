import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import type { DatePickerProps } from 'antd';
import { DatePicker, TimePicker, InputNumber, Input, Button, Select } from 'antd';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2

import "./sTicket.css";


const { TextArea } = Input;



function UpdateTicket({ formSubmitTicket, setSubmitTicket, formTicketInformation, formContactInformation, activeStep, setActiveStep, steps }: any) {
    const { TicketID, Title, Description, Status } = formSubmitTicket
    const { TicketInformationID } = formTicketInformation
    const { ContactInformationID } = formContactInformation

    const [ticketInformationID, setTicketInformationID] = useState('');
    const [contactInformationID, setContactInformationID] = useState('');

    const [ticketStatus, setticketStatus] = React.useState<any[]>([]);

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

    const handleChangeStatus = (value: string) => {
        setSubmitTicket({ ...formSubmitTicket, Status: value });
    };

    const handleClear = () => {
        formSubmitTicket.Title = '';
        formSubmitTicket.Description = '';
        formSubmitTicket.Status = null;
        formTicketInformation.valueEventDate = '';
        formTicketInformation.valueEventTime = '';
        formTicketInformation.valueVenue = '';
        formTicketInformation.valueTicketPrice = null;
        formTicketInformation.valueSales = '';
        formTicketInformation.valueRestrictions = '';
        formTicketInformation.valueTermsConditions = '';
        formContactInformation.Email = '';
        formContactInformation.Phone = '';
        formContactInformation.Address = '';
    };

    const getTicketStatus = async () => {
        const apiUrl = "http://localhost:8080/statuses";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setticketStatus(res.data);
                }
            });
    };
    useEffect(() => {
        getTicketStatus();
    }, []);



    async function submitEdit() {
        // Data ที่จะนำไปอัพเดทข้อมูลลงในตาราง TicketInformation
        let data = {
            ID: TicketID,
            TicketInformationID: TicketInformationID,
            ContactInformationID: ContactInformationID,
            StatusID: Status,
            Title: Title,
            Description: Description,
        };

        console.log(data);


        const apiUrl = "http://localhost:8080/updateTicket";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Done");
                    handleClear();
                    // Alert การบันทึกสำเส็จ
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1500)

                } else {
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
                    Update Ticket
                </Typography >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Title
                        </Typography>
                        <TextArea
                            value={Title}
                            onChange={(e) => setSubmitTicket({ ...formSubmitTicket, Title: e.target.value })}
                            placeholder="Please enter Venue"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <TextArea
                            value={Description}
                            onChange={(e) => setSubmitTicket({ ...formSubmitTicket, Description: e.target.value })}
                            placeholder="Please enter Venue"
                            autoSize={{ minRows: 5, maxRows: 10 }}
                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography id='textSubTopic' variant="h6" gutterBottom>
                            Status
                        </Typography>
                        <Select
                            size="large"
                            style={{ width: '100%', height: '50%' }}
                            defaultValue={Status}
                            onChange={handleChangeStatus}
                            options={ticketStatus.map((item) => {
                                return {
                                    value: item.ID,
                                    label: item.StatusName,
                                };
                            })}
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

} export default UpdateTicket
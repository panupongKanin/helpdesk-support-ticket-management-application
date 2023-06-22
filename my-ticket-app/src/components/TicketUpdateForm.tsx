import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Ticket from './Ticket';
import Testlayout from './Testlayout';
import { Box } from '@mui/system';
import "./review.css";
import TicketUpdateInformationPart1 from './TicketUpdateInformationPart1';
import TicketUpdateInformationPart2 from './TicketUpdateInformationPart2';
import TicketUpdateContactInformation from './TicketUpdateContactInformation';
import UpdateTicket from './UpdateTicket';

const steps = [
    'Ticket Information [1]',
    'Ticket Information [2]',
    'Contact Information',
    'Submit Ticket',
];

const defaultDataTicketInformation = {
    TicketInformationID: "",
    valueEventDate: "",
    valueEventTime: "",
    valueVenue: "",
    valueTicketPrice: null,
    valueSales: "",
    valueRestrictions: "",
    valueTermsConditions: "",
};

const defaultDataContactInformation = {
    ContactInformationID: "",
    Email: "",
    Phone: "",
    Address: "",
};

const defaultDataSubmitTicket = {
    TicketID:"",
    Title: "",
    Description: "",
    Status: null,
};


function TicketUpdateForm() {

    const [formTicketInformation, setTicketInformation] = useState(defaultDataTicketInformation)
    const [formContactInformation, setContactInformation] = useState(defaultDataContactInformation)
    const [formSubmitTicket, setSubmitTicket] = useState(defaultDataSubmitTicket)
    const [activeStep, setActiveStep] = React.useState(1);

    const recordID = parseInt(localStorage.getItem("recordID") + "");

    console.log(formSubmitTicket);


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <Testlayout />

        } else if (activeStep === 1) {
            return <TicketUpdateInformationPart1 formTicketInformation={formTicketInformation} setTicketInformation={setTicketInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 2) {
            return <TicketUpdateInformationPart2 formTicketInformation={formTicketInformation} setTicketInformation={setTicketInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 3) {
            return <TicketUpdateContactInformation formContactInformation={formContactInformation} setContactInformation={setContactInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 4) {
            return <UpdateTicket formSubmitTicket={formSubmitTicket} setSubmitTicket={setSubmitTicket} formTicketInformation={formTicketInformation} formContactInformation={formContactInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
        }
    }

    const getTicketByID = async () => {
        const apiUrl = `http://localhost:8080/GetTicket/${recordID}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("wejkfhwijhffwe", res.data.TicketInformationID);

                    setTicketInformation({
                        ...formTicketInformation,
                        TicketInformationID: res.data.TicketInformationID,
                        valueEventDate: res.data.TicketInformation.EventDate,
                        valueEventTime: res.data.TicketInformation.EventTime,
                        valueVenue: res.data.TicketInformation.Venue,
                        valueTicketPrice: res.data.TicketInformation.TicketPrice,
                        valueSales: res.data.TicketInformation.Sales,
                        valueRestrictions: res.data.TicketInformation.Restrictions,
                        valueTermsConditions: res.data.TicketInformation.TermsConditions
                    });
                    setContactInformation({
                        ...formContactInformation,
                        ContactInformationID: res.data.ContactInformationID,
                        Email: res.data.ContactInformation.Email,
                        Phone: res.data.ContactInformation.Phone,
                        Address: res.data.ContactInformation.Address,
                    });
                    setSubmitTicket({
                        ...formSubmitTicket,
                        TicketID: res.data.ID,
                        Title: res.data.Title,
                        Description: res.data.Description,
                        Status: res.data.StatusID,
                    });
                }
            });
    };


    useEffect(() => {
        getTicketByID();
    }, []);


    return (

        <div className="app">
            <CssBaseline />
            <Box
                display="flex"
                width="160vh"
                alignItems="center"
            >
                <div style={{ flex: '30%' }}>
                    {/* Left Section */}
                    <div >
                        <Ticket formTicketInformation={formTicketInformation} formContactInformation={formContactInformation} formSubmitTicket={formSubmitTicket} />
                    </div>
                </div>
                <div style={{ flex: '70%' }}>
                    {/* Right Section */}
                    <form className='form-container'>
                        {/* <Ticket  /> */}
                        <div className='text-start'>{PageDisplay()}</div>
                    </form >
                </div>
            </Box>
        </div>
    );

} export default TicketUpdateForm
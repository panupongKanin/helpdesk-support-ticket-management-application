import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import ContactInformation from './ContactInformation';
import SubmitTicket from './SubmitTicket';

import TicketInformationPart1 from './TicketInformationPart1';
import TicketInformationPart2 from './TicketInformationPart2';
import Ticket from './Ticket';
import Testlayout from './Testlayout';
import { Box, margin } from '@mui/system';
import "./sTicket.css";



const steps = [
    'Ticket Information [1]',
    'Ticket Information [2]',
    'Contact Information',
    'Submit Ticket',
];

const defaultDataTicketInformation = {
    valueEventDate: "",
    valueEventTime: "",
    valueVenue: "",
    valueTicketPrice: null,
    valueSales: "",
    valueRestrictions: "",
    valueTermsConditions: "",
};

const defaultDataContactInformation = {
    Email: "",
    Phone: "",
    Address: "",
};

const defaultDataSubmitTicket = {
    Title: "",
    Description: "",
    Status: null,
};


function TicketForm() {

    const [formTicketInformation, setTicketInformation] = useState(defaultDataTicketInformation)
    const [formContactInformation, setContactInformation] = useState(defaultDataContactInformation)
    const [formSubmitTicket, setSubmitTicket] = useState(defaultDataSubmitTicket)
    const [activeStep, setActiveStep] = React.useState(1);

    console.log(formSubmitTicket);


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <Testlayout />

        } else if (activeStep === 1) {
            return <TicketInformationPart1 formTicketInformation={formTicketInformation} setTicketInformation={setTicketInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 2) {
            return <TicketInformationPart2 formTicketInformation={formTicketInformation} setTicketInformation={setTicketInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 3) {
            return <ContactInformation formContactInformation={formContactInformation} setContactInformation={setContactInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 4) {
            return <SubmitTicket formSubmitTicket={formSubmitTicket} setSubmitTicket={setSubmitTicket} formTicketInformation={formTicketInformation} formContactInformation={formContactInformation} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
        }
    }

    return (

        <Box
            display="flex"
            width="140vh"
        >
            <div style={{ flex: '30%' }}>
                {/* Left Section */}
                <div style={{ marginTop: '21vh', paddingRight: 10 }}>
                    <Ticket formTicketInformation={formTicketInformation} formContactInformation={formContactInformation} formSubmitTicket={formSubmitTicket} />
                </div>
            </div>
            <div style={{ flex: '70%' }}>
                {/* Right Section */}
                <div >
                    <div className='text-start'>{PageDisplay()}</div>
                </div>

            </div>
        </Box>

    );

} export default TicketForm
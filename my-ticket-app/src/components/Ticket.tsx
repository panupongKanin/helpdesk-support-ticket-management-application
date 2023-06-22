import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ticket.css';

function Ticket({ formTicketInformation, formContactInformation, formSubmitTicket }: any) {
    const { valueEventDate, valueEventTime, valueVenue, valueTicketPrice, valueSales, valueRestrictions, valueTermsConditions } = formTicketInformation
    const { Email, Phone, Address} = formContactInformation
    const { Title, Description, Status} = formSubmitTicket
    const [ticketStatusShow, setticketStatusShow] = useState('');
    console.log("ByID: ",ticketStatusShow);

    const getTicketStatusByID = async () => {
        const apiUrl = `http://localhost:8080/status/${Status}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setticketStatusShow(res.data.StatusName);
                    
                }
                
                
            });
    };
    useEffect(() => {
        getTicketStatusByID();
    }, [getTicketStatusByID()]);
    return (
        <Box>
            <Box sx={{ maxWidth: '24rem' }}>
                <article className="ticket">
                    <header className="ticket__wrapper">
                        <div className="ticket__header">
                            {Title}
                        </div>
                    </header>
                    <div className="ticket__divider">
                        <div className="ticket__notch"></div>
                        <div className="ticket__notch ticket__notch--right"></div>
                    </div>
                    <div className="ticket__body">
                        <section className="ticket__section">
                            <h3>Description</h3>
                            <p>{Description}</p>
                    
                        </section>
                        <section className="ticket__section">
                            <h3>Ticket Information</h3>
                            <h4> Event Date : {valueEventDate}</h4>
                            <h4> Event Time : {valueEventTime}</h4>
                            <p>Venue : {valueVenue}</p>
                            <p>Sales : {valueSales}</p>
                            <p>Restrictions : {valueRestrictions}</p>
                            <p>Terms Conditions : {valueTermsConditions}</p>
                        </section>
                        <section className="ticket__section">
                            <h3>Contact Information</h3>
                            <p>{Email}</p>
                            <p>{Phone}</p>
                            <p>{Address}</p>
      
                        </section>
                        <section className="ticket__section">
                            <h3>Status</h3>
                            <p>{ticketStatusShow}</p>
                        </section>
                    </div>
                    <footer className="ticket__footer">
                        <span>Ticket Price</span>
                        <span>$ {valueTicketPrice}</span>
                    </footer>
                </article>
            </Box>
        </Box>
    );
}

export default Ticket;

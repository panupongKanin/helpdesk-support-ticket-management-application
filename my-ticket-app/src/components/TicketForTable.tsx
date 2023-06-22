import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ticket.css';

function TicketForTable({ record }: any) {
    console.log('record',record);

    return (
        <Box>
            <Box sx={{ maxWidth: '24rem' }}>
                <article className="ticket">
                    <header className="ticket__wrapper">
                        <div className="ticket__header">
                            # {record.Title}
                        </div>
                    </header>
                    <div className="ticket__divider">
                        <div className="ticket__notch"></div>
                        <div className="ticket__notch ticket__notch--right"></div>
                    </div>
                    <div className="ticket__body">
                        <section className="ticket__section">
                            <h3>Description</h3>
                            <p>{record.Description}</p>

                        </section>
                        <section className="ticket__section">
                            <h3>Ticket Information</h3>
                            <h4> Event Date : {record.TicketInformation.EventDate}</h4>
                            <h4> Event Time : {record.TicketInformation.EventTime}</h4>
                            <p>Venue : {record.TicketInformation.Venue}</p>
                            <p>Sales : {record.TicketInformation.Sales}</p>
                            <p>Restrictions : {record.TicketInformation.Restrictions}</p>
                            <p>Terms Conditions : {record.TicketInformation.TermsConditions}</p>
                        </section>
                        <section className="ticket__section">
                            <h3>Contact Information</h3>
                            <p>{record.ContactInformation.Email}</p>
                            <p>{record.ContactInformation.Phone}</p>
                            <p>{record.ContactInformation.Address}</p>

                        </section>
                        <section className="ticket__section">
                            <h3>Status</h3>
                            <p>{record.Status.StatusName}</p>
                        </section>
                    </div>
                    <footer className="ticket__footer">
                        <span>Ticket Price</span>
                        <span>$ {record.TicketInformation.TicketPrice}</span>
                    </footer>
                </article>
            </Box>
        </Box>
    );
}

export default TicketForTable;

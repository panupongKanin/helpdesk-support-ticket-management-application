import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketForm from "./components/TicketForm";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import TicketShow from "./components/TicketShow";
import TicketUpdateForm from "./components/TicketUpdateForm";

export default function App() {
  return (
    <div className="app">
      <Router>
        <AppBar id="appbar" position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            // onClick={handleOpen}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              id="textAppBar"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              My Ticket
            </Typography>
            {/* <Button id="buttonSignOutInAppBar" onClick={signout}>
            Sign Out
          </Button> */}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<TicketShow />} />
          <Route path="/TicketForm" element={<TicketForm />} />
          <Route path="/TicketUpdateForm" element={<TicketUpdateForm />} />

        </Routes>

      </Router>
    </div>

  );

}
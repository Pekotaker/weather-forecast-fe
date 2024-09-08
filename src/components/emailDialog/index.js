import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Container,
} from "@mui/material";

const EmailDialog = ({
  loading,
  email,
  setEmail,
  city,
  setCity,
  open,
  handleClose,
  handleConfirm,
}) => {
  // Handle the input change
  const handleEmailChange = (e) => {
    setEmail(document.getElementById("email-input-textfield").value);
  };

  const handleCityChange = (e) => {
    setCity(document.getElementById("city-input-textfield").value);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Enter Your Email</DialogTitle>
      {loading ? (
        <>
          <DialogContent>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Container>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent>
            <TextField
              id="email-input-textfield"
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              id="city-input-textfield"
              autoFocus
              margin="dense"
              label="City"
              type="city"
              fullWidth
              variant="outlined"
              value={city}
              onChange={handleCityChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EmailDialog;

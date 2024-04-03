import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Make sure to import the icons you need. For example, if you're using a CloseIcon, import it from @mui/icons-material

interface CarInfo {
  id: string; // Assuming you have an id field to uniquely identify a case
  plateNumber: string;
  model: string;
  color: string;
  owner: string;
  accidentDescription: string;
  title: string; // Assuming title is a property that exists within CarInfo
}

interface CaseResolutionComponentProps {
  caseDetails: CarInfo;
  onResolve: (id: string) => void;
}

const CaseResolutionComponent: React.FC<CaseResolutionComponentProps> = ({ caseDetails, onResolve }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResolve = () => {
    onResolve(caseDetails.id); // Make sure the CarInfo interface has an 'id' field
    handleClose();
  };

  return (
    <>
      <Box>
        <Typography variant="h6">{caseDetails.title}</Typography>
        {/* Other details about the case */}
        
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Resolve Case
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Resolve this case?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to mark this case as resolved? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleResolve} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default CaseResolutionComponent;

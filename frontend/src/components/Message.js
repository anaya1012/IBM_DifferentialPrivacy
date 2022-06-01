import React from 'react';
// import PropTypes from 'prop-types';
// import Alert from 'react-bootstrap/Alert'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

import CloseIcon from '@mui/icons-material/Close';

const Message = ({ msg , openState}) => {
  const [open, setOpen] = React.useState(openState);
  return (
  //   <div class="alert alert-info alert-dismissible fade show" role="alert">
  //   {msg}
  //   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  //     <span aria-hidden="true">&times;</span>
  //   </button>
  // </div>

  <Box sx={{ width: '100%' }}>
  <Collapse in={open}>
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {msg}
    </Alert>
   </Collapse> 
  
</Box>

  );
};

// Message.propTypes = {
//   msg: PropTypes.string.isRequired
// };

export default Message;
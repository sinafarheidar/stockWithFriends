import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DeleteStockModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const id = props.id

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteStock = (e) => {
      e.preventDefault()

      axios.delete(`http://localhost:8000/stock/delete/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      window.location = '/'
  }
  return (
    <div>
      <Button size="small" variant='outlined' color='secondary' onClick={handleOpen}>Delete Stock</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography>Are you sure you want to delete {props.stock}?</Typography>
            <hr></hr>
            <Button variant='outlined' color='secondary' onClick={deleteStock}>Yes</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
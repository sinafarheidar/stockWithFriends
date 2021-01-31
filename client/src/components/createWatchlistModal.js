import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UserModal() {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [watchList, setWatchList] = useState('')
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const userId = currentUser._id
  const userName = currentUser.name


  const changeWatchList = e => {
    setWatchList(e.target.value)
    console.log('Id: ', userId)
    console.log('Name: ', userName)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postToDB = (e) => {
    e.preventDefault()

    const watchlist = {
      name: watchList,
      id: userId,
      creator: userName
    }

    axios.post('http://localhost:8000/watchlist/add', watchlist)
    .then(res => window.location = '/')
    .catch(err => alert('Watchlist Name Taken'))
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography varient='h1' component='h2'>Create a Watchlist - This will create a tab for your Watch List</Typography>

      <form onSubmit={postToDB}>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <TextField id="standard-basic" label="Watch List Name" onChange={changeWatchList}/>
        </Grid>
      </Grid>
      <br></br>
      <Button type='submit' variant='contained' color='primary'>Submit</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>Create New WatchList</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

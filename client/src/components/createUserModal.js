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
    width: 400,
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
  const [username, setUsername] = useState('')
  const [watchList, setWatchList] = useState('')

  const changeUsername = e => {
    setUsername(e.target.value)
  }

  const changeWatchList = e => {
    setWatchList(e.target.value)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doIt = (e) => {
    e.preventDefault()
    console.log(username)
    console.log(watchList)

    const user = {
      username: username,
      watchlist: watchList
    }

    axios.post('http://localhost:5000/user/add', user)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    window.location = '/'
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography varient='h1' component='h2'>Create a New User - This will create a tab for your Watch List</Typography>

      <form onSubmit={doIt}>
      <Grid container spacing={4}>
        <Grid item xs>
        <TextField id="standard-basic" label="Name" onChange={changeUsername}/>
        </Grid>

        <Grid item xs>
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
      <Button color="inherit" onClick={handleOpen}>Create New User</Button>
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

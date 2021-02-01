import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
  const [userWatchlist, setUserWatchlist] = useState([])
  const [deletedList, setDeletedList] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const userId = currentUser._id
  const userName = currentUser.name

  useEffect(() => {

      axios.get(`http://localhost:8000/watchlist/id/${userId}`)
      .then(res => {
        setUserWatchlist(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const changeWatchList = e => {
    setWatchList(e.target.value)
    console.log(userWatchlist)
    console.log(deletedList)
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

  const handleChange = (event) => {
    setDeletedList(event.target.value);
  };

  const deleteList = () => {
    axios.delete(`http://localhost:8000/watchlist/delete-watchlist/${deletedList}`)
    .then(res => window.location = '/')
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant='h5' component='h2'>Create a New Watchlist, Or Delete an Existing Watchlist</Typography>
      <br />
      <form onSubmit={postToDB}>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <TextField id="standard-basic" label="Watch List Name" onChange={changeWatchList} style={{width: '100%', marginBottom: '2%'}}/>
        
        <Button type='submit' variant='outlined' color='primary'>Create <img src="https://img.icons8.com/nolan/30/create-order.png" alt='Create Icon' style={{ marginLeft: '5px' }}/></Button>
        </Grid>

<br/>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <InputLabel id="demo-simple-select-label">Watchlists</InputLabel>
        <Select
          color='secondary'
          value={deletedList}
          onChange={handleChange}
          style={{width: '100%', marginBottom: '2%'}}
        >
        
          {userWatchlist.map(list => {
            return (
            <MenuItem value={list.name}>{list.name}</MenuItem>
            )
          })}
        </Select>
        <Button variant='outlined' color='secondary' onClick={deleteList}>Delete List <img src="https://img.icons8.com/nolan/30/delete-forever.png" alt='Delete Icon' style={{ marginLeft: '5px' }} /></Button>
        </Grid>
      </Grid>
      <br></br>
      </form>
    </div>
  );

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>Edit Your WatchLists</Button>
      <Button color="inherit" disabled>|</Button>
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

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

export default function UserModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [symbol, setSymbol] = useState('')
    const [target, setTarget] = useState(0)
    const [stop, setStop] = useState(0)
    const [description, setDescription] = useState('')

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const date = mm + '-' + dd + '-' + yyyy;

    const username = props.username
    const changeSymbol = e => {
        setSymbol(e.target.value)
    }

    const changeTarget = e => {
        setTarget(e.target.value)
    }

    const changeStop = e => {
        setStop(e.target.value)
    }

    const changeDescription = e => {
        setDescription(e.target.value)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitStock = (e) => {
        e.preventDefault()

        const stock = {
            user: username,
            symbol: symbol,
            target: target,
            stop: stop,
            description: description,
            date: date
        }

        axios.post('http://localhost:5000/stock/add-stock', stock)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        window.location = '/'
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Typography varient='h1' component='h2'>Add a New Stock to Your Watchlist {props.username}! - This will show up in your Watch List</Typography>
            <form onSubmit={submitStock}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <TextField id="standard-basic" label="Stock Symbol: AAPL" onChange={changeSymbol} />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField id="standard-basic" label="Target Price: 200" onChange={changeTarget} />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField id="standard-basic" label="Stop Price: 150" onChange={changeStop} />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                        <TextField style={{ width: '100%' }} id="outlined-multiline-static" label="Description" multiline rows={4} variant="outlined" onChange={changeDescription} />
                    </Grid>
                </Grid>
                <br></br>
                <Button type='submit' variant='contained' color='primary'>Add Stock</Button>
            </form>
        </div>
    );

    return (
        <div>
            <Button color="primary" variant='outlined' onClick={handleOpen}>Add Stock to {props.username}'s watchlist</Button>
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

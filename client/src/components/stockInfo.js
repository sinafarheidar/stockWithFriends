import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import StockChart from './stockChart'
const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
}));


export default function StockInfo() {

    const classes = useStyles();

    // const polygonKey = "S6Kq5dCf9r4uqH7MiF0tb7dFZxWWc13i"
    // const finnKey = 'bvsh2nf48v6s45olu1kg'
    // const [stockinfo, setStockinfo] = useState([])
    // const [openclose, setOpenclose] = useState([])
    // const [sellbuy, setSellbuy] = useState([])

    // const stock = window.location.href.substring(48)

    useEffect(() => {

        // axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${stock}&token=${finnKey}`)
        // .then(res => setSellbuy(res.data[0]))
        // .catch(err => alert(err))

        // axios.get(`https://api.polygon.io/v1/meta/symbols/${stock}/company?apiKey=${polygonKey}`)
        //     .then(res => setStockinfo(res.data))
        //     .catch(err => alert(err))

        // axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${finnKey}`)
        //     .then(res => setOpenclose(res.data))
        //     .catch(err => alert(err))
        
    }, [])

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <h1>Hello</h1>
        </div>
        </ThemeProvider>
    );
}


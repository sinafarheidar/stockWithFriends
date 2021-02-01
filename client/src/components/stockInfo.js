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

    const polygonKey = "S6Kq5dCf9r4uqH7MiF0tb7dFZxWWc13i"
    const finnKey = 'bvsh2nf48v6s45olu1kg'
    const [stockinfo, setStockinfo] = useState([])
    const [openclose, setOpenclose] = useState([])
    const [sellbuy, setSellbuy] = useState([])

    // const stock = window.location.href.substring(48)
    const stock = window.location.href.substring(29)

    useEffect(() => {

        axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${stock}&token=${finnKey}`)
        .then(res => setSellbuy(res.data[0]))
        .catch(err => alert(err))

        axios.get(`https://api.polygon.io/v1/meta/symbols/${stock}/company?apiKey=${polygonKey}`)
            .then(res => setStockinfo(res.data))
            .catch(err => alert(err))

        axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${finnKey}`)
            .then(res => setOpenclose(res.data))
            .catch(err => alert(err))
        
    }, [])

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <Grid container spacing={1} style={{ marginLeft: '5%'}}>
                {/* Column 1 */}
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <img src={stockinfo.logo} alt={`${stockinfo.name} Logo`} style={{ marginLeft: '5%' }}></img>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Typography variant='h3' style={{ marginTop: '5%' }}>{stockinfo.name} - <i>{stockinfo.symbol}</i></Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Typography style={{ marginTop: '17%', color: 'gray' }} variant='subtitle1'><i>Exchange: {stockinfo.exchange}</i></Typography>
                </Grid>

                {/* Column 2 */}
                <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
                    <Typography variant='h5'>Opening Price: {openclose.o}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
                    <Typography variant='h5'>Closing Price: {openclose.c}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
                    <Typography variant='h5'>Today's High: {openclose.h}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
                    <Typography variant='h5'>Today's Low: {openclose.l}</Typography>
                </Grid>
                
                
                {/* Column 3 */}
            <Grid item xs={4} sm={4} md={3} lg={3} xl={3} style={{ marginTop: '3%'}}>
                    <Typography variant='h4'>Buy, Sell, or Hold Rating:</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={1} lg={1} xl={1} style={{ marginTop: '3%'}}>
                    <Typography variant='h5'>Buy: {parseInt(sellbuy.buy)}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={1} lg={1} xl={1} style={{ marginTop: '3%'}}>
                    <Typography variant='h5'>Hold: {sellbuy.hold}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={1} lg={1} xl={1} style={{ marginTop: '3%'}}>
                    <Typography variant='h5'>Sell: {parseInt(sellbuy.sell)}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={3} lg={3} xl={3} style={{ marginTop: '3%'}}>
                <StockChart stock={stockinfo.symbol} buy={sellbuy.buy} sell={sellbuy.sell} hold={sellbuy.hold} strongBuy={sellbuy.strongBuy} strongSell={sellbuy.strongSell} />
                </Grid>

            </Grid>
        </div>
        </ThemeProvider>
    );
}



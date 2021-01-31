import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StockCard from './stockCard'
import Grid from '@material-ui/core/Grid';

import CreateStockModal from './createStockModal'
import DeleteWatchlistModal from './deleteWatchlistModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function StockTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [watchlists, setWatchlists] = useState([])
  const [stocks, setStock] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const userName = currentUser.name
  const userId = currentUser._id

  let isCurrentUser = false

  useEffect(() => {
    axios.get('http://localhost:8000/watchlist')
      .then(res => {
        setWatchlists(res.data)
        console.log(res)
      })
      .catch(err => console.log(err))

    axios.get('http://localhost:8000/stock')
      .then(res => setStock(res.data))
  }, [])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkEmpty = () => {
    if (watchlists.length < 1) {
      return <Typography>Welcome to Stock With Friends! Go ahead and create a new user at the top left of the page!</Typography>
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {checkEmpty()}
          
          {watchlists.map((watchlist, index) => {
            return <Tab key={`${watchlist.id}`} label={`${watchlist.creator}'s WatchList: ${watchlist.name}`} {...a11yProps(index)} />
          })

          }
        </Tabs>
      </AppBar>

      {watchlists.map((watchlist, index) => {
        console.log('Watchlist Id: ', watchlist)
        console.log('User Id: ', userId)
        if (watchlist.id === userId) {
          return (
            <Paper>
              <TabPanel value={value} index={index}>
                <DeleteWatchlistModal username={watchlist.name} id={watchlist.id}></DeleteWatchlistModal>
                <br></br>
                <CreateStockModal watchlist={watchlist.watchlist} username={watchlist.name}></CreateStockModal>
                <br></br>
                <hr></hr>
                <Grid container spacing={3}>
                  {stocks.map(stock => {
                    if (stock.watchlist === watchlist.watchlist) {
                      return (
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                          <StockCard symbol={stock.symbol} target={stock.target} id={stock._id} description={stock.description} stop={stock.stop} date={stock.date.substring(0, 10)}></StockCard>
                        </Grid>
                      )
                    }
                  })}
                </Grid>
              </TabPanel>
            </Paper>
          )
        } else {
          return (
            <Paper>
            <TabPanel value={value} index={index}>
              <Grid container spacing={3}>
                {stocks.map(stock => {
                  if (stock.watchlist === watchlist.watchlist) {
                    return (
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <StockCard symbol={stock.symbol} target={stock.target} id={stock._id} description={stock.description} stop={stock.stop} date={stock.date.substring(0, 10)}></StockCard>
                      </Grid>
                    )
                  }
                })}
              </Grid>
            </TabPanel>
          </Paper>
          )
        }
      })
      }

    </div>
  );
}

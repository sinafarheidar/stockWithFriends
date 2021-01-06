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
import Button from '@material-ui/core/Button';
import StockCard from './stockCard'

import CreateStockModal from './createStockModal'

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
  const [users, setUsers] = useState([])
  const [stocks, setStock] = useState([])

  useEffect(() => {
      axios.get('http://localhost:5000/user/')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
      
      axios.get('http://localhost:5000/stock')
      .then(res => setStock(res.data))
  }, [])

//   useEffect(() => {
//     for (let i = 0; i < users.length; i++) {
//       axios.get(`http://localhost:5000/stock/user-stocks/${users[i].username}`)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err))
//     }
// }, [])



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logStocks = () => {
    console.log(stocks)
    console.log(users)
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
    
          {users.map((user, index) => {
            return <Tab key={`${user._id}`} label={`${user.username}'s WatchList: ${user.watchlist}`} {...a11yProps(index)} />
          })
          
          }
        </Tabs>
      </AppBar>

      {users.map((user, index) => {
            return (
              <Paper>
              <TabPanel value={value} index={index}>
                <Button style={{ margin: '10px' }} variant='outlined' color='secondary'>Delete {user.username}'s WatchList</Button>
                <CreateStockModal username={user.username}></CreateStockModal>
                <br></br>
                <hr></hr>
          {stocks.map(stock => {
            if (stock.user === user.username) {
              return (
                <StockCard symbol={stock.symbol} target={stock.target} id={stock._id} description={stock.description} stop={stock.stop} date={stock.date.substring(0, 10)}></StockCard>
              )
            }
          })}
      </TabPanel>
      </Paper>
            )
          })
          }

    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiChartTimelineVariantShimmer } from '@mdi/js';
import Button from '@material-ui/core/Button';

import EditWatchlistModal from './EditWatchlistModal'
import { isAuth, signOut } from './helpers'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const classes = useStyles();

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = '/signin'
    })
  }

  return (
    <div>
    {isAuth() ? <div className={classes.root}>
    <AppBar position="static" style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href='/'>
        <Icon path={mdiChartTimelineVariantShimmer}
      title="User Profile"
      size={2}
      horizontal
      vertical
      color="white"/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Stock With Friends
        </Typography>
        <EditWatchlistModal></EditWatchlistModal>
        <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
      </Toolbar>
    </AppBar>
    <br></br>
  </div> 
  
  : 

  <div className={classes.root}>
  <AppBar position="static" style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}>
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href='/'>
      <Icon path={mdiChartTimelineVariantShimmer}
    title="User Profile"
    size={2}
    horizontal
    vertical
    color="white"/>
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        Stock With Friends
      </Typography>
      <Button color="inherit"><Link to="/signin" style={{color: 'white', textDecoration: 'none'}}>
        Sign In
    </Link></Button>
    <Button color="inherit"><Link to="/signup" style={{color: 'white', textDecoration: 'none'}}>
        Sign Up
    </Link></Button>
    </Toolbar>
  </AppBar>
  <br></br>
</div>
}
  </div>
  );
}

export default Nav

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiChartTimelineVariantShimmer } from '@mdi/js';

import CreateUserModal from './createUserModal'

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

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
          <CreateUserModal></CreateUserModal>
        </Toolbar>
      </AppBar>
      <br></br>
    </div>
  );
}

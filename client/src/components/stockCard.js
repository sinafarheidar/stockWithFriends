import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DeleteStockModal from './deleteStockModal'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function StockCard(props) {
  const classes = useStyles();
  const currentUser = JSON.parse(localStorage.getItem('user'))

  console.log(props)
  if (props.isCurrentUser) {
    return (
      <div>
      <br></br>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.symbol}
          </Typography>
          <Typography variant="h5" component="h2">
            Target: {props.target} <i>||</i> Stop: {props.stop} 
          </Typography>
          <Typography variant="body2" component="p">
            Description: {props.description}
            <br />
            <i>Date Added: {props.date}</i>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color='primary' variant='contained' href={`/stocks/${props.symbol}`}>More Info</Button>
          <DeleteStockModal id={props.id} watchlist={props.watchlist} stock={props.symbol}></DeleteStockModal>
        </CardActions>
      </Card>
      </div>
    )
  } else {
    return (
      <div>
      <br></br>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.symbol}
          </Typography>
          <Typography variant="h5" component="h2">
            Target: {props.target} <i>||</i> Stop: {props.stop} 
          </Typography>
          <Typography variant="body2" component="p">
            Description: {props.description}
            <br />
            <i>Date Added: {props.date}</i>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color='primary' variant='contained' href={`/stocks/${props.symbol}`}>More Info</Button>
        </CardActions>
      </Card>
      </div>
    )
  }
}

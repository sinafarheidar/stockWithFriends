import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Nav from './components/nav'
import StockTabs from './components/stockTab'
import StockInfo from './components/stockInfo'
import PrivateRoute from './components/auth/PrivateRoute'
import Private from './components/Private'
import SignIn from './components/Signin'
import SignUp from './components/Signup'

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
  palette: {
    primary: {
      main: '#5390d9'
    },
    secondary: {
      main: '#6930c3'
    }
  },
});

function App() {
  return (

    <Router>
      <ThemeProvider theme={theme}>
    <div className="App">
    <Container maxWidth='lg'>
      <Paper style={{ backgroundColor: '#f5f6f7', borderRadius: '15px'}}>
      <Nav></Nav>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <PrivateRoute exact path='/' component={StockTabs} />
      <PrivateRoute exact path='/stocks/:symbol' component={StockInfo} />
      <PrivateRoute exact path='/private' component={Private}/>
      <br></br>
      </Paper>
      </Container>
    </div>
    </ThemeProvider>
    </Router>
  
  );
}

export default App;

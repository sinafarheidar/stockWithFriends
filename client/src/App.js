import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import  {BrowserRouter as Router, Route} from 'react-router-dom'
import Nav from './components/nav'
import StockTabs from './components/stockTab'
import StockInfo from './components/stockInfo'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
    <div className="App">
    <Container maxWidth='lg'>
      <Paper style={{ backgroundColor: '#f5f6f7'}}>
      <Nav></Nav>
      <Route exact path='/' component={StockTabs} />
      <Route exact path='/stocks/:symbol' component={StockInfo} />
      </Paper>
      </Container>
    </div>
    </ThemeProvider>
    </Router>
  );
}

export default App;

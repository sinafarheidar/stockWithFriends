import Container from '@material-ui/core/Container';
import  {BrowserRouter as Router, Route} from 'react-router-dom'
import Nav from './components/nav'
import StockTabs from './components/stockTab'

function App() {
  return (
    <Router>
    <div className="App">
    <Container maxWidth='lg'>
      <Nav></Nav>
      <Route exact path='/' component={StockTabs} />
      </Container>
    </div>
    </Router>
  );
}

export default App;

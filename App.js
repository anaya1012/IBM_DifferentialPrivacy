import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Visualize from './pages/Visualize';
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/prediction' element={<Prediction/>} />
          <Route exact path='/visualize' element={<Visualize/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

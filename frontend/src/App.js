import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Visualize from './pages/Visualize';
import TabsComponent from './components/Tabs';
import PredictResults from './pages/predictResults/predictResults';
import VisualizeTabsComponent from './components/VisualizeTabs';
import DataContributerMain from './pages/DataContributerMain';
import { Main } from './pages/login/Main';
import FileDownloader from './pages/Researchers';
import { MainR } from './pages/loginResearcher/Main';


function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/prediction' element={<TabsComponent/>} />
          <Route exact path='/visualize' element={<VisualizeTabsComponent/>} />
          <Route exact path='/predictResults' element={<PredictResults/>} />
          <Route exact path='/upload' element={<DataContributerMain/>} />
          <Route exact path='/login' element={<Main />}></Route>
          <Route exact path='/loginR' element={<MainR />}></Route>
          <Route exact path='/download' element={<FileDownloader/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
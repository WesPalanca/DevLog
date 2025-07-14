import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<Auth />}/>
        <Route path='/dashboard' element = {<ProtectedRoute> <Dashboard></Dashboard> </ProtectedRoute>} />

        
      </Routes>
    </Router>
  )
}


export default App;
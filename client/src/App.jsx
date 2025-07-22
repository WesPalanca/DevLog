import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import UserLogs from './pages/UserLogs';
import CreateLog from './pages/CreateLog';
import SingleLogPage from './pages/SingleLogPage';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<Auth />}/>
        <Route path='/dashboard' element = {<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path='/logs' element={<ProtectedRoute> <UserLogs /> </ProtectedRoute>}></Route>
        <Route path='/logs/create' element={<ProtectedRoute> <CreateLog /> </ProtectedRoute>} />
        <Route path="/logs/:logId" element={<ProtectedRoute> <SingleLogPage /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

        
      </Routes>
    </Router>
  )
}


export default App;
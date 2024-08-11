import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Roomclean_main from './pages/Roomclean_main';
import Profile from './pages/Profile';
import Register from './pages/register';
import Maintenance_main from './pages/M_main';

import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state)=>state.user.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {currentUser && <Header />}
      <Routes>
        {!currentUser ? (
          <>
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Login onLogin={handleLogin} />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roomcleaning" element={<Roomclean_main />} />
            <Route path="/maintenance" element={<Maintenance_main/>} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

      </Routes>
    </Router>
  );
}

export default App;

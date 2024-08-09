
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Roomclean_main from './pages/Roomclean_main';
import Profile from './pages/Profile';
import Register from './pages/register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn && <Header />}
      <Routes>
        {!isLoggedIn ? (
          <>
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Login onLogin={handleLogin} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/roomcleaning" element={<Roomclean_main />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

      </Routes>
    </Router>
  );
}

export default App;

//Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//Styles
import './App.scss';
//Pages and components
import Create from "./pages/Create/Create";
import Dashboard from "./pages/Dashboard/Dashboard";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";


import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {user, authIsReady} = useAuthContext();
  return (
    <div className="App">
       {authIsReady && <BrowserRouter>
        {user && <Sidebar />}
          <div className='container'>
            <Navbar/>
          <Routes>
            <Route path="/" element={(user && <Navigate to='/dashboard'/>) || (!user && <Navigate to="/login"/>)} />
            <Route path="/dashboard" element={(user && <Dashboard/>) || (!user && <Navigate to="/login"/>)} />
            <Route path="/create" element={(user && <Create/>) || (!user && <Login />)} />
            <Route path="/details/:id" element={(user && <Details/>) || (!user && <Login />)} />
            <Route path="/login" element={(user && <Navigate to='/dashboard'/>) || (!user && <Login />)} />
            <Route path="/signup" element={(user && <Navigate to='/dashboard'/>) || (!user && <Signup />)} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>}
    </div>
  );
}

export default App;

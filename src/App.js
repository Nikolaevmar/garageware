import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import './App.scss';
import { useAuthContext } from "./hooks/useAuthContext";

import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";
import Navbar from "./components/Navbar";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Create = lazy(() => import("./pages/Create/Create"));
const Details = lazy(() => import("./pages/Details/Details"))
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"))

function App() {
  const {user, authIsReady} = useAuthContext();
  return (
    <div className="App">
       {authIsReady && <BrowserRouter>
        {user && <Sidebar />}
          <div className='container'>
            <Navbar/>
            <Suspense fallback={<div className="loader"></div>}>
          <Routes>
            <Route path="/" element={(user && <Navigate to='/dashboard'/>) || (!user && <Navigate to="/login"/>)} />
            <Route path="/dashboard" element={(user && <Dashboard/>) || (!user && <Navigate to="/login"/>)} />
            <Route path="/create" element={(user && <Create/>) || (!user && <Login />)} />
            <Route path="/details/:id" element={(user && <Details/>) || (!user && <Login />)} />
            <Route path="/login" element={(user && <Navigate to='/dashboard'/>) || (!user && <Login />)} />
            <Route path="/signup" element={(user && <Navigate to='/dashboard'/>) || (!user && <Signup />)} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </Suspense>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>}
    </div>
  );
}

export default App;

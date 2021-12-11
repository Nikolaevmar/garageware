//Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//Styles
import './App.scss';
//Pages and components
import Create from "./pages/Create/Create";
import Dashboard from "./pages/Dashboard/Dashboard";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <div className='container'>
            <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/details/:id" element={<Details/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;

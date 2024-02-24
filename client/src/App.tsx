import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Profile from './pages/Profile';
import Point from './pages/Point';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/home'element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/history'element={<History/>}/>
        <Route path='/profile'element={<Profile/>}/>
        <Route path='/point'element={<Point/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

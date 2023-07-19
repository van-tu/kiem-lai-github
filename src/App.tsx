import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <header className='header'>
          <h1 className='header__title'> Kiếm Lai 剑来 </h1>
          <Navbar />
        </header>
        <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/create-post' element={ <CreatePost /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

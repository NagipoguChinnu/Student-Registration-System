import React from 'react';
import StudentRegistration from './components/StudentRegistration';
import RegisteredStudents from './components/RegisteredStudents';
import { Navigate,Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import CombinedPage from './components/CombinedPage';
import Home from './components/Home';

import './App.css';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <div className='container my-4'>
      <h1 className='text-center mb-4'>Student Registration System</h1>

      <BrowserRouter>
        
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10'>
            <nav className='d-flex flex-wrap justify-content-center gap-2'>
              <Link to="/" className='btn btn-outline-info'>
                Home
              </Link>
              <Link to="/course" className='btn btn-outline-info'>
                Course management
              </Link>
              <Link to="/registration" className='btn btn-outline-success'>
                Student Registration
              </Link>
              <Link to="/students" className='btn btn-outline-warning'>
                Registered Students
              </Link>
            </nav>
          </div>
        </div>

        <div className='mt-4'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/registration' element={<StudentRegistration />} />
            <Route exact path='/course' element={<CombinedPage />} />
            <Route exact path='/students' element={<RegisteredStudents />} />
            <Route exact path='*' element={<Navigate to="/" />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

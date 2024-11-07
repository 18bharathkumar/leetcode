// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import SignIn from './components/signin';
import SignUp from './components/signup';
import ProblemDetail from './components/problemdetailes';
import ProblemList from './components/problemlist';
import Profile from './profile/profile';
import CodeDetail from './profile/user/codedetailes';
import AddQuestion from './profile/admin/addQuestions';

function App() {

  function Notfound(){
    return (
      <>
      <h1>
        page not found
      </h1>
      </>
    )
  }
  return (
    <Router>
         <Navbar />
        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
          <Route path="*" element={<Notfound />} />
            <Route path="/" element={<ProblemList />} />
            <Route path="addQuestions" element={<AddQuestion/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/problems" element={<ProblemList/>} />
            <Route path="/problems/:QId" element={<ProblemDetail />}/>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path = '/code-detail' element={<CodeDetail />}></Route>
          </Routes>
        
        </div>
    </Router>
  );
}

export default App;

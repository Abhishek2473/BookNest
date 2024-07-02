// import { useState } from 'react'
// import Header from './components/Header'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import About from './pages/About'
// import Profile from './pages/Profile'
// import Home from './pages/Home'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import BookForm from './components/BookForm'
// import PrivateRoute from './components/PrivateRoute'

// function App() {

//   return (
// <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/signin' element={<SignIn />} />
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/bookform' element={<BookForm/>}/>
//         <Route path='/about' element={<About />} />
//          <Route path='/about' element={<About />} />
       
//         <Route element={<PrivateRoute />}>
//         <Route path='/profile' element={<Profile />} />

     
//         </Route> 
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import ProfilePage from './pages/Profile';
import SignUp from './pages/SignUp';
import BookForm from './components/BookForm'
import AdminPanel from './admin/AdminPanel'
import ReadingList from './pages/ReadingList';
import BookDetails from './pages/Book';
import AllBooks from './pages/AllBooks';
import Home from './pages/Home';
import AboutPage from './pages/About';
import Search from './pages/Search';


// Other imports

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp/>}/>
          //<Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/bookform' element={<BookForm/>}/>
          <Route path='/admin' element={<AdminPanel/>}/>
          <Route path="/user/:id/reading-list" element={<ReadingList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path='/Allbook' element={<AllBooks/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/search' element={<Search/>}/>

          
          

          


          {/* Other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

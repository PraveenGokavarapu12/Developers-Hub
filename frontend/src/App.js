import React from 'react'
import { BrowserRouter,Routes, Route,Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UserDetails from './pages/UserDetails'
import Navbar from './pages/Navbar'
import PrivateRoute from './pages/PrivateRoute'
import MyPosts from './pages/MyPosts'
import LikedPosts from './pages/LikedPosts'
import CreatePosts from './pages/CreatePosts'
import Posts from './pages/Posts'
import LandingPage from './pages/LandingPage'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route>
      <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user/:id" element={<UserDetails/>} />
        <Route path="/myposts" element={<MyPosts/>}/>
        <Route path="/likedposts" element={<LikedPosts/>}/>
        <Route path="/createpost" element={<CreatePosts/>}/>
        <Route path='/posts' element={<Posts/>}/>
        
        </Route>
        
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

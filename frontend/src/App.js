import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import PrivateRoute from './pages/PrivateRoute';

// Lazy-loaded components
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserDetails = lazy(() => import('./pages/UserDetails'));
const MyPosts = lazy(() => import('./pages/MyPosts'));
const LikedPosts = lazy(() => import('./pages/LikedPosts'));
const CreatePosts = lazy(() => import('./pages/CreatePosts'));
const Posts = lazy(() => import('./pages/Posts'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landingpage" element={<LandingPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/likedposts" element={<LikedPosts />} />
            <Route path="/createpost" element={<CreatePosts />} />
            <Route path="/posts" element={<Posts />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

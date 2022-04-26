import * as React from 'react';
import './App.css';
import AppRouter from './app-router/AppRouter';
import AuthContextProvider from './contexts/AuthContext';
import BlogContextProvider  from './contexts/BlogContext';

function App() {
  return (
    <AuthContextProvider>
      <BlogContextProvider>
        <AppRouter/>
      </BlogContextProvider>
    </AuthContextProvider>
  )
}



export default App;

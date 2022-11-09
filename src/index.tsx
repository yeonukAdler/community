import ReactDOM from 'react-dom/client';
import './index.css';
import Home from 'pages/Home/index';
import Login from 'pages/Login/index';
import Signup from 'pages/Signup/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);

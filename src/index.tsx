import ReactDOM from 'react-dom/client';
import './index.css';
import Home from 'pages/Home/index';
import Login from 'pages/Login/index';
import Signup from 'pages/Signup/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Header from 'component/Header';
import { Path } from 'constant';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={Path.home} element={<Home />} />
          <Route path={Path.logIn} element={<Login />} />
          <Route path={Path.signUp} element={<Signup />} />
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

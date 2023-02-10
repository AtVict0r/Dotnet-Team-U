import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavBar from './Components/NavBar';
import Main from './Components/Main';
import Footer from './Components/Footer';

export default function Page() {
  return (
    <React.StrictMode>
      <NavBar />
      <Main />
      <Footer />
    </React.StrictMode>      
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
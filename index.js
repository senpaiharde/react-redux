import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './styles/main.css';

/*load saved theme from localstroge on loading tthe page */
const savedThemes = localStorage.getItem('theme') || "light";
document.body.classList.toggle('dark-theme',savedThemes === 'dark');



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Provider store={store}>
      <BrowserRouter>  
        <App />
      </BrowserRouter>
    </Provider>
  );




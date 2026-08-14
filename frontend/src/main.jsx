import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppToaster from './components/Toast';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Restore GitHub Pages SPA redirect path if redirected from 404.html
(function restoreGHPRedirect() {
    try {
        const redirect = sessionStorage.getItem('ghp_redirect');
        if (redirect && redirect !== '/') {
            sessionStorage.removeItem('ghp_redirect');
            window.history.replaceState(null, null, redirect);
        }
    } catch (e) {}
})();

const basename = import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <CartProvider>
                <BrowserRouter basename={basename}>
                    <App />
                    <AppToaster />
                </BrowserRouter>
            </CartProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
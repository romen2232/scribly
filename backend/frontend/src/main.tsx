import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
//Import of dist/main.css
import '../dist/main.css';
import { BrowserRouter } from 'react-router-dom';
import './i18n/config';
import 'react-toastify/dist/ReactToastify.css';
import { NextUIProvider } from '@nextui-org/react';

/** We render the App component into the root element. With React.StrictMode, we
  enable additional checks and warnings for our application.
  See https://reactjs.org/docs/strict-mode.html for more information.
  We use the BrowserRouter to enable routing in our application.
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <NextUIProvider>
                <App />
            </NextUIProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/ContextProvider.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)

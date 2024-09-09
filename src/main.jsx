import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import App from './App.jsx'
// const basename = '/dev_ias';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
    </Provider>
  </StrictMode>,
)

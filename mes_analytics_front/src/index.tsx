import React from 'react'
import { Provider } from 'react-redux'
import store from './services/store'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import './index.css'
import App from './App'

import i18n from './i18n'

import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
)

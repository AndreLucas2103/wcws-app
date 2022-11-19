import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './redux/store'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <CookiesProvider> {/* Provider do cookies, para gerenciamento do app */}
        <Provider store={store} > {/* providader do redux */}
            <App />
        </Provider>
    </CookiesProvider>
)

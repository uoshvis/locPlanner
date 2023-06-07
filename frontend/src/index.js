import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './index.css'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

const container = document.getElementById('root')
const root = createRoot(container)

if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_MOCK_ENV === 'enabled'
) {
    const { worker } = require('./mocks/browser')
    worker.start({
        onUnhandledRequest: 'bypass', // "bypass"/ "warn"/ "error"
    })
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                    <App />
                </QueryParamProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

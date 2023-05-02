import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { setupListener } from "@reduxjs/toolkit/query"
import { api } from "@/state/api"

export const store = configureStore({
    reducer: { [api.reducerPath]: api.reducerPath },
    middleware: (getDefault) => getDefault().concat(api.middleware)
});

setupListener(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LoadingViewProvider } from './context/LoadingViewContext'
import { SearchProvider } from './context/SearchContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <LoadingViewProvider>
        <UserProvider>
          <SearchProvider>
                <App />
          </SearchProvider>
        </UserProvider>
      </LoadingViewProvider>
    </BrowserRouter>
)

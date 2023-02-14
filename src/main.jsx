import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { HashRouter } from 'react-router-dom'
import { queryClient } from './services/queryClient'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter basename='/'>     
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider> 
    </HashRouter>
  </React.StrictMode>
)

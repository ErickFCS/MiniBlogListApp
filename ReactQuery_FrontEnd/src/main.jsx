import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient, } from '@tanstack/react-query'
import { NotificationContextProvider, } from './context/notifications'
import { UserContextProvider, } from './context/user'
import { BrowserRouter as Router, } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root',),).render(
    <UserContextProvider>
        <NotificationContextProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                </Router>
            </QueryClientProvider>
        </NotificationContextProvider>
    </UserContextProvider>,
)

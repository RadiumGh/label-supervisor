import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { showToast } from './components/toast'
import { App } from './pages/App'
import './index.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(e) {
        console.error(e)
        showToast('Request Failed. Please Try Again', 'error')
      },
    },
    queries: {
      staleTime: 5000,
    },
  },
})

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)

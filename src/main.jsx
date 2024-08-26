import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inscription from './pages/Inscription.jsx'
import Connexion from './pages/Connexion.jsx'
import TableauBord from './pages/TableauBord.jsx'
import ListeEscale from './pages/ListeEscale.jsx'
import ListeQuai from './pages/ListeQuai.jsx'
import ListeNavire from './pages/ListeNavire.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Stat from './component/Stat.jsx'
import RetardEscale from './pages/RetardEscale.jsx'
import AdminRoute from './component/Routes/AdminRoute.jsx'
import UserRoute from './component/Routes/UserRoute.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            {/* Routes protégées accessibles uniquement aux utilisateurs connectés */}
            <Route index element={<UserRoute element={TableauBord} />} />
            <Route path='/tableauBord' element={<UserRoute element={TableauBord} />} />
            <Route path='/escale' element={<UserRoute element={ListeEscale} />} />
            <Route path='/quai' element={<UserRoute element={ListeQuai} />} />
            <Route path='/navire' element={<UserRoute element={ListeNavire} />} />
            <Route path='/retard' element={<UserRoute element={RetardEscale} />} />

            {/* Routes protégées accessibles uniquement aux administrateurs */}
            <Route path='/stat' element={<AdminRoute element={Stat} />} />
          </Route>
          
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/connexion' element={<Connexion/>}/>
          <Route path='*' element={<>Page introuvable</>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

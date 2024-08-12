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
import Statistique from './pages/Statistique.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import About from './pages/About.jsx'
import FormEscale from './pages/Formulaire/FormEscale.jsx'
import FormNavire from './pages/Formulaire/FormNavire.jsx'
import FormQuai from './pages/Formulaire/FormQuai.jsx'
import FormPilote from './pages/Formulaire/FormPilote.jsx'
import FormSearch from './pages/Formulaire/FormSearch.jsx'
import FormEscaleTest from './pages/Formulaire/FormEscaleTest.jsx'
import EscaleEntrant from './component/Accordion/EscaleEntrant.jsx'
import EscaleSortant from './component/Accordion/EscaleSortant.jsx'
import EscaleManager from './component/EscaleManager.jsx'
import EscaleCountCard from './component/EscaleCountCard.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<TableauBord/>}/>

            <Route path='/tableauBord' element={<TableauBord/>}/>
            <Route path='/escale' element={<ListeEscale/>}/>
            <Route path='/quai' element={<ListeQuai/>}/>
            <Route path='/navire' element={<ListeNavire/>}/>
            <Route path='/stat' element={<Statistique/>}/>
            <Route path='/about' element={<About/>}/>
          </Route>
          
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/connexion' element={<Connexion/>}/>
          <Route path='/form/escale' element={<FormEscale/>}/>
          <Route path='/form/navire' element={<FormNavire/>}/>
          <Route path='/form/quai' element={<FormQuai/>}/>
          <Route path='/form/pilote' element={<FormPilote/>}/>

          <Route path='/test/form/search' element={<FormSearch/>}/>
          <Route path='/test/form/escale' element={<FormEscaleTest/>}/>
          <Route path='/test/accordion/entrant' element={<EscaleEntrant/>}/>
          <Route path='/test/accordion/sortant' element={<EscaleSortant/>}/>
          <Route path='/test/accordion/manager' element={<EscaleManager/>}/>
          <Route path='/test/count' element={<EscaleCountCard/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

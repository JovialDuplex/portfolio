import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import InfosPage from './pages/Infos';
import NavBar from './components/navbar';


function App() {

  return (
    <div data-theme="dar" className="app text-(--text-primary) w-full h-screen flex flex-col">
      <BrowserRouter>
        <header className="app-header fixed bg-(--bg-navbar) top-0 w-full h-16">
          <NavBar/>
        </header>
        
        <main className=" *:w-full *:h-full app-body flex-1 mt-16 [background:var(--bg-page)]">
          <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"/services"} element={<ServicesPage/>}/>
            <Route path={"/projects"} element={<ProjectsPage/>} />
            <Route path={"/about-me"} element={<InfosPage/>} />
            <Route path={"/contact"} element={<ContactPage/>} />
          </Routes>
        </main>
      
      </BrowserRouter>
      

    </div>
  )
}

export default App

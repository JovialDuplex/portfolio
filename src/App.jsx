import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import InfosPage from './pages/Infos';
import NavBar from './components/navbar/navbar';


function App() {

  return (
    <div data-theme="light" className="app w-full h-screen flex flex-col">
      <BrowserRouter>
        <header className="app-header fixed top-0 w-full h-16">
          <NavBar/>
        </header>
        
        <main className="app-body flex-1 mt-16">
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

import './App.css'
import {BrowserRouter, Routes, Route, Outlet, useLocation} from "react-router-dom";
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import InfosPage from './pages/Infos';
import NavBar from './components/navbar';
import useThemeStore from './store/themStore';
import AdminDashboardPage from './pages/admin-page/dashboard';
import NavBarAdmin from './components/navbar-admin';
import LoginPage from './pages/admin-page/login';
import AdminServicesPage from './pages/admin-page/services';
import AdminProjectsPage from './pages/admin-page/projects';
import AdminSettingsPage from './pages/admin-page/settings';
import SeeProject from './pages/SeeProject';
import { Toaster } from '@/components/ui/sonner';



const AdminLayout = function(){
  return (
    <div className='h-screen flex flex-col lg:grid lg:grid-cols-12'>
      <aside className='lg:col-span-2 [background:var(--bg-page)] text-(--text-primary) lg:border-r-2 border-(--border-navbar) '>
        <NavBarAdmin/>
      </aside>

      <main className="lg:col-span-10 flex-1 h-full min-h-0 overflow-hidden *:w-full *:h-full *:px-4 [background:var(--bg-page)]">
        <Outlet />
      </main>
    </div>
  )
};

const ClientLayout = function(){
  return (
    <div className='h-screen flex flex-col'>
      <header className="app-header fixed top-0 z-10 bg-(--bg-navbar) w-full h-16">
        <NavBar />
      </header>
      <main className="*:w-full *:h-full *:px-4 app-body mt-16 flex-1 [background:var(--bg-page)]">
        <Outlet />
      </main>
    </div>
  )
};

export default function App(){
  const subdomain = location.host.split(".")[0];
  const theme = useThemeStore((state)=>state.theme);

  return (
    <div data-theme={theme}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* routes administrateur */}
          

            <Route path={"/admin/login"} element={<LoginPage/>} />
            <Route path={"/error"} element={<h1>Une erreur est survenue</h1>}/>

            
            <Route path={"/admin/dashboard"} element={<AdminLayout/>}>
              <Route path={"home"} element={<AdminDashboardPage/>}/>
              <Route path={"services"} element={<AdminServicesPage/>} />
              <Route path={"projects"} element={<AdminProjectsPage/>} />
              <Route path={"settings"} element={<AdminSettingsPage/>} />
            </Route>
          
            <Route element={<ClientLayout/>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about-me" element={<InfosPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path={"/projects/:id_project"} element={<SeeProject />} />
              
            </Route>
          
            
        </Routes>
      </BrowserRouter>
    </div>
  )
}; 
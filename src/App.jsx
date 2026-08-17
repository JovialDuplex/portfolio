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
import ProtectedRoute from './components/ProtectedRoute';
import useTokenWatcher from './hooks/useTokenWatcher';

import {IconRegistryProvider } from "./index";
  

const AdminLayout = function(){
  // Surveille l'expiration du token et déclenche la déconnexion automatique
  useTokenWatcher();

  return (
    <div className='min-h-screen lg:h-screen flex flex-col lg:grid lg:grid-cols-12 overflow-hidden'>
      <aside className='lg:col-span-2 [background:var(--bg-page)] text-(--text-primary) lg:border-r-2 border-(--border-navbar) shrink-0'>
        <NavBarAdmin/>
      </aside>

      <main className="lg:col-span-10 flex-1 h-full min-h-0 overflow-y-auto p-4 sm:p-6 [background:var(--bg-page)]">
        <IconRegistryProvider>
          <Outlet />
        </IconRegistryProvider>
      </main>
    </div>
  )
};

const ClientLayout = function(){
  return (
    <div className='min-h-screen lg:h-screen flex flex-col overflow-hidden'>
      <header className="app-header fixed top-0 z-10 bg-(--bg-navbar) w-full h-16">
        <NavBar />
      </header>
      <main className="p-3 sm:p-6 app-body mt-16 flex-1 overflow-y-auto [background:var(--bg-page)]">
        <IconRegistryProvider>
          <Outlet />
        </IconRegistryProvider>
      </main>
    </div>
  )
};

export default function App(){
  const subdomain = location.host.split(".")[0];
  const theme = useThemeStore((state)=>state.theme);
  

  return (
    <div data-theme={theme}>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          {/* routes administrateur */}
          

            <Route path={"/admin/login"} element={<LoginPage/>} />
            <Route path={"/error"} element={<h1>Une erreur est survenue</h1>}/>

            
            {/* Routes protégées : nécessitent un token valide */}
            <Route element={<ProtectedRoute/>}>
              <Route path={"/admin/dashboard"} element={<AdminLayout/>}>
                <Route path={"home"} element={<AdminDashboardPage/>}/>
                <Route path={"services"} element={<AdminServicesPage/>} />
                <Route path={"projects"} element={<AdminProjectsPage/>} />
                <Route path={"settings"} element={<AdminSettingsPage/>} />
              </Route>
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
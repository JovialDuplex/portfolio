import './App.css'
import {BrowserRouter, Routes, Route, Outlet, useLocation} from "react-router-dom";
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import InfosPage from './pages/Infos';
import NavBar from './components/navbar';
import useThemeStore from './store/themStore';
import Dashboard from './pages/admin-page/dashboard';
import NavBarAdmin from './components/navbar-admin';
import LoginPage from './pages/admin-page/login';



const AdminLayout = function(){
  return (
    <div className='h-screen grid grid-cols-12'>
      <aside className='col-span-2 bg-(--bg-navbar) border-r-2 border-(--border-navbar) '>
        <NavBarAdmin/>
      </aside>

      <main className="col-span-10 [background:var(--bg-page)]">
        <Outlet />
      </main>
    </div>
  )
};

const ClientLayout = function(){
  return (
    <div className='h-screen flex flex-col'>
      <header className="app-header fixed bg-(--bg-navbar) w-full h-16">
        <NavBar />
      </header>
      <main className="*:w-full *:h-full app-body mt-16 flex-1 [background:var(--bg-page)]">
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

      <BrowserRouter>
        <Routes>
          {/* routes administrateur */}
          
          {subdomain === "admin" ? (
              <>
                <Route path={"/"} element={<LoginPage/>} />

                <Route path={"/dashboard"} element={<AdminLayout/>}>
                  <Route index element={<Dashboard/>}/>
                </Route>
              </>
            ): (
              <>
                <Route element={<ClientLayout/>}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/about-me" element={<InfosPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Route>
              </>
            )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}; 

// function App() {
//   const theme = useThemeStore((state)=>state.theme);
//   const subdomain = location.host.split(".")[0];
//   const isloginPage = location.pathname === "/";

//   console.log(location.pathname);

//   return (
//     <div data-theme={theme} className={`app text-(--text-primary) w-full h-screen flex ${subdomain !== "admin" && "flex-col"}`}>
//       <BrowserRouter>
//         <header className={`app-header fixed  bg-(--bg-navbar) w-full h-16}`}>
//           {subdomain !== "admin" ? <NavBar/> : <NavBarAdmin/>}
//         </header>
        
        
//         <main className={`*:w-full *:h-full app-body flex-1 [background:var(--bg-page)] ${(subdomain!=="admin") ? "mt-16" : "ml-75"}`}>
//           <Routes>
//             {(subdomain === "admin") &&  (
//               <>
//               <Route path={"/"} element={<LoginPage/>}/>

//               <Route path={"/dashboard"} element={<Outlet/>}>
//                 <Route index element={<Dashboard />}/>
//                 <Route path={"settings"} element={<h1>settings</h1>}/>
//                 <Route path={"projects"} element={<h1>Projects</h1>}/>
//                 <Route path={"services"} element={<h1>Services </h1>}/>
//                 <Route path={"profile"} element={<h1>profile</h1>}/>
//                 <Route path={"messages"} element={<h1>messages</h1>}/>
//               </Route>
//               </>
//             )}
//             <Route path={"/"} element={<HomePage/>}/>
//             <Route path={"/services"} element={<ServicesPage/>}/>
//             <Route path={"/projects"} element={<ProjectsPage/>} />
//             <Route path={"/about-me"} element={<InfosPage/>} />
//             <Route path={"/contact"} element={<ContactPage/>} />
//           </Routes>
//         </main>
      
//       </BrowserRouter>
      

//     </div>
//   )
// }

// export default App

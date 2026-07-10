
import ActivitiesInfos from "@/components/activities-infos";
import MessageInfos from "@/components/message-infos";
import StatCard from "@/components/statCard";
import useUserStore from "@/store/userStore";
import {
    LayoutDashboard, User, Briefcase,
    FolderOpen, Settings, Layers, 
    Mail, FolderPlus, PenLine,
    X,  
} from "lucide-react";
import {
    AlertDialog, AlertDialogContent, AlertDialogTitle, 
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useProject from "@/hooks/projects";


export default function AdminDashboardPage(){
    const {getAllProjects, projects} = useProject();
    useEffect(()=>{getAllProjects();}, []);

    const stats = [
        { label: "Services", value: 4, icon: Briefcase },
        { label: "Projetcs", value: projects.length, icon: FolderOpen },
        { label: "Skills", value: 12, icon: Layers },
        { label: "Messages", value: 5, icon: Mail },
    ];

    const messages = [
        { name: "Alice Kamga",   subject: "Demande de devis site vitrine", date: "12/05/2024", initials: "AK" },
        { name: "Bruno Essono",  subject: "Projet e-commerce urgent", date: "12/05/2024", initials: "BE" },
        { name: "Claire Mbida",  subject: "Suivi développement API", date: "12/05/2024", initials: "CM" },
        { name: "David Nkomo",   subject: "Bug sur le dashboard", date: "13/05/2024", initials: "DN" },
        { name: "Eva Fotso",     subject: "Intégration paiement mobile", date: "13/05/2024", initials: "EF" },
        { name: "Franck Tala",   subject: "Mise à jour WordPress", date: "13/05/2024", initials: "FT" },
    
    ];

    const activities = [
        { icon: FolderPlus, label: "Nouveau projet ajouté", date: "12/05/2024", type: "project" },
        { icon: PenLine,    label: "Service modifié",        date: "12/05/2024", type: "edit"    },
        { icon: Mail,       label: "Nouveau message reçu",   date: "13/05/2024", type: "message" },
        { icon: Mail,       label: "Nouveau message reçu",   date: "13/05/2024", type: "message" },
        { icon: PenLine,    label: "Service modifié",        date: "13/05/2024", type: "edit"    },
        { icon: Mail,       label: "Nouveau message reçu",   date: "13/05/2024", type: "message" },
    ];

    const navItems = [
        { icon: LayoutDashboard, label: "Tableau de bord", id: "dashboard" },
        { icon: User,            label: "Profil",           id: "profile"   },
        { icon: Briefcase,       label: "Services",         id: "services"  },
        { icon: FolderOpen,      label: "Projets",          id: "projects"  },
        { icon: Layers,          label: "Compétences",      id: "skills"    },
        { icon: Settings,        label: "Réglages",         id: "settings"  },
    ];

    const {user} = useUserStore();    
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    return (
        <>
            <AlertDialog open={openAlertDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader className={"flex justify-between"}>
                        <AlertDialogTitle> Hello </AlertDialogTitle>
                        <Button variant="ghost" className={"cursor-pointer"} onClick={()=>setOpenAlertDialog(false)}><X size={20}/></Button>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Welcome back sir {user.user_name}
                    </AlertDialogDescription>
                    <AlertDialogFooter >
                        <Button onClick={()=>setOpenAlertDialog(false)}> Close </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="dashboard-admin flex gap-4 flex-col h-full min-h-0">
                {/* -----------Header----------- */}
                <header className="dashboard-header flex justify-between items-center border-b border-(--border-navbar) py-2 shrink-0">
                    <div>
                        <h1 className="text-2xl uppercase md:text-3xl font-extrabold tracking-tight text-(--text-primary)">
                            Bienvenue,{" "}
                            <span className="bg-linear-135 from-(--text-accent-light)  to-[#1d4ed8] bg-clip-text text-transparent"> 
                                {user.user_name} {user.user_second_name}
                            </span>
                        </h1>
                        <p className="text-lg text-(--text-secondary) mt-1 font-medium tracking-wide">
                        {user.user_job_name}
                        </p>
                    </div>
                    <div className="h-full overflow-hidden rounded-full border-2 border-(--text-primary)">
                        <img src={`${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}`} alt={"profile-picture"} className="h-20 w-20"/>
                    </div>
                </header>
                {/* -----------section stat----------- */}
                <section className="stat-section shrink-0">
                    <StatCard statsList={stats} /> 
                </section>

                {/* panneaux de bas  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* -----------section messages----------- */}
                    <section className="messages-infos min-h-0 overflow-hidden"> <MessageInfos messages={messages}/> </section>
                    
                    {/*-----------section activites----------- */}
                    <section className="activities-infos"> <ActivitiesInfos activities={activities}/></section>
                </div>
            </div>
        </>
        
    )
}

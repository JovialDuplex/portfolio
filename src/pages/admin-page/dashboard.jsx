
import ActivitiesInfos from "@/components/activities-infos";
import MessageInfos from "@/components/message-infos";
import StatCard from "@/components/statCard";
import {
    LayoutDashboard, User, Briefcase,
    FolderOpen, Settings, Layers, 
    Mail, FolderPlus, PenLine, 
    LogOut, Menu, Code2, 
} from "lucide-react";



export default function Dashboard(){
    const stats = [
        { label: "Services",     value: 4,  max: 10, icon: Briefcase },
        { label: "Projetcs",      value: 8,  max: 10, icon: FolderOpen },
        { label: "Skills",  value: 12, max: 20, icon: Layers },
        { label: "Messages",     value: 5,  max: 10, icon: Mail },
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

    
    
    return (
        <div className="dashboard-admin px-5 py-8 flex gap-4 flex-col">
            {/* -----------Header----------- */}
            <div className="header">
                
                <h1 className="text-2xl uppercase md:text-3xl font-extrabold tracking-tight text-(--text-primary)">
                    Bienvenue,{" "}
                    <span className="bg-linear-135 from-(--text-accent-light)  to-[#1d4ed8] bg-clip-text text-transparent"> 
                        soh Takeuh Jovial Duplex
                    </span>
                </h1>
                <p className="text-lg text-(--text-secondary) mt-1 font-medium tracking-wide">
                Fullstack Web Developer
                </p>
            </div>
            {/* -----------section stat----------- */}
            <section className="stat-section">
                <StatCard statsList={stats} /> 
            </section>

            {/* panneaux de bas  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* -----------section messages----------- */}
                <section className="messages-infos"> <MessageInfos messages={messages}/> </section>
                
                {/*-----------section activites----------- */}
                <section className="activities-infos"> <ActivitiesInfos activities={activities}/></section>
            </div>
        </div>
    )
}

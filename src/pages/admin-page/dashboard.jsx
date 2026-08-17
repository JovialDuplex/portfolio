
import ActivitiesInfos from "@/components/activities-infos";
import StatCard from "@/components/statCard";
import useUserStore from "@/store/userStore";
import {
    Brain,
    Briefcase,
    FolderOpen, FolderTree, GraduationCap, Layers,
    Mail, Package, Tag, X,
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
import useActivitiesStore from "@/store/activtiesStore";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoriesInfos from "@/components/categories-infos";
import useCategories from "@/hooks/categories";
import useSkills from "@/hooks/skills";
import useService from "@/hooks/services";


export default function AdminDashboardPage() {
    const [categoryList, setCategoryList] = useState([]);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [services, setServices] = useState([]);
    const [skills, setSkills] = useState([]);

    const { getAllProjects, projects } = useProject();
    const { getCategories } = useCategories();
    const { getServices } = useService();
    const { activityList } = useActivitiesStore();
    const { getSkills } = useSkills();
    const { user } = useUserStore();

    useEffect(() => {
        getSkills().then(skill => {
            setSkills(skill);
        }).catch(error => {
            console.log(error);
            throw error;
        });
        getServices().then(myservices => {
            setServices(myservices);
        }).catch(error => {
            console.log(error);
            throw error;
        });

        getAllProjects();
        getCategories().then(categories => {
            setCategoryList(categories);
        }).catch(error => {
            console.log(error);
        });

    }, [activityList]);

    const stats = [
        { label: "Services", value: services.length, icon: Package },
        { label: "Projetcs", value: projects.length, icon: FolderOpen },
        { label: "Skills", value: skills.length, icon: GraduationCap },
        { label: "Categories", value: categoryList.length, icon: Tag },
    ];




    return (
        <>
            <AlertDialog open={openAlertDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader className={"flex justify-between"}>
                        <AlertDialogTitle> Hello </AlertDialogTitle>
                        <Button variant="ghost" className={"cursor-pointer"} onClick={() => setOpenAlertDialog(false)}><X size={20} /></Button>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Welcome back sir {user.user_name}
                    </AlertDialogDescription>
                    <AlertDialogFooter >
                        <Button onClick={() => setOpenAlertDialog(false)}> Close </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="dashboard-admin flex gap-4 flex-col h-full min-h-0">
                {/* -----------Header----------- */}
                <header className="dashboard-header flex justify-between items-center border-b border-(--border-navbar) py-3 shrink-0 gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-(--text-primary)">
                            Bienvenue,{" "}
                            <span className="bg-linear-135 from-(--text-accent-light) to-[#1d4ed8] bg-clip-text text-transparent">
                                {user.user_name} {user.user_second_name}
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base text-(--text-secondary) mt-1 font-medium tracking-wide">
                            {user.user_jobName}
                        </p>
                    </div>
                    <div className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-(--text-primary) shrink-0">
                        <img src={`${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}`} alt={"profile-picture"} className="h-full w-full object-cover" />
                    </div>
                </header>

                <div className="overflow-y-auto flex-1 flex gap-4 flex-col justify-start min-h-0 pr-1">

                    {/* -----------section stat----------- */}
                    <section className="stat-section">
                        <StatCard statsList={stats} />
                    </section>

                    {/* panneaux de bas  */}
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* -----------section Categories----------- */}
                        <ScrollArea className="message-infos p-3 bg-(--bg-card) h-80 lg:h-[400px] border border-(--border-card) rounded-(--radius-card)">
                            <ScrollBar />
                            <CategoriesInfos category_list={categoryList} />
                        </ScrollArea>

                        {/*-----------section activites----------- */}
                        <ScrollArea className="activities-infos p-3 bg-(--bg-card) h-80 lg:h-[400px] border border-(--border-card) rounded-(--radius-card)">
                            <ScrollBar />
                            <ActivitiesInfos activities={activityList} />
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>

    )
}


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


export default function AdminDashboardPage() {
    const [categoryList, setCategoryList] = useState([]);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [skills, setSkills] = useState([]);

    const { getAllProjects, projects } = useProject();
    const { getCategories } = useCategories();
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

        getAllProjects();
        getCategories().then(categories => {
            setCategoryList(categories);
        }).catch(error => {
            console.log(error);
        });

    }, [activityList]);

    const stats = [
        { label: "Services", value: 4, icon: Package },
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
                        <img src={`${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}`} alt={"profile-picture"} className="h-20 w-20" />
                    </div>
                </header>

                <div className="overflow-scroll flex-1 flex gap-4 flex-col justify-center">

                    {/* -----------section stat----------- */}
                    <section className="stat-section">
                        <StatCard statsList={stats} />
                    </section>

                    {/* panneaux de bas  */}
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                        {/* -----------section Categories----------- */}
                        <ScrollArea className={"min-h-0 message-infos p-2.5 bg-(--bg-card) h-full border border-(--border-card) rounded-(--radius-card)"}><ScrollBar /> <CategoriesInfos category_list={categoryList} />  </ScrollArea>

                        {/*-----------section activites----------- */}
                        <ScrollArea className="min-h-0 activities-infos p-2.5 bg-(--bg-card) h-full border border-(--border-card) rounded-(--radius-card)"><ScrollBar /><ActivitiesInfos activities={activityList} /></ScrollArea>
                    </div>
                </div>
            </div>
        </>

    )
}

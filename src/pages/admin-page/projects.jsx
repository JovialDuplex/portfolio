import {InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group";
import {Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import useThemeStore from "@/store/themStore";
import { useEffect, useState } from "react";
import useProject from "@/hooks/projects";
import ProjectForm from "@/components/projectForm";
import {FaTrash, FaPencil} from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import useProjectStore from "@/store/useProjectStore";
import { toast } from "sonner";

const ProjectCard = ({id, title, desc, image, status, isFocus, onFocus})=>{
    const {theme} = useThemeStore();
    const {deleteProject} = useProject();
    const {addActionProject} = useProjectStore();
    const deleteMyProject = async function(){
        try{
            await deleteProject(id); 
            addActionProject();
            toast.warning("This project has been delete successfuly");
        } catch(error) {
            throw error
        }
    };

    return (
        <div onClick={onFocus} className={`card-container flex flex-col rounded-(--radius-card) max-h-100 cursor-pointer border-(--border-card)`}>
            <div className="card-main h-full p-2 bg-(--bg-card) rounded-(--radius-card)">
                <div className="card-header flex flex-col gap-2">
                    <img src={image} alt={"card-image"} className="h-50 w-full rounded-(--radius-card)"/>
                    <div className={`control-box py-0.5 ${!isFocus && "hidden"} w-full grid grid-cols-3 gap-2 *:w-full`}>
                        <Button className={`${theme === "dark" && "bg-red-500 hover:bg-red-600"} cursor-pointer` } onClick={deleteMyProject}><FaTrash className="text-white"/> </Button>
                        <Button className={`${theme === "dark" && "bg-(--text-accent) hover:bg-(--text-accent-glow)"} cursor-pointer w-1/2`}><FaPencil className="text-white"/></Button>
                        <Button className={`cursor-pointer bg-blue-400 hover:bg-blue-500`}> <FaEye/> </Button>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                        <span className="font-bold text-[16px] capitalize"> {title} </span>
                        <Badge className={status === "pending" ? "bg-yellow-600" : "bg-green-600"}> {status} </Badge>
                    </div>
                </div>

                <div className="card-content py-2 flex-1 max-h-30 overflow-scroll">
                    <div className={"text-(--text-secondary) "}>{desc}</div>
                </div>
            </div>
    
        </div>

    )
};

export default function AdminProjectsPage(){
    const [query, setQuery] = useState("");
    const [activeCard, setActiveCard] = useState(null);

    const {projects, getAllProjects} = useProject();
    const filteredItems = projects.filter((project)=> project.project_title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    const {actionProject} = useProjectStore();

    useEffect(()=>{
        getAllProjects();
    }, [actionProject]);


    return (
        <div className="flex flex-col py-2 gap-10 text-(--text-primary)">
            
            <header className="header flex flex-col gap-5"> 
                <div className="first-header flex justify-between">
                    <span className="title text-2xl font-bold uppercase">My Projects</span>
                    <InputGroup className={"w-100"}>
                        <InputGroupAddon className={"bg-transparent hover:bg-transparent hover:text-white cursor-pointer"}> <Search /> </InputGroupAddon>
                        <InputGroupInput type={"text"} value={query} onChange={(e)=> setQuery(e.target.value)} name={"search"} placeholder={"Search Projects ...."} />
                    </InputGroup>
                </div>

                <div className="second-header font-semibold flex justify-between">
                    <ProjectForm />
                    <span className="">Total Project : <Badge className={"bg-(--text-accent)"}>{projects.length}</Badge></span>
                </div>

            </header>

            {/* section principale  */}
            <section className="main-section min-h-0 px-3 py-7 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                { query && filteredItems.length === 0 ? projects.map((project, index)=> (
                    <ProjectCard 
                        key={index}
                        id={project._id}
                        title={project.project_title} 
                        desc={project.project_desc}
                        image={`${import.meta.env.VITE_URL_BACKEND}/${project.project_cover_image}`}
                        status={project.project_status}
                        isFocus={activeCard === index}
                        onFocus={()=>{setActiveCard(activeCard === index ? null : index)}}
                    />
                )) : filteredItems.map((project, index) => (
                    <ProjectCard 
                        key={index}
                        id={project._id}
                        title={project.project_title} 
                        desc={project.project_desc}
                        image={`${import.meta.env.VITE_URL_BACKEND}/${project.project_cover_image}`}
                        status={project.project_status}
                        isFocus={activeCard === index}
                        onFocus={()=>{setActiveCard(activeCard === index ? null : index)}}
                    />
                ))}

            </section>
        </div>
    )
};
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {Search} from "lucide-react"
import { useEffect, useState } from "react";
import useProject from "@/hooks/projects";
import ProjectCard from "@/components/project-card";

export default function ProjectsPage(){
    const {projects, getAllProjects} = useProject();

    const [query, setQuery] = useState("");
    const filteredItems = (projects || []).filter((project)=> project.project_title?.toLowerCase().includes(query.toLowerCase()));
    
    useEffect(()=> {getAllProjects()}, []);

    const [activeCard, setActiveCard] = useState(null);
    return (
        <div className="projects-page flex flex-col gap-6 text-(--text-primary) py-3 w-full">
            <div className="header-page shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-2xl font-bold">My Projects</span>
                
                <InputGroup className={"w-full sm:max-w-75"}>
                    <InputGroupAddon> <Search /></InputGroupAddon>
                    <InputGroupInput value={query} onChange={(e)=> setQuery(e.target.value)} name={"search"} type="search" placeholder="Search a project here ..."/>
                </InputGroup>
            </div>

            <div className="main-page w-full py-2 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                { filteredItems.length === 0 ? (
                    <span className="text-(--text-secondary)">No projects found</span>
                ) : (
                    filteredItems.map((project, index) => (
                        <ProjectCard 
                            key={project._id || index}
                            id={project._id}
                            title={project.project_title}
                            desc={project.project_desc}
                            image={import.meta.env.VITE_NODE_ENV === "production" ? project?.project_cover_image: `${import.meta.env.VITE_URL_BACKEND}/${project?.project_cover_image}`}
                            status={project.project_status}
                            isFocus={activeCard === index}
                            onFocus={()=>{setActiveCard(activeCard === index ? null : index)}}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
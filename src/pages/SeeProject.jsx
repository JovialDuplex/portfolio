
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import useProject from "@/hooks/projects";
import { loremIpsum } from "lorem-ipsum";
import { Search, } from "lucide-react";
import {FaGlobe} from "react-icons/fa6";
import { useEffect } from "react";
import { useParams, Link, useLocation} from "react-router-dom"; 
import {SiGithub, SiGithubHex} from "@icons-pack/react-simple-icons"

const HorizontalCard = function({id, title, desc, status, image, isActive, onFocus}){
    return (
        <Link to={`/projects/${id}`} className={`${isActive? 'bg-blue-500' : 'bg-(--bg-card)'} card-horizontal flex gap-2  border-(--border-card) rounded-(--radius-card) p-2`}>
            <div className="card-image">
                <img alt={"image horizontal card"} src={image} className="max-w-30 h-full w-full rounded-sm overflow-hidden"/>
            </div>
            <div className="card-content w-full">
                <div className="card-title font-semibold min-w-full flex justify-between">
                    <span>{title}</span>
                    <Badge className={status === "pending" ? "bg-yellow-400 text-black": "bg-green-400 text-black"}>{status}</Badge>
                </div>
                <div className="card-desc text-(--text-secondary)">{desc}</div>
            </div>
        </Link>
    )
}

const SeeProject = function(){
    const {id_project} = useParams();
    const {state} = useLocation();
    
    const {project, projects, getProject, getAllProjects}= useProject();
    useEffect(()=>{
        getProject(id_project)
        getAllProjects();

    }, [id_project])

    const myproject = [];
    
    for(let i=1; i<=20; i++) {
        myproject.push({
            project_title: `My Project ${i}`,
            project_desc: loremIpsum(),
            project_status: i % 2 === 0 ? "completed" : "pending",
            project_cover_image : "/logo.png",
        })
    }

    return (
        <div className="flex gap-3 text-(--text-primary) py-2">
            <div className="project-infos border-r-(--border-card) border-r-2 flex-1 basis-0 overflow-hidden flex flex-col">
                <div className="flex-1 basis-0 overflow-scroll min-h-0 ">
                    <div className="header flex flex-col gap-5 justify-start ">
                        <img src={`${import.meta.env.VITE_URL_BACKEND}/${project.project_cover_image}`} alt={"cover_image"} className="w-70 h-auto"/>
                        <div className="project-title flex items-center gap-20">
                            <span className="text-xl font-semibold ">{myproject[0].project_title}</span>
                            <div className="flex gap-2 items-center"> 
                                {project.project_github_url && (<a href={project.project_github_url}><FaGlobe className="text-blue-500 size-6"/></a> )}
                                {project.project_url && (<a href={project.project_url}><SiGithub className="text-(--text-primary)"/></a>)}
                            </div>
                        </div>
                        
                        <div className="project-desc text-(--text-secondary)">
                        {project.project_desc}
                        </div>

                        <div className="project-content">
                            {project.project_content}
                        </div>
                    </div>

                </div>
                
            </div>

            <div className="other-projects w-3/12 lg:flex flex-col gap-3 hidden">
                <InputGroup className={"shrink-0"}>
                    <InputGroupAddon> <Search /> </InputGroupAddon> 
                    <InputGroupInput type="search" placeholder={"Search others project here ..."} />
                </InputGroup>

                <div className="projects min-h-0 overflow-y-scroll basis-0 flex-1 flex flex-col gap-3">
                    {projects.map((project, index)=>(
                        <HorizontalCard key={index}
                            id={project._id}
                            title={project.project_title}
                            desc={project.project_desc}
                            status={project.project_status}
                            image={import.meta.env.VITE_URL_BACKEND + "/" + project.project_cover_image}
                            />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default SeeProject;
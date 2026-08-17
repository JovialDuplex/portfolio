
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
        <div className="flex flex-col lg:flex-row gap-6 text-(--text-primary) py-2 h-full min-h-0">
            <div className="project-infos lg:border-r-2 border-r-(--border-card) pr-0 lg:pr-6 flex-1 basis-0 overflow-hidden flex flex-col">
                <div className="flex-1 basis-0 overflow-y-auto min-h-0 pr-2">
                    <div className="header flex flex-col gap-5 justify-start">
                        <img src={`${import.meta.env.VITE_URL_BACKEND}/${project.project_cover_image}`} alt={"cover_image"} className="w-full max-w-lg h-auto rounded-lg shadow-md"/>
                        <div className="project-title flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <span className="text-2xl font-bold">{project.project_title}</span>
                            <div className="flex gap-3 items-center"> 
                                {project.project_github_url && (<a href={project.project_github_url} target="_blank" rel="noreferrer" className="hover:opacity-80"><SiGithub className="text-(--text-primary) size-6"/></a>)}
                                {project.project_url && (<a href={project.project_url} target="_blank" rel="noreferrer" className="hover:opacity-80"><FaGlobe className="text-blue-500 size-6"/></a>)}
                            </div>
                        </div>
                        
                        <div className="project-desc text-(--text-secondary) text-lg leading-relaxed">
                            {project.project_desc}
                        </div>

                        <div className="project-content text-(--text-primary) leading-relaxed">
                            {project.project_content}
                        </div>
                    </div>

                </div>
                
            </div>

            <div className="other-projects w-full lg:w-3/12 flex flex-col gap-3 border-t lg:border-t-0 pt-6 lg:pt-0 border-(--border-card)">
                <InputGroup className={"shrink-0 w-full"}>
                    <InputGroupAddon> <Search /> </InputGroupAddon> 
                    <InputGroupInput type="search" placeholder={"Search other projects..."} />
                </InputGroup>

                <div className="projects max-h-96 lg:max-h-none overflow-y-auto basis-0 flex-1 flex flex-col gap-3 pr-1">
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
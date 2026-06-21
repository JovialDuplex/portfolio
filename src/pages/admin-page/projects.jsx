import { loremIpsum } from "lorem-ipsum"
import {InputGroup, InputGroupButton, InputGroupInput, } from "@/components/ui/input-group";
import {Search, Plus} from "lucide-react";
import {FaTrash, FaPencil} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const myProjects = [
    {
        project_title : "clan digital web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "completed",
    },

    {
        project_title : "portfolio web app de jovial le professionnels" ,
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "pending",
    },

    {
        project_title : "design web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "completed",
    },

    {
        project_title : "blog web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "pending",
    },
    
    {
        project_title : "design web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "completed",
    },

    {
        project_title : "blog web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "pending",
    },
    {
        project_title : "design web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "completed",
    },

    {
        project_title : "blog web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "pending",
    },
    {
        project_title : "design web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "completed",
    },

    {
        project_title : "blog web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "pending",
    },
    {
        project_title : "design web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "completed",
    },

    {
        project_title : "blog web app",
        project_desc : loremIpsum({count: 3}),
        project_image : "/logo.png",
        project_status : "pending",
    },
    
];

const ProjectCard = ({title, desc, image, status})=>{

    const cardStyle = `
        .card-container {
            transition: transform 0.2s ease-in-out;
        }
        .card-container:focus {
            box-shadow: 0 0 15px var(--text-accent);
        }
        .card-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px var(--text-accent);
        }
        
        .control-box {
            display: none;
        }

        .card-container:focus + .control-box {
            display: flex;
        }
    `;
    return (
        <>
            <style>{cardStyle}</style>
            <div className="relative">
                <div onClick={()=>setActiveCard(true)} tabIndex={"0"} className={`card-container flex flex-col rounded-(--radius-card) max-h-100 cursor-pointer border-(--border-card)`}>

                    <div className="card-main h-full p-2 bg-(--bg-card) rounded-(--radius-card)">
                        <div className="card-header">
                            <img src={image} alt={"card-image"} className="h-50 w-full rounded-(--radius-card)"/>
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

                <div className={`control-box absolute gap-2 top-0 right-0 -translate-y-full py-0.5`}>
                    <Button className={"bg-transparent cursor-pointer"}><FaTrash className="text-red-400 hover:text-red-600"/> </Button>
                    <Button className={"bg-transparent cursor-pointer"}><FaPencil className="text-(--text-accent) hover:text-(--text-accent-glow)"/></Button>
                </div>
            </div>
        </>
    )
};

export default function AdminProjectsPage(){
    return (
        <div className="py-2 gap-10 text-(--text-primary)">
            <header className="header flex flex-col gap-5"> 
                <div className="first-header flex justify-between">
                    <span className="title text-2xl font-bold uppercase">My Projects</span>
                    <InputGroup className={"w-100"}>
                        <InputGroupButton className={"bg-transparent hover:bg-transparent hover:text-white cursor-pointer"}> <Search /> </InputGroupButton>
                        <InputGroupInput type={"search"} name={"search"} placeholder={"Search Projects ...."} />
                    </InputGroup>
                </div>

                <div className="second-header font-semibold flex justify-between">
                    <Button className={"bg-(--text-accent)"}> <Plus /> Add New Project</Button>
                    <span className="">Total Project : <Badge className={"bg-(--text-accent)"}>{myProjects.length}</Badge></span>
                </div>

            </header>

            {/* section principale  */}
            <section className="main-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 h-25 overflow-hidden">
                {myProjects.map((project, index)=> (
                    <ProjectCard 
                        title={project.project_title} 
                        desc={project.project_desc}
                        image={project.project_image}
                        status={project.project_status}
                    />
                ))}
            </section>
        </div>
    )
};
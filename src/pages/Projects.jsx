import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { loremIpsum } from "lorem-ipsum";
import {Search} from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import useProject from "@/hooks/projects";


const ProjectCard = function({id, title, desc, image, status, isFocus, onFocus}){

    const navigate  = useNavigate();

    return (
        <Card onClick={onFocus} className={"min-h-50 max-h-100 text-(--text-primary) bg-(--bg-card) cursor-pointer border-(--border-card) pt-0"}>
            <div className="card-image min-h-30">
                <img alt={"card-image"} src={image} className="h-full w-full"/>
            </div>
            <CardHeader>
                <CardTitle> {title} </CardTitle>
                <CardAction> <Badge className={`p-1 rounded-xl text-black ${status==="pending" ? "bg-yellow-400" : "bg-green-400"}`}>{status}</Badge> </CardAction>
                <CardDescription className={"line-clamp-4"}> {desc} </CardDescription>
            </CardHeader>

            {isFocus && (
                <CardFooter className={"bg-(--bg-card) border-t-(--border-card) w-full"}>
                    <Button onClick={()=>navigate(`/projects/${id}`)} className={"cursor-pointer hover:bg-blue-600 bg-(--text-accent) w-full"}> See this project </Button>
                </CardFooter>
            )}

        </Card>
    )
}

export default function ProjectsPage(){
    const {projects, getAllProjects} = useProject();
    console.log(projects)

    useEffect(()=> {getAllProjects()}, []);

    const [activeCard, setActiveCard] = useState(null);
    return (
        <div className="projects-page flex flex-col gap-2 text-(--text-primary) py-3">
            <div className="header-page shrink-0 flex justify-between">
                <span className="text-2xl">My Projects</span>
                
                <InputGroup className={"max-w-75"}>
                    <InputGroupAddon> <Search /></InputGroupAddon>
                    <InputGroupInput type="search" placeholder="Search a project here ..."/>
                </InputGroup>
            </div>

            <div className="main-page flex-1 basis-0 overflow-scroll py-2 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {projects.map((project, index) => (
                    <ProjectCard key={index}
                        id = {project._id}
                        title={project.project_title}
                        desc={project.project_desc}
                        status={project.project_status}
                        image= {"http://localhost/" + project.project_cover_image}
                        isFocus = {activeCard === index}
                        onFocus = {()=> setActiveCard(activeCard === index ? null : index)}
                    />
                ))}
            </div>
        </div>
    )
}
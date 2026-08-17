
import { useNavigate } from "react-router-dom";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const ProjectCard = function ({ id, title, desc, image, status, isFocus, onFocus }) {

    const navigate = useNavigate();

    return (
        <div onClick={onFocus} className="project-card mx-auto sm:mx-0 cursor-pointer rounded-[16px] text-(--text-primary) border bg-(--bg-card) p-3 border-(--border-card) max-h-80 max-w-90">
            <div className="card-image max-h-3/5 overflow-hidden w-full h-full ">
                <img src={image} alt={"card-image"} className="object-fill rounded-lg w-full h-full" />
            </div>
            <div className="card-header flex flex-col gap-2 mt-3">
                <div className="flex justify-between">
                    <div className="card-title text-(--text-accent) font-bold text-lg">{title} </div>
                    <div className="card-informations"> <Badge className={`p-1 rounded-xl text-black ${status === "pending" ? "bg-yellow-400" : "bg-green-400"}`}> {status}</Badge> </div>
                </div>

                <div className="card-description line-clamp-3 text-(--text-secondary)">{desc}</div>
            </div>
            {isFocus && (
                <div className="mt-2 p-2 grid place-items-center card-footer border-t border-t-(--border-card) w-full bg-(--bg-card)">
                    <Button onClick={() => navigate(`/projects/${id}`)} variant={"accent"} className={"w-full cursor-pointer"}> See this project </Button>
                </div>
            )}
        </div>
    )
};

export default ProjectCard;
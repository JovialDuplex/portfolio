import {Separator} from "@/components/ui/separator";
import * as LucideIcon from "lucide-react";
import { Badge } from "./ui/badge";


export default function ActivitiesInfos({activities}){
    
    return (
        <div className={"activities-infos-card h-full"}>
            <div className="px-2 pt-2 card-header flex justify-between">
                <div className="flex gap-2 items-center">
                    <Separator orientation="vertical" className={"bg-(--text-accent)"} />
                    <span className="text-(--text-accent) font-semibold">Recent Activities </span>
                </div>
                <Badge className={"bg-(--text-accent) rounded-[5px] text-sm font-semibold"}>{activities.length}</Badge>
            </div>
            <div className="card-content mt-6">
                
                {activities.map((activity, index)=> {
                    const Icon = LucideIcon[activity.icon] ?? LucideIcon.Folder;
                    return (
                        <div key={index} className="flex items-center justify-between p-2.5">
                            <div className="gap-3 flex items-center">
                                <div className="icon p-2 border border-(--text-accent) rounded-full">
                                    <Icon size={20} className={"text-(--text-accent) text-sm"} /> 
                                </div>
                                <span className="text-(--text-secondary)"> {activity.label} </span>
                            </div>
                            <span className="text-(--text-secondary) text-sm">{activity.date} </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

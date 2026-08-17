import { Separator } from "@/components/ui/separator";
import * as LucideIcon from "lucide-react";
import { Badge } from "./ui/badge";

const TYPE_DEFAULT_ICONS = {
    project: LucideIcon.FolderOpen,
    service: LucideIcon.Package,
    category: LucideIcon.Tag,
    skill: LucideIcon.GraduationCap,
    user: LucideIcon.User,
};

export default function ActivitiesInfos({ activities = [] }) {
    return (
        <div className="activities-infos-card">
            <div className="pl-3 pr-7 pt-2 card-header flex justify-between shrink-0">
                <div className="flex gap-2 items-center">
                    <Separator orientation="vertical" className={"bg-(--text-accent)"} />
                    <span className="text-(--text-accent) font-semibold">Recent Activities</span>
                </div>
                <Badge className={"bg-(--text-accent) rounded-[5px] text-sm font-semibold"}>{activities.length}</Badge>
            </div>
            <div className="card-content mt-4 flex flex-col gap-2">
                {activities.length === 0 ? (
                    <p className="text-(--text-secondary) p-2 text-sm">No recent activities</p>
                ) : (
                    activities.map((activity, index) => {
                        const IconComponent = LucideIcon[activity.icon] || TYPE_DEFAULT_ICONS[activity.type] || LucideIcon.Activity;
                        return (
                            <div key={index} className="flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-(--border-card) hover:bg-(--bg-page) transition-all">
                                <div className="gap-3 flex items-center min-w-0">
                                    <div className="icon p-2 border border-(--text-accent) rounded-full shrink-0">
                                        <IconComponent size={18} className={"text-(--text-accent)"} />
                                    </div>
                                    <span className="text-(--text-secondary) text-sm font-medium truncate">{activity.label}</span>
                                </div>
                                <span className="text-(--text-secondary) text-xs shrink-0 ml-2">{activity.date}</span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

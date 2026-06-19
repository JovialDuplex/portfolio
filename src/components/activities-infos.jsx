import {Separator} from "@/components/ui/separator";


export default function ActivitiesInfos({activities}){
    return (
        <div className={"activities-infos-card p-2.5 bg-(--bg-card) border border-(--border-card) rounded-(--radius-card)"}>
            <div className="card-header flex gap-2 items-center">
                <Separator orientation="vertical" className={"bg-(--text-accent)"} />
                <span className="text-(--text-accent) font-semibold">Recent Activities </span>
            </div>
            <div className="card-content mt-6">
                
                {activities.map((activity, index)=> (
                    <div key={index} className="flex items-center justify-between p-2.5">
                        <div className="gap-3 flex items-center">
                            <div className="icon p-2 border border-(--text-accent) rounded-lg">
                                <activity.icon className={"text-(--text-accent) text-sm"} /> 
                            </div>
                            <span className="text-(--text-secondary)"> {activity.label} </span>
                        </div>
                        <span className="text-(--text-secondary) text-sm">{activity.date} </span>
                    </div>
                ))}
            </div>
        </div>
    )
};

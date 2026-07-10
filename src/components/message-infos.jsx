
import {
    Card, CardTitle, 
    CardHeader, CardContent 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";


export default function MessageInfos({messages}){
    return (
        <Card className={"flex flex-col bg-(--bg-card) rounded-(--radius-card) border-(--border-card) h-full"}>
            <CardHeader className={"flex justify-between shrink-0"}>
                <CardTitle className={"flex gap-2"}>
                    <Separator orientation="vertical" className={"w-px bg-blue-400"}/>
                    <span className="text-(--text-primary)"> Message Recents </span>
                </CardTitle>
                
                <Badge className={"bg-(--text-accent) font-semibold text-sm rounded-[5px]"}>
                    {messages && messages.length}
                </Badge>
            </CardHeader>

            <CardContent className={"px-3 pb-2 overflow-y-auto min-h-0 flex-1"}>
                {messages.map((message, index) => (
                    <div key={index} className="flex items-center gap-3 p-2.5">
                        <Avatar className={"size-8"}>
                            <AvatarFallback className={"text-white bg-(--text-accent) font-bold"}>
                                {message.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-(--text-primary) font-semibold truncate">
                                {message.name}
                            </p>
                            <p className="truncate text-(--text-secondary)">
                                {message.subject}
                            </p>
                        </div>
                        <span className="text-(--text-secondary)"> {message.date} </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

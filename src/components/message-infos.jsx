
import {
    Card, CardTitle, 
    CardHeader, CardContent 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";


export default function MessageInfos({messages}){
    return (
        <Card className={"bg-(--bg-card) rounded-(--radius-card) border-(--border-card)"}>
            <CardHeader className={"flex justify-between"}>
                <CardTitle className={"flex gap-2"}>
                    <Separator orientation="vertical" className={"w-px bg-blue-400"}/>
                    <span className="text-(--text-primary)"> Message Recents </span>
                </CardTitle>
                
                <Badge className={"bg-(--text-accent) font-semibold text-sm rounded-[5px]"}>
                    {messages && messages.length}
                </Badge>
            </CardHeader>

            <CardContent className={"px-3 pb-2"}>
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

{/* Messages récents */}
//               <CardContent className="px-3 pb-4 space-y-0.5">
//                 {messages.map((m, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-blue-900/10 cursor-pointer transition-colors duration-150 group"
//                   >
//                     <Avatar className="w-8 h-8 flex-shrink-0 border border-blue-700/30">
//                       <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-[10px] font-bold text-white">
//                         {m.initials}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-[13px] font-semibold text-slate-200 truncate group-hover:text-blue-300 transition-colors">
//                         {m.name}
//                       </p>
//                       <p className="text-[11px] text-slate-500 truncate">{m.subject}</p>
//                     </div>
//                     <span className="text-[10px] text-slate-600 flex-shrink-0">{m.date}</span>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
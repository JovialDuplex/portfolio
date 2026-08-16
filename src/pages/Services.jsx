import {IconPicker} from "@/components/ui/icon-picker";
import {} from "lucide-react"
export default function ServicesPage(){
    const icons = [
        {
        name: "arrow",
        tags: ["git", "social"],
        categories: ["social"],

        },
    
    ]
    return (
        <div className="services-page">
            ServicePage
            <IconPicker/>
        </div>
    )
}
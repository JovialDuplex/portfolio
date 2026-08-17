import ServiceCard from "@/components/service-card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import useService from "@/hooks/services";
import { Search } from "lucide-react"
import { useEffect, useState } from "react";
import usePageMeta from "@/hooks/usePageMeta";

export default function ServicesPage(){
    const [query, setQuery] = useState("");
    const [services, setServices] = useState([]);
    const {getServices} = useService();

    usePageMeta({
        title: "My Services",
        description: "Discover the services I offer: web development, design, and more.",
        url: "/services",
    });

    useEffect(()=>{
        getServices().then((myservices)=>{
            setServices(myservices || []);
        }).catch(error=>{
            console.error(error);
        });

    }, []);
        
    const filteredItems = services.filter((service)=> service.service_name?.toLowerCase().includes(query.toLowerCase()));
    const [activeCard, setActiveCard] = useState(null);

    return (
        <div className="services-page text-(--text-primary) py-3 flex flex-col gap-6 w-full">
            <div className="header-page shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-2xl font-bold">My Services</span>
                
                <InputGroup className={"w-full sm:max-w-75"}>
                    <InputGroupAddon> <Search /></InputGroupAddon>
                    <InputGroupInput value={query} onChange={(e)=> setQuery(e.target.value)} name={"search"} type="search" placeholder="Search a service here ..."/>
                </InputGroup>
            </div>

            <div className="main-page w-full py-2 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                { filteredItems.length === 0 ? (
                    <span className="text-(--text-secondary)">No services found</span>
                ) : (
                    filteredItems.map((service, index) => (
                        <ServiceCard service={service} key={service._id || index} isFocus={activeCard === index} onFocus={()=>{setActiveCard(activeCard === index ? null : index)}}/>
                    ))
                )}
            </div>

        </div>
    )
}
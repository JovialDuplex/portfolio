import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import useService from "@/hooks/services";
import ServiceForm from "@/components/service-form";
import useActivitiesStore from "@/store/activtiesStore";
import { Icon } from "@/components/ui/icon-picker";
import { toast } from "sonner";
import usePageMeta from "@/hooks/usePageMeta";

const ServiceCard = function ({ service, isFocus, onFocus, onUpdate }) {
    const { deleteService } = useService();
    const { makeActivity } = useActivitiesStore()
    const deleteOneService = async function (e) {
        e.stopPropagation();
        try {
            await deleteService(service._id);
            toast.info("A service has been deleted successfully!");
            makeActivity("FolderX", "A Service has been deleted successfully !", new Date().toUTCString(), "service");
        } catch (error) {
            toast.error("An error has occurred when deleting service!");
            throw error;
        }
    };

    return (
        <div onClick={onFocus} className="bg-(--bg-card) max-h-70 rounded-[16px] p-6 sm:p-8 border border-(--border-card) cursor-pointer flex flex-col justify-between">
            <div>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center text-(--text-accent) mb-5 border border-(--text-accent)">
                    <Icon name={service.service_category?.category_icon || "HelpCircle"} />
                </div>

                <h3 className="font-bold text-[1.1rem] mb-3 text-(--text-primary)">
                    {service.service_name}
                </h3>

                <p className="text-(--text-secondary) text-[0.95rem] leading-tight mb-5 line-clamp-3">
                    {service.service_desc}
                </p>
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(service.service_skills) && service.service_skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-(--bg-tags) text-(--text-tags) py-1 px-3 rounded-[20px] text-[0.78rem] font-semibold"
                        >
                            {typeof skill === "object" ? skill.skill_name : skill}
                        </span>
                    ))}
                </div>
            </div>

            {isFocus && (
                <div className="flex gap-2 mt-6 *:flex-1">
                    <Button variant={'accent'} onClick={(e) => { e.stopPropagation(); onUpdate(service); }}>Edit</Button>
                    <Button variant={"destructive"} onClick={deleteOneService}>Delete</Button>
                </div>
            )}
        </div>
    )
};

export default function AdminServicesPage() {
    const { getServices } = useService();
    const { activityList } = useActivitiesStore();
    const [services, setServices] = useState([]);
    const [query, setQuery] = useState("");

    usePageMeta({
        title: "Manage Services",
        description: "Manage the services offered by your portfolio.",
    });

    const [openServiceForm, setOpenServiceForm] = useState(false);
    const [serviceForm, setServiceForm] = useState({
        mode: "create",
        service: null,
    });

    const openAddServiceForm = () => {
        setServiceForm({ mode: "create", service: null });
        setOpenServiceForm(true);
    };

    const openUpdateServiceForm = (service) => {
        setServiceForm({ mode: "update", service: service });
        setOpenServiceForm(true);
    };

    useEffect(() => {
        const loadServices = async () => {
            const data = await getServices();
            setServices(data || []);
        };

        loadServices();
    }, [activityList]);

    const [activeCard, setActiveCard] = useState(null);
    const filteredServices = services.filter((service) =>
        service.service_name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="text-(--text-primary) py-2 flex flex-col gap-6">
            {/* services page header */}
            <header className="header flex flex-col gap-5">
                <div className="first-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span className="title text-2xl font-bold uppercase">My Services</span>
                    <InputGroup className={"w-full sm:w-80"}>
                        <InputGroupAddon className={"bg-transparent hover:bg-transparent hover:text-white cursor-pointer"}> <Search /> </InputGroupAddon>
                        <InputGroupInput type={"text"} value={query} onChange={(e) => setQuery(e.target.value)} name={"search"} placeholder={"Search Services ...."} />
                    </InputGroup>
                </div>

                <div className="second-header font-semibold flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <Button onClick={openAddServiceForm} className={"cursor-pointer hover:bg-blue-600 bg-(--text-accent)"}> <Plus /> Add New Service</Button>
                    </div>
                    <span className="">Total Services : <Badge className={"bg-(--text-accent)"}>{services.length}</Badge></span>
                </div>
            </header>

            <ServiceForm open={openServiceForm} mode={serviceForm.mode} service={serviceForm.service} setOpen={setOpenServiceForm} />

            {/* Main section of the services page */}
            <section className="main-section min-h-0 px-1 py-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    filteredServices.length === 0 ? <span>No services found</span> :
                        filteredServices.map((service, index) => (
                            <ServiceCard
                                key={service._id || index}
                                service={service}
                                isFocus={activeCard === index}
                                onFocus={() => { setActiveCard(activeCard === index ? null : index) }}
                                onUpdate={openUpdateServiceForm}
                            />
                        ))
                }
            </section>
        </div>
    )
};
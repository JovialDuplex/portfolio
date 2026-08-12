import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import useService from "@/hooks/services";
import ServiceCard from "@/components/service-card";
import ServiceForm from "@/components/service-form";
import { IconPicker } from "../../index";
import * as SimpleIcon from "@icons-pack/react-simple-icons";

export default function AdminServicesPage() {
    const { getServices } = useService();
    const [services, setServices] = useState([]);

    const [openServiceForm, setOpenServiceForm] = useState(false);

    useEffect(() => {
        const loadServices = async () => {
            const data = await getServices();
            setServices(data);
        };

        loadServices();
    }, []);

    const [iconId, setIconId] = useState(null);
    const [IconComponent, setIconComponent] = useState(null);

    // useEffect(()=>{
    //     console.log(IconComponent);
    // }, [IconComponent]);

    return (
        <div className="text-(--text-primary) py-2">
            {/* header de la page des services */}
            <header className="header flex flex-col gap-5">
                <div className="first-header flex justify-between">
                    <span className="title text-2xl font-bold uppercase">My Services</span>
                    <InputGroup className={"w-100"}>
                        <InputGroupAddon className={"bg-transparent hover:bg-transparent hover:text-white cursor-pointer"}> <Search /> </InputGroupAddon>
                        <InputGroupInput type={"text"} name={"search"} placeholder={"Search Projects ...."} />
                    </InputGroup>
                </div>

                <div className="second-header font-semibold flex justify-between">
                    <div>
                        <Button onClick={() => setOpenServiceForm(true)} className={"cursor-pointer hover:bg-blue-600 bg-(--text-accent)"}> <Plus /> Add New Service</Button>
                    </div>
                    <span className="">Total Services : <Badge className={"bg-(--text-accent)"}>12</Badge></span>
                </div>

            </header>

            <ServiceForm open={openServiceForm} mode={"create"} setOpen={setOpenServiceForm} />
            {/* Section principale de la page des service */}
            <section className="main-section min-h-0 px-3 py-7 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            </section>
        </div>
    )
};
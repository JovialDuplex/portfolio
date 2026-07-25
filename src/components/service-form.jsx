import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as SimpleIcon from "@icons-pack/react-simple-icons";
import { IconPicker } from "./ui/icon-picker";

const ServiceForm = function({mode, open, setOpen, service}){
    const serviceSchema = yup.object().shape({
        service_name: yup.string().required("The Name of a service is required !"),

    })

    const {
        register, 
        handleSubmit, 
        formState
    } = useForm({resolver: yupResolver(serviceSchema)});

    const icons = Object.entries(SimpleIcon).map(([name, Icon])=>({
        name, 
        Icon
    }));
    
    return (
        <Dialog open={open} onOpenChange={setOpen}> 
            <DialogContent className={"flex flex-col [background:var(--bg-page)] text-(--text-primary) h-11/12 overflow-y-auto w-8/12! max-w-200!"}>
                <DialogHeader className={"shrink-0"}>
                    <DialogTitle className={"text-xl capitalize"}> {mode === "update" ? "Update a Service" : "Add a New Service"} </DialogTitle>
                    <DialogDescription> Fill this following form for {mode === "update" ? "update" : "add" } a service in the list </DialogDescription>
                </DialogHeader>

                <form className="flex-1 flex flex-col gap-5">
                    <Field>
                        <FieldLabel htmlFor={"service_name"} className={"capitalize"}> Service Name <span className="text-red-600">*</span></FieldLabel>
                        {formState.errors.service_name && <FieldError> {formState.errors.service_name.message }</FieldError>}
                        <Input {...register("service_name")}  className={`rounded-[5px] ${formState.errors.project_title ? 'border-red-500' : 'border-(--border-input)'}`} type={"text"} name={"service_name"} id={"service_name"}/>
                    </Field>

                    <IconPicker />
                    <Field> <Button className={`${mode==='create' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} capitalize`} disabled={!formState.isValid}>${mode==="create" ? "Create my service" : "Update my service"}</Button></Field>                    
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default ServiceForm;
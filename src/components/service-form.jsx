import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel, FieldDescription } from "./ui/field";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as SimpleIcon from "@icons-pack/react-simple-icons";
import CustomTextarea from "./custom-textarea";
import { FaCode, FaCube, FaFeather } from "react-icons/fa";
import {FaChartDiagram, } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";
import { 
    Combobox, 
    ComboboxChip, 
    ComboboxChips,  
    ComboboxEmpty, 
    ComboboxItem, 
    ComboboxList, 
    useComboboxAnchor, 
    ComboboxValue, 
    ComboboxContent, 
    ComboboxChipsInput
} from "./ui/combobox";
import React, { useState } from "react";

const MultipleSelect = function({items_list}){
    const anchor = useComboboxAnchor();
    const [value, setValue] = useState([]);

    return (
        <Combobox 
            multiple={true} 
            items={items_list} 
            defaultValue={[items_list[0]]}
            value={value}
            onValueChange={setValue}    
            // onInputValueChange={setValue}
        >
            <ComboboxChips>
                <ComboboxValue>
                    {value.map((item)=>(
                        <ComboboxChip key={item}>{item}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder="add skills"/>
            </ComboboxChips>
            
            <ComboboxContent>
                <ComboboxEmpty>No items found </ComboboxEmpty>
                <ComboboxList>
                    {(item)=>(
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

const ServiceForm = function({mode, open, setOpen, service}){
    const serviceSchema = yup.object().shape({
        service_name: yup.string().required("The Name of a service is required !"),
        service_desc: yup.string().required("The description of your service is required "),
        service_category: yup.string().required("The category of a service is required"),
        service_skills: yup.array().of(yup.string()).min(1, "Select at least one skills inside the list")
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
    const categories = [
        {name: "Web", Component: FaCode},
        {name: "SEO", Component: FaChartDiagram},
        {name: "App", Component: FaCube},
        {name: "Design", Component: FaFeather},
    ];
    const skills = [
        {name: "React", Component: <SimpleIcon.SiReact color={SimpleIcon.SiReactHex}/>},
        {name: "NextJs", Component: <SimpleIcon.SiNextdotjs color={SimpleIcon.SiNextdotjsHex}/>},
        {name: "Python", Component: <SimpleIcon.SiPython color={SimpleIcon.SiPythonHex}/>},
        {name: "NodeJs", Component: <SimpleIcon.SiNodedotjs color={SimpleIcon.SiNodedotjsHex}/>},
        {name: "Html5", Component: <SimpleIcon.SiHtml5 color={SimpleIcon.SiHtml5Hex}/>},
        
    ]
    const skills2 = [
        "yo",
        "bonjour",
        "bonsoir",
        "comment allez vous",
        "hello",
        "halo"
    ]
    const [value, setValue]= useState([]);

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
                        <Input {...register("service_name")}  className={`rounded-[5px] ${formState.errors.service_name ? 'border-red-500' : 'border-(--border-input)'}`} type={"text"} name={"service_name"} id={"service_name"}/>
                    </Field>

                    <Field>
                     <CustomTextarea 
                            label={"Service Description"}  
                            error={formState.errors.service_desc?.message}
                            {...register("service_desc")}
                            maxLength = {500}
                            fieldDesc={"Please fill this field and describe your service in less than 500 words "}
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"service_category"} className={"capitalize"}> Service Category <span className="text-red-600">*</span></FieldLabel>
                        
                        <Select items={categories} {...register("service_category")}>
                            <SelectTrigger className={"border-(--border-input)"}>
                                <SelectValue placeholder={"Select a Category"} />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {categories.map((item, index) => (
                                    <SelectItem key={index} value={item.name}>
                                    <item.Component className="text-blue-600"/> {item.name} 
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor={"service_skills"} className={"capitalize"}> Service Skills <span className="text-red-600">*</span></FieldLabel>
                        <FieldDescription> Select a list of skills that you want to attribute at this service </FieldDescription>
                        {/* <MultipleSelect items_list={skills2}/> */}
                        
                        <Combobox 
                            multiple={true} 
                            items={skills2} 
                            defaultValue={[skills2[0]]}
                            value={value}
                            onValueChange={setValue}    
                            // onInputValueChange={setValue}
                            {...register("service_skills")}
                        >
                            <ComboboxChips>
                                <ComboboxValue>
                                    {value.map((item)=>(
                                        <ComboboxChip key={item}>{item}</ComboboxChip>
                                    ))}
                                </ComboboxValue>
                                <ComboboxChipsInput placeholder="add skills"/>
                            </ComboboxChips>
                            
                            <ComboboxContent>
                                <ComboboxEmpty>No items found </ComboboxEmpty>
                                <ComboboxList>
                                    {(item)=>(
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </Field>

                    <Field> <Button className={`${mode==='create' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} capitalize`} disabled={!formState.isValid}>{mode==="create" ? "Create my service" : "Update my service"}</Button></Field>                    
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default ServiceForm;
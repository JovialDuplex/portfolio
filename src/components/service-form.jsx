import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel, FieldDescription } from "./ui/field";
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CustomTextarea from "./custom-textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    ComboboxContent,
    ComboboxChipsInput
} from "./ui/combobox";
import React, { useState, useEffect } from "react";
import useCategories from "@/hooks/categories";
import { Icon } from "@/components/ui/icon-picker";
import useSkills from "@/hooks/skills";
import useService from "@/hooks/services";
import { toast } from "sonner";
import useActivitiesStore from "@/store/activtiesStore";

const ServiceForm = function ({ mode, open, setOpen, service }) {
    const { getCategories } = useCategories();
    const { getSkills } = useSkills();
    const { createService, updateService } = useService();
    const { makeActivity } = useActivitiesStore();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data || []);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const serviceSchema = yup.object().shape({
        service_name: yup.string().required("The Name of a service is required !"),
        service_desc: yup.string().required("The description of your service is required "),
        service_category: yup.string().required("The category of a service is required"),
        service_skills: yup.array().of(yup.string()).min(1, "Select at least one skills inside the list")
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState
    } = useForm({
        resolver: yupResolver(serviceSchema),
        defaultValues: {
            service_name: service?.service_name || "",
            service_desc: service?.service_desc || "",
            service_category: typeof service?.service_category === "object" ? service.service_category?._id : service?.service_category || "",
            service_skills: Array.isArray(service?.service_skills) ? service.service_skills.map((s) => (typeof s === "object" ? s?._id : s)) : [],
        }
    });

    const [skills, setSkills] = useState([]);
    useEffect(() => {
        getSkills()
            .then((data) => {
                setSkills(data || []);
            })
            .catch((error) => {
                console.error("Error fetching skills:", error);
            });
    }, []);

    useEffect(() => {
        if (mode === "update" && service) {
            const categoryId = typeof service.service_category === "object" ? service.service_category?._id : service.service_category;
            const skillIds = Array.isArray(service.service_skills)
                ? service.service_skills.map((s) => (typeof s === "object" ? s?._id : s))
                : [];
            reset({
                service_name: service.service_name || "",
                service_desc: service.service_desc || "",
                service_category: categoryId || "",
                service_skills: skillIds,
            });
        } else {
            reset({
                service_name: "",
                service_desc: "",
                service_category: "",
                service_skills: [],
            });
        }
    }, [mode, service, open, reset]);

    const submitForm = async function (data) {
        try {
            if (mode === "update" && service?._id) {
                await updateService(service._id, data);
                toast.success("A service has been updated successfully!");
                makeActivity("PackageEdit", "A service has been updated successfully !", new Date().toUTCString(), "service");
            } else {
                await createService(data);
                toast.success("A service has been created successfully!");
                makeActivity("PackagePlus", "A Service has been created successfully !", new Date().toUTCString(), "service");
            }
            setOpen(false);
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred while saving the service");
            throw error;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={"flex flex-col [background:var(--bg-page)] text-(--text-primary) max-h-[90vh] overflow-y-auto w-[92vw] sm:w-[85vw] md:w-8/12 max-w-2xl"}>
                <DialogHeader className={"shrink-0"}>
                    <DialogTitle className={"text-xl capitalize"}> {mode === "update" ? "Update a Service" : "Add a New Service"} </DialogTitle>
                    <DialogDescription> Fill this following form for {mode === "update" ? "update" : "add"} a service in the list </DialogDescription>
                </DialogHeader>

                <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
                    <Field>
                        <FieldLabel htmlFor={"service_name"} className={"capitalize"}> Service Name <span className="text-red-600">*</span></FieldLabel>
                        {formState.errors.service_name && <FieldError> {formState.errors.service_name.message}</FieldError>}
                        <Input {...register("service_name")} className={`rounded-[5px] ${formState.errors.service_name ? 'border-red-500' : 'border-(--border-input)'}`} type={"text"} name={"service_name"} id={"service_name"} />
                    </Field>

                    <Field>
                        <CustomTextarea
                            label={"Service Description"}
                            error={formState.errors.service_desc?.message}
                            {...register("service_desc")}
                            maxLength={500}
                            fieldDesc={"Please fill this field and describe your service in less than 500 words "}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor={"service_category"} className={"capitalize"}> Service Category <span className="text-red-600">*</span></FieldLabel>
                        {formState.errors.service_category && (
                            <FieldError>{formState.errors.service_category.message}</FieldError>
                        )}
                        <Controller
                            name="service_category"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className={`w-full ${formState.errors.service_category ? 'border-red-500' : 'border-(--border-input)'}`}>
                                        <SelectValue placeholder={"Select a Category"} />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {categories.map((item) => (
                                            <SelectItem key={item._id} value={item._id}>
                                                <span className="flex items-center gap-2 capitalize">
                                                    <Icon name={item.category_icon} />
                                                    <span>{item.category_name}</span>
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor={"service_skills"} className={"capitalize"}> Service Skills <span className="text-red-600">*</span></FieldLabel>
                        <FieldDescription> Select a list of skills that you want to attribute at this service </FieldDescription>
                        {formState.errors.service_skills && (
                            <FieldError>{formState.errors.service_skills.message}</FieldError>
                        )}
                        <Controller
                            name={"service_skills"}
                            control={control}
                            render={({ field }) => (
                                <Combobox
                                    multiple={true}
                                    items={skills}
                                    getItemValue={(item) => (typeof item === "object" && item ? item._id : item)}
                                    getItemLabel={(item) => (typeof item === "object" && item ? item.skill_name : item)}
                                    value={field.value || []}
                                    onValueChange={field.onChange}
                                >
                                    <ComboboxChips>
                                        <ComboboxValue>
                                            {(field.value || []).map((id) => {
                                                const skillObj = skills.find((s) => s._id === id);
                                                const label = skillObj ? skillObj.skill_name : id;
                                                return (
                                                    <ComboboxChip key={id} value={id}>
                                                        {label}
                                                    </ComboboxChip>
                                                );
                                            })}
                                        </ComboboxValue>
                                        <ComboboxChipsInput placeholder="Add skills..." />
                                    </ComboboxChips>

                                    <ComboboxContent>
                                        <ComboboxEmpty>No skills found</ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item._id || item} value={item._id || item}>
                                                    {item.skill_name || item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            )}
                        />
                    </Field>

                    <Field orientation="horizontal" className={"grid grid-cols-2 gap-3"}>
                        <Button className={`${mode === 'create' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} capitalize cursor-pointer`} disabled={!formState.isValid} type={"submit"}>
                            {mode === "create" ? "Create my service" : "Update my service"}
                        </Button>
                        <Button type={"button"} variant="destructive" className={"w-full cursor-pointer"} onClick={() => setOpen(false)}> Cancel </Button>
                    </Field>
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default ServiceForm;

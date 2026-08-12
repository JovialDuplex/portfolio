import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "./ui/item";

import * as LucideIcon from "lucide-react";
import { Separator } from "./ui/separator";
import useCategories from "@/hooks/categories";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldLabel, FieldDescription, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { IconPicker, Icon } from "./ui/icon-picker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import useActivitiesStore from "@/store/activtiesStore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CategoriesItems = function({id, category_name, category_icon, onEdit}){
    const {deleteCategory} = useCategories();
    const {makeActivity} = useActivitiesStore();

    const removeCategory = async function(){
        try{
            await deleteCategory(id);
            toast("A category has been deleted successfully !");
            makeActivity("FolderX", "A category has been deleted successfully !", new Date().toUTCString(), "project");
        } catch(error){
            console.log(error.message);
            toast.error("Failed to delete category");
        }
    };

    return (
        <Item className={"text-(--text-primary) border-(--border-card)"}>
            <ItemMedia variant="icon">
                <Icon name={category_icon}/>
            </ItemMedia>

            <ItemContent>
                <ItemTitle className={"capitalize font-semibold"}>{category_name}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Button variant="accent" onClick={() => onEdit({ id, category_name, category_icon })}> Edit </Button>
                <Button className={"bg-red-500 hover:bg-red-600"} onClick={removeCategory}> Delete </Button>
            </ItemActions>
        </Item>
    )
}

export default function CategoriesInfos({category_list = []}){
    const [openDialog, setOpenDialog] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categoryValidationSchema = yup.object().shape({
        category_name: yup
            .string()
            .required("The category name is required")
            .min(2, "The category name must be at least 2 characters"),
        category_icon: yup
            .string()
            .required("The category icon is required"),
    });

    const {makeActivity} = useActivitiesStore();
    const {createCategory, updateCategory} = useCategories();

    const {
        register, 
        handleSubmit,
        control,
        formState,
        reset,
    } = useForm({
        mode: "onChange", 
        resolver: yupResolver(categoryValidationSchema),
        defaultValues: {
            category_name: "",
            category_icon: "",
        }
    });

    const handleCreate = () => {
        setFormMode("create");
        setSelectedCategory(null);
        reset({
            category_name: "",
            category_icon: "",
        });
        setOpenDialog(true);
    };

    const handleEdit = (category) => {
        setFormMode("update");
        setSelectedCategory(category);
        reset({
            category_name: category.category_name,
            category_icon: category.category_icon,
        });
        setOpenDialog(true);
    };

    const handleDialogOpenChange = (isOpen) => {
        setOpenDialog(isOpen);
        if (!isOpen) {
            reset({
                category_name: "",
                category_icon: "",
            });
            setSelectedCategory(null);
        }
    };
    
    const submitForm = async function(data) {
        try {
            if(formMode === "create") {
                await createCategory(data);
                toast("A category has been created successfully !");
                makeActivity("FolderPlus", "A category has been created successfully !", new Date().toUTCString(), "project");
            } else if (formMode === "update" && selectedCategory) {
                await updateCategory(selectedCategory.id, data);
                toast("A category has been updated successfully !");
                makeActivity("FolderEdit", "A category has been updated successfully !", new Date().toUTCString(), "project");
            }
            handleDialogOpenChange(false);
        } catch(error) {
            console.log(error);
            toast.error("An error occurred while saving the category.");
        }
    }
    
    return (
        <>
            <Dialog open={openDialog} onOpenChange={handleDialogOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> {formMode === "create" ? "Add New Category" : "Update Category"} </DialogTitle>
                        <DialogDescription> Fill this form to {formMode === "create" ? "add a new" : "update this"} category </DialogDescription>
                    </DialogHeader>
                    
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
                        <Field>
                            <FieldLabel htmlFor={"category_name"}> Category Name <span className="text-red-500"> * </span></FieldLabel>
                            {formState.errors.category_name && <FieldError>{formState.errors.category_name.message}</FieldError>}
                            <Input {...register("category_name")} className={`${formState.errors.category_name ? 'border-destructive' : 'border-(--border-input)'}`} type={"text"} name={"category_name"} id={"category_name"}/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={"category_icon"}> Category Icon <span className="text-red-500"> * </span></FieldLabel>
                            {formState.errors.category_icon && <FieldError>{formState.errors.category_icon.message}</FieldError>}
                            <FieldDescription> Click on this button and select one icon for your category </FieldDescription>
                            <Controller 
                                name={"category_icon"}
                                control={control}
                                render={({ field }) => (
                                    <IconPicker value={field.value} onValueChange={field.onChange}/>
                                )}
                            />
                        </Field>
                    
                        <DialogFooter>
                            <Button variant="accent" disabled={!formState.isValid} type={"submit"}> {formMode === "create" ? "Add" : "Update" }</Button>
                            <Button variant="destructive" type={"button"} onClick={() => handleDialogOpenChange(false)}> Cancel </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
 
            <div className="categories-infos">
                <div className="card-header px-2 pt-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Separator orientation="vertical" className={"bg-(--text-accent)"} />
                        <span className="text-(--text-accent) font-semibold">My Categories</span>
                    </div>
                    <Badge className={"bg-(--text-accent) rounded-[5px] font-semibold"}> {category_list.length} </Badge>
                </div>
                <div className="flex flex-col gap-3 mt-6">
                    <Button variant={"accent"} style={{width: "max-content"}} onClick={handleCreate}> <LucideIcon.Plus /> Add new </Button>
                    {category_list.map((value, index)=>(
                        <CategoriesItems key={value._id || index} id={value._id} category_name={value.category_name} category_icon={value.category_icon} onEdit={handleEdit}/>
                    ))}
                </div>
            </div>
        </>
    )
}

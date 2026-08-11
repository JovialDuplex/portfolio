import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "./ui/item";

import * as LucideIcon from "lucide-react";
import { Separator } from "./ui/separator";
import useCategories from "@/hooks/categories";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { Input } from "./ui/input";
import { IconPicker, Icon } from "./ui/icon-picker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import useActivitiesStore from "@/store/activtiesStore";

const CategoriesItems = function({id, category_icon, category_name}){
    const {deleteCategory} = useCategories();
    const {makeActivity} = useActivitiesStore()
    const removeCategory = async function(){
        try{
            await deleteCategory(id);
            toast("A category has been deleted successfully !");
            makeActivity("FolderX", "A category has been deleted successfully !", new Date().toUTCString(), "project");
        } catch(error){
            console.log(error.message);
            throw error;
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
                <Button variant="accent"> Edit </Button>
                <Button className={"bg-red-500 hover:bg-red-600"} onClick={removeCategory}> Delete </Button>
            </ItemActions>
        </Item>
    )
}
export default function CategoriesInfos({category_list}){
    const [openDialog, setOpenDialog] = useState(false);
    const {makeActivity} = useActivitiesStore();

    const {createCategory} = useCategories();

    const {
        register, 
        handleSubmit,
        control,
        formState,

    } = useForm({mode: "onSubmit"});

    const submitForm = async function(data) {
        try {
            await createCategory(data);
            setOpenDialog(false);
            toast("A category has been created successfully !")
            makeActivity("FolderPlus", "A category has been created successfully !", new Date().toUTCString(), "project");
            
        } catch(error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> Add New Category </DialogTitle>
                        <DialogDescription> Fill this form to add new category </DialogDescription>
                    </DialogHeader>
                    
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
                        <Field>
                            <FieldLabel htmlFor={"category_name"}> Category Name <span className="text-red-500"> * </span></FieldLabel>
                            <Input {...register("category_name")} className={"border-(--border-input)"} type={"text"} name={"category_name"} id={"category_name"}/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={"category_icon"}> Category Icon <span className="text-red-500"> * </span></FieldLabel>
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
                            <Button variant="accent" type={"submit"}> Add </Button>
                            <Button variant="destructive" type={"button"} onClick={_=>setOpenDialog(false)}> Cancel </Button>
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
                    <Badge className={"bg-(--text-accent) rounded-[5px] font-semibold"}> 1 </Badge>
                </div>
                <div className="flex flex-col gap-3 mt-6">
                    <Button variant={"accent"} style={{width: "max-content"}} onClick={_=> setOpenDialog(true)}> <LucideIcon.Plus /> Add new </Button>
                    {category_list.map((value, index)=>(
                        <CategoriesItems key={index} id={value._id} category_name={value.category_name} category_icon={value.category_icon}/>
                    ))}
                </div>
            </div>
        </>
        
    )
}

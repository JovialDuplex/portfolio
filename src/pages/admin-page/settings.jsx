import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import useUserStore from "@/store/userStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaCloudArrowUp, FaUser } from "react-icons/fa6";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import CustomTextarea from "@/components/custom-textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";


const ChangePasswordSteps = function({open, setOpen}){
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogHeader> Change your password </DialogHeader>
            <DialogDescription>
                Follow these steps to change your account password
            </DialogDescription>
        </Dialog>
    )
};


export default function AdminSettingsPage(){    
    const {user} = useUserStore();
    const personnalInfoValidation = yup.object().shape({
        user_name: yup.string().required("The name of user required "),
        user_second_name: yup.string().required("The second name of user is required "),
        user_job: yup.string().required("The title your job is required ").max(32, "The max length of the title of your job should be less than 32 character"),
        user_desc: yup.string().required("Your description is required").max(256, "Your description should not exceed 256 characters "),
        user_account_name: yup.string().required("The name of your account is required "),
        user_email: yup.string().email("This email is not valide").required("The email of user is required "), 
        user_picture: yup.mixed().nullable().test("fileSize", "The size of your image should be less than 5MB", (value)=>{
                                                    const file =  value instanceof FileList ? value[0] : value;
                                                    return !!file && value.size <= 5*1024*1024;
                                                })
                                                .test("type", "Only the image is required !", (value)=>{
                                                    const file= value instanceof FileList ? value[0] : value;
                                                    return !!file && !!file.type && file.type.startsWith("image/") 
                                                }),

    });

    const {
        handleSubmit, 
        formState, 
        setValues, 
        reset,
        resetDefaultValues,
        register,

    } = useForm({ mode:"onSubmit", resolver: yupResolver(personnalInfoValidation)});
    
    const updateUserData = function(data) {
        // console.log(formState.dirtyFields);
        console.log(data);
    };

    const [skills, setSkills] = useState([
        {id: 0, name: "php"}, {id: 1, name: "python"}, {id: 2, name: "javascript"}, 
        {id: 3, name: "html"}, {id: 4, name: "css"}, {id: 5, name: "typescript"}, 
        {id: 6, name: "node js"},
    ]);

    const [skillValue, setSkillValue] = useState("");
    const addNewSkill = function(){
        if(skillValue !== "") {setSkills(prev=> [...prev, {id: prev.length, name: skillValue}]);}
        return;
    };
    const deleteSkill = (idSkill)=> {
        setSkills(prev=> prev.filter(skill=> skill.id != idSkill));
    };

    useEffect(()=>{
        console.log(user);
        reset({
            user_name: user.user_name, 
            user_email: "takeuhduplex2006@gmail.com",
            user_second_name: user.user_secondName,
            user_desc: user.user_desc,
            user_job: user.user_jobName,
            user_account_name: user.user_account_name
        })
    }, [])

    return (
        <div className={"text-(--text-primary) flex flex-col"}>
            <header className={"setting-header *:my-2 "}>
                <Button className={"bg-(--bg-button) text-(--text-primary)"}> <ArrowLeft/> <span className="font-semibold">Back to dashboard </span> </Button>
                <div className="flex justify-between">
                    <h1 className="text-2xl capitalize font-bold"> Settings </h1>
                    <Button variant="accent" className={`w-20 font-semibold`}> Save </Button>
                </div>
            </header>
            <Tabs className={"flex flex-col flex-1 py-2"} defaultValue={"personnal"}>
                <TabsList className={"shrink-0 bg-(--bg-button) w-full top-0"}>
                    <TabsTrigger value={"personnal"}>Personnal Informations </TabsTrigger>
                    <TabsTrigger value={"jobs"}> Jobs Informations </TabsTrigger>
                    <TabsTrigger value={"security"}> Security </TabsTrigger>
                </TabsList>

                <TabsContent className={""} value={"personnal"}>
                    <section className="flex-1 body-settings overflow-y-auto py-5">
                        <form className="max-w-full lg:max-w-1/2 *:mb-10" onSubmit={handleSubmit(updateUserData)}>
                            <Field className={"user_picutre"} orientation="horizontal">
                                <Avatar className={"w-30 h-30 "}>
                                    <AvatarImage src={`${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}`} className={"object-top object-contain border-(--text-secondary) border-2"}/>
                                    <AvatarFallback> <FaUser /> </AvatarFallback>
                                </Avatar>
                                
                                <div className="flex flex-col gap-3 ">
                                    <span className="font-semibold"> Profile Picture </span>
                                    <div className="grid grid-rows-2 gap-2 md:grid-cols-2">
                                        <Button type={"button"} className={"bg-(--text-accent) hover:bg-(--text-accent-glow)"}><FaCloudArrowUp/> Upload Image </Button>
                                        <Button type={"button"} variant="outline"> Remove </Button>
                                    </div>
                                    <Input className={"hidden"} type={"file"} id={"user_picture"} {...register("user_picture")} name={"user_picture"}/>
                                    <p className="text-(--text-secondary)"> We support PNGs, JPEGs and GIFs under 5MB</p>
                                </div>
                            </Field>

                            <FieldGroup className={"flex flex-col md:flex-row"}>
                                <Field>
                                    <FieldLabel htmlFor={"user_name"}>First Name <span className="text-red-500">*</span></FieldLabel>
                                    <Input {...register("user_name")} type={"text"} id={"user_name"} placeholder={"enter your first name "} className={"border-(--border-input)"}/>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor={"user_second_name"}>Second Name <span className="text-red-500">*</span></FieldLabel>
                                    <Input {...register("user_second_name")} type={"text"} name={"user_second_name"} id={"user_second_name"} placeholder={"enter your first name "} className={"border-(--border-input)"}/>
                                </Field>
                            </FieldGroup>

                            <Field>
                                <FieldLabel htmlFor={"user_email"}>Email <span className="text-red-500">*</span></FieldLabel>
                                <div className="flex gap-2">
                                    <Input {...register("user_email")} type={"email"} id={"user_email"} placeholder={"@gmail.com"} className={"border-(--border-input)"} name={"user_email"} /> 
                                </div>
                            </Field>
                                
                        </form>

                    </section>
                </TabsContent>

                <TabsContent value={"jobs"} className={"flex-1"}>
                    <form className="py-5 max-w-full overflow-y-auto flex-1 min-h-0 lg:max-w-1/2 flex flex-col gap-5">
                        <Field>
                            <FieldLabel htmlFor={"user_job_name"}> Job Title <span className="text-red-500">*</span></FieldLabel>
                            <FieldDescription>Fill your job title here</FieldDescription>
                            <Input {...register("user_job")} type={"text"} name={"user_job_name"} id={"user_job_name"} className={"border-(--border-input)"} />
                        </Field>
                        <Field>
                            <CustomTextarea 
                                fieldDesc={"Please describe yourself here"}
                                label={"Describe yourselves here"}
                                maxLength = {256}
                                {...register("user_desc")}
                                required
                            />
                        </Field>
                        
                        <Field>
                            <FieldLabel> My Skills </FieldLabel>
                            <FieldDescription> Click on this below button to add new skill inside the list </FieldDescription>
                            <div className="flex gap-2 flex-row-reverse">
                                <Button type={"button"} variant="accent" onClick={addNewSkill} style={{maxWidth: "fit-content"}}><Plus /> Add New Skill </Button>
                                <Input value={skillValue} onChange={(event)=>setSkillValue(event.target.value)} className={"border-(--border-input)"} type={"text"} placeholder={"enter your skill name here"} />
                            </div>
                            <div className={"overflow-y-auto h-40 w-full *:uppercase grid grid-cols-3 md:grid-cols-4 gap-2 rounded-[5px] p-3"}>
                                {skills.map((skill, index)=>(
                                    <Badge key={index} className={"text-(--text-primary) border-(--border-input) bg-transparent font-semibold p-3"}> 
                                        {skill.name} 
                                        <Button size="icon-xs" variant="ghost" type={"button"} onClick={()=>deleteSkill(skill.id)}><X/></Button>
                                    </Badge>
                                ))}
                            
                            </div>
                        </Field>
                        
                    </form>
                </TabsContent>
                
                <TabsContent value={"security"}>
                    <form className="py-5 max-w-full overflow-y-auto flex-1 min-h-0 lg:max-w-1/2 flex flex-col gap-5">
                        <Field>
                            <FieldLabel htmlFor={"user_account_name"}> Account name * </FieldLabel>
                            <Input {...register("user_account_name")} type={"text"} className={"border-(--border-input)"} name={"user_account_name"} id={"user_account_name"}/>
                        </Field>
                        
                        <Separator className={"bg-(--border-card) "}/>

                        <Field orientation="horizontal" className={"*:mx-3"}>
                            <div>
                                <FieldTitle className={"text-lg"}> Account Password  </FieldTitle>
                                <FieldDescription>
                                    Log in with your password instead of using temporary login codes 
                                </FieldDescription>
                            </div>
                            <Button type={"button"} variant="outline" className={"capitalize"}> Change password</Button>
                        </Field>
                    </form>
                </TabsContent>
            </Tabs>

            
        </div>
    )
};
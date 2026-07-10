import {useRef, useState, useEffect} from "react";
import {Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Plus, X} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {FaCheckCircle, FaFileUpload, FaCircle } from "react-icons/fa";;
import * as yup from "yup";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useProject from "@/hooks/projects";
import {Spinner} from "@/components/ui/spinner";
import { toast } from "sonner";
import useProjectStore from "@/store/useProjectStore";

export default function ProjectForm({isUpdate}){

    const projectSchema = yup.object().shape({
        project_title: yup.string().max(32, ({max})=>`The max length of your project title should be not more than ${max} characters`).required("The Title of a project is required "),
        project_desc: yup.string().max(256, ({max})=> `The max length of your project description should be not more than ${max} characters`).required("The Description of your project is required !"),
        project_content: yup.string().required("The explaining of your project is required !"),
        project_cover_image: !isUpdate ? yup.mixed().required("The cover image is required !").test("fileSize", "The size of your image should be less than 5M0", (value)=>{
            return value && value.size <= 5*1024*1024;
        }).test("type", "Only the image is required !", (value)=>{return value && value.type.startsWith("image/") }) : yup.mixed().nullable(),
        project_github_url: yup.string().required("The github url of your project is required !").url("This URL is not valid"),
        project_url: yup.string().notRequired().url("This URL is not valid"),
        project_status: yup.string().oneOf(["pending", "completed"], "The status of your project should be completed or pending").required("The status of your project is required !"),
    });

    const {register, 
            reset,
            setValue,
            resetField,
            handleSubmit, 
            formState: {errors}
        } = useForm({resolver: yupResolver(projectSchema)});


    const handleButtonClick = function(){document.getElementById("project_cover_image").click(); 
        // toast("The file select has been open ", {action: {label: "Cancel", onClick:()=>console.log("cancel")}, description:"creation"})
    };
    const [previewImageUrl, setPreviewImageUrl] = useState(null);

    const handleFileChange = function(event){
        const file = event.target.files[0];
        setValue("project_cover_image", file, {shouldValidate: true, shouldDirty: true});
        if(file && file.type.startsWith("image/")){
            const url= URL.createObjectURL(file);
            setPreviewImageUrl(url);
        }
    }
    
    
    const cancelSelectImage = function(){
        resetField("project_cover_image");
        URL.revokeObjectURL(previewImageUrl);
        setPreviewImageUrl(null);
    };

    useEffect(()=>{
        return ()=> {
            if(previewImageUrl) {
                URL.revokeObjectURL(previewImageUrl)
            }
        }
    }, [previewImageUrl]);

    const [selectValue, setSelectValue] = useState("pending");
    const changeSelectValue = (event) => setSelectValue(event.target.value);

    const [openDialog, setOpenDialog] = useState(false);
    const {createProject, updateProject} = useProject();
    
    
    // const updateMyProject = async function(data) {
    //     try {
    //         await updateProject(data);
    //         console.log("The Project has been created ");
    //         reset();
    //     } catch(error) {
    //         console.log(error);
    //     } 
    // }
    
    const [isLoading, setIsLoading] = useState(false);
    const {addActionProject} = useProjectStore();
    const createMyProject = async function(data) {
        try {
            addActionProject();
            await createProject(data);
            setIsLoading(true);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false);
            setOpenDialog(false);
        }
    };


    return (
                    
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            
            <Button onClick={()=>{setOpenDialog(true)}} className={"cursor-pointer hover:bg-blue-600 bg-(--text-accent)"}> <Plus /> Add New Project</Button>
            
            <DialogContent className={"flex flex-col [background:var(--bg-page)] text-(--text-primary) h-11/12 overflow-y-auto w-8/12! max-w-200!"}>
                <DialogHeader className={"shrink-0"}>
                    <DialogTitle className={"text-xl"}> Add a Project </DialogTitle>
                    <DialogDescription> Fill this following form for add a project in the list </DialogDescription>
                </DialogHeader>

                <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit(createMyProject)}>
                    <Field>
                        <FieldLabel htmlFor={"project_title"} className={"capitalize"}> Project Title <span className="text-red-600">*</span></FieldLabel>
                        {errors.project_title && <FieldError> {errors.project_title.message }</FieldError>}
                        <Input {...register("project_title")} className={`rounded-[5px] ${errors.project_title ? 'border-red-500' : 'border-(--border-input)'}`} type={"text"} name={"project_title"} id={"project_title"}/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor={"project_desc"} className={"capitalize"}> Describe your project <span className="text-red-600">*</span></FieldLabel>
                        {errors.project_desc && <FieldError> {errors.project_desc.message }</FieldError>}
                        
                        <Textarea {...register("project_desc")} placeholder={"Make a brefly describe of your project "} className={`rounded-[5px] ${errors.project_desc ? 'border-red-500' : 'border-(--border-input)'}`} type={"text"} name={"project_desc"} id={"project_desc"}/>
                    </Field>
                    
                    <Field>
                        <FieldLabel htmlFor={"project_content"} className={"capitalize"}> Explain your project <span className="text-red-600">*</span> </FieldLabel>
                        {errors.project_content && <FieldError> {errors.project_content.message }</FieldError>}
                        <Textarea {...register("project_content")} placeholder={"Enter a main content of your project "} className={`rounded-[5px] ${errors.project_content ? 'border-red-500' : 'border-(--border-input)'}`} type={"text"} name={"project_content"} id={"project_content"}/>
                    </Field>
                    
                    <Field>
                        <FieldLabel htmlFor={"project_image"} className={"capitalize"}> Cover Image <span className="text-red-600">*</span></FieldLabel>
                        <FieldDescription> Add a cover image for illustrated your project </FieldDescription>
                        {errors.project_cover_image && <FieldError>{errors.project_cover_image.message}</FieldError>}
                        <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-3 h-50 overflow-hidden min-h-0">
                            {
                                !previewImageUrl && (
                                <Button type={"button"} onClick={handleButtonClick} className={"rounded-[5px] flex flex-col gap-3 h-full border-dashed border-2 bg-transparent border-black text-black hover:bg-transparent cursor-pointer"}>
                                    <FaFileUpload className="size-28 text-blue-500"/> 
                                </Button>)
                            }
                            
                            {
                                previewImageUrl && (
                                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-black">
                                    <FaCheckCircle className="size-28 text-green-500" />
                                </div>)
                            }
                            
                            <div className={`preview-image rounded-[5px] relative flex justify-center ${previewImageUrl ? "bg-transparent" : "bg-amber-900" }`}>
                                {previewImageUrl && (<Button variant={"ghost"} className={"font-black absolute right-0 top-0 cursor-pointer"} onClick={cancelSelectImage} type={"button"}> <X /></Button>)}
                                {previewImageUrl && (<img src={previewImageUrl} alt={"preview-image"} className="overflow-hidden h-full w-auto"/>) }
                            </div>
                            <Input {...register("project_cover_image")} onChange={handleFileChange} type={"file"} id={"project_cover_image"} className={"hidden"} accept={"image/*"} name={"project_cover_image"}/>
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor={"project_github_url"} className={"capitalize"}> Github URL <span className="text-red-600">*</span></FieldLabel>
                        {errors.project_github_url && <FieldError> {errors.project_github_url.message }</FieldError>}
                        <Input {...register("project_github_url")} type={"url"} placeholder={"https://myproject.github.com"} className={`rounded-[5px] ${errors.project_github_url ? 'border-red-500' : 'border-(--border-input)'} `} name={"project_github_url"} id={"project_github_url"} />
                    </Field>
                    
                    <Field>
                        <FieldLabel htmlFor={"project_url"} className={"capitalize"}> Project URL </FieldLabel>
                        {errors.project_url && <span className="text-red-500"> {errors.project_url.message }</span>}
                        <Input {...register("project_url")} type={"url"} placeholder={"https://my-project.com"} className={`rounded-[5px] ${errors.project_url ? 'border-red-500' : 'border-(--border-input)'} `} name={"project_url"} id={"project_url"} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor={"project_image"} className={"capitalize"}> Statut Project </FieldLabel>
                        <FieldDescription> Select an actualy statut of your project </FieldDescription>
                        <div className="flex items-center gap-2 rounded-[5px] p-1 border border-(--border-input)">
                            <FaCircle className={selectValue == "pending" ? "text-yellow-500" : "text-green-500"}/>
                            <select className="flex-1" {...register("project_status")} name={"project_status"} onChange={changeSelectValue}>
                                <option value={"pending"} className="flex justify-between">  Pending </option>
                                <option value={"completed"}> Completed </option>
                            </select>
                        </div>

                    </Field>

                    <Field orientation="horizontal" className={"grid grid-cols-2"}>
                        <Button type={"submit"} className={"bg-green-500 hover:bg-green-600 cursor-pointer"}>{isLoading ? <Spinner/> :"Submit Form"} </Button>
                        <Button type={"reset"} className={"w-full bg-red-500 hover:bg-red-600 cursor-pointer"} onClick={()=>{setOpenDialog(false)}}> Cancel </Button>
                    </Field>
                </form>
            </DialogContent>
        </Dialog>
    )
}
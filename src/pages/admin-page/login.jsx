import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Input, } from "@/components/ui/input";
import {InputGroup, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Eye, EyeClosed, Loader, LoaderPinwheelIcon} from "lucide-react"
import useUser from "@/hooks/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner} from "@/components/ui/spinner";
import { FaTruckLoading } from "react-icons/fa";
import usePageMeta from "@/hooks/usePageMeta";

export default function LoginPage (){
    const [show, setShow] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    usePageMeta({
        title: "Admin Login",
        description: "Sign in to manage your portfolio.",
        url: "/admin/login",
    });

    const toggleShowPassword = ()=>{setShow(prev => !prev)};
    const {login} = useUser();
    
    const loginSchema = yup.object({
        user_account_name : yup.string().required("The Name is required !"),
        user_account_password: yup.string().required("Please the password is required !"),
    });

    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm({resolver: yupResolver(loginSchema)})

    const loginAdmin = async function(data){
        setIsLoading(true);
        try {
            await login(data);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="login-page [background:var(--bg-page)] text-(--text-primary) min-h-screen w-full flex flex-col gap-6 justify-center items-center p-4"
        >
            <img alt={"logo-app"} src={"/logo.png"} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg"/>
            
            <div className="login-container flex flex-col px-6 py-8 bg-(--bg-card-form) border-(--text-accent) backdrop:blur-lg border w-full sm:w-10/12 md:w-6/12 lg:w-4/12 max-w-md rounded-(--radius-card) shadow-2xl">
                <div className="form-header flex justify-center">
                    <span className="form-title text-xl uppercase font-bold tracking-wide"> Admin Login Form </span>
                </div>

                <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit(loginAdmin)}>
                    <Field>
                        <FieldLabel className={"text-(--text-secondary)"} htmlFor={"user_account_name"}> Name </FieldLabel>
                        {errors.user_account_name && <FieldError>{errors.user_account_name.message}</FieldError>}
                        <Input {...register("user_account_name")} type={"text"} id={"user_account_name"} name={"user_account_name"} className={`border-(--text-accent) text-(--text-secondary) `}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"user_account_password"} className={"text-(--text-secondary)"}>Password </FieldLabel>
                        {errors.user_account_password && <FieldError>{errors.user_account_password.message}</FieldError>}
                        <InputGroup className={"border-(--text-accent)"}>
                            <InputGroupInput {...register("user_account_password")} name={"user_account_password"} id={"user_account_password"} type={show ? "text" : "password"}/>
                            <InputGroupButton type="button" onClick={toggleShowPassword} className={"cursor-pointer"}>{show ? <Eye />: <EyeClosed />} </InputGroupButton>
                        </InputGroup>
                    </Field>
                    <Field>
                        <Button className={"bg-(--text-accent) cursor-pointer hover:bg-(--text-accent-glow) font-bold py-3 mt-2"} type={"submit"}> {isloading ? <Spinner className={"size-5"}/> : "Login"} </Button>
                    </Field>
                </form>
            </div>   
        </div>
    )
}
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
import {Spinner} from "@/components/ui/spinner";
import { FaTruckLoading } from "react-icons/fa";

export default function LoginPage (){
    const [show, setShow] = useState(false);
    const [isloading, setIsLoading] = useState(false);

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
            className="login-page [background:var(--bg-page)] text-(--text-primary) h-screen w-full flex flex-col gap-5 justify-center items-center"
        >
            <img alt={"logo-app"} src={"/logo.png"} className="w-30 h-30 rounded-full"/>
            
            <div className="login-container flex flex-col px-4 py-6 bg-(--bg-card-form) border-(--text-accent) backdrop:blur-lg border w-3/12 min-w-[320px] max-w-175 h-6/12 rounded-(--radius-card)">
                <div className="form-header flex justify-center">
                    <span className="form-title text-xl uppercase font-semibold"> Admin Login Form </span>
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
                            <InputGroupButton onClick={toggleShowPassword} className={"cursor-pointer"}>{show ? <Eye />: <EyeClosed />} </InputGroupButton>
                        </InputGroup>
                    </Field>
                    <Field>
                        <Button className={"bg-(--text-accent) cursor-pointer hover:bg-(--text-accent-glow)"} type={"submit"}> {isloading ? <Spinner className={"size-5"}/> : "Login"} </Button>
                    </Field>
                </form>
            </div>   
        </div>
    )
}
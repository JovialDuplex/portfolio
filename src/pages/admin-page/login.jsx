import { Button } from "@/components/ui/button";
import useThemeStore from "@/store/themStore"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
    Field, FieldLabel, 

} from "@/components/ui/field";
import {Input, } from "@/components/ui/input";
import {InputGroup, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Eye, EyeClosed} from "lucide-react"


export default function LoginPage (){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const goToHome = ()=>{navigate("/dashboard")}
    const toggleShowPassword = ()=>{setShow(prev => !prev)};
    
    return (
        <div 
            className="login-page [background:var(--bg-page)] text-(--text-primary) h-screen w-full flex flex-col gap-5 justify-center items-center"
        >
            <img alt={"logo-app"} src={"/logo.png"} className="w-30 h-30 rounded-full"/>
            
            <div className="login-container flex flex-col px-4 py-6 bg-(--bg-card-form) border-(--text-accent) backdrop:blur-lg border w-3/12 min-w-[320px] max-w-175 h-7/12 rounded-(--radius-card)">
                <div className="form-header flex justify-center">
                    <span className="form-title text-xl uppercase font-semibold"> Admin Login Form </span>
                    {/* <Button className={"cursor-pointer bg-(--text-secondary)"} onClick={goToHome}> Back Home </Button> */}
                </div>

                <form className="mt-5 flex flex-col gap-5">
                    <Field>
                        <FieldLabel className={"text-(--text-secondary)"} htmlFor={"username"}> Username </FieldLabel>
                        <Input type={"text"} id={"username"} name={"username"} className={"border-(--text-accent) text-(--text-secondary) "}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"password"} className={"text-(--text-secondary)"}>Password </FieldLabel>
                        <InputGroup className={"border-(--text-accent)"}>
                            <InputGroupInput type={show ? "text" : "password"}/>
                            <InputGroupButton onClick={toggleShowPassword} className={"cursor-pointer"}>{show ? <Eye />: <EyeClosed />} </InputGroupButton>
                        </InputGroup>
                    </Field>
                    <Field>
                        <Button className={"bg-(--text-accent) cursor-pointer hover:bg-(--text-accent-glow)"}> Login </Button>
                    </Field>
                </form>
                <p className="text-(--text-secondary) mt-5 text-center"> You forgot your password ? </p>
            </div>   
        </div>
    )
}
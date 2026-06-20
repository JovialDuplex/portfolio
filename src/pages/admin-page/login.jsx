import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Field, FieldLabel} from "@/components/ui/field";
import {Input, } from "@/components/ui/input";
import {InputGroup, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Eye, EyeClosed} from "lucide-react"
import useUser from "@/hooks/user";

export default function LoginPage (){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({email: "", password: ""});

    const changeUserData = function(event){setUserData(prev => ({...prev, [event.target.name]: event.target.value}))};
    const toggleShowPassword = ()=>{setShow(prev => !prev)};
    const {login} = useUser();
    
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
                        <FieldLabel className={"text-(--text-secondary)"} htmlFor={"email"}> email </FieldLabel>
                        <Input value={userData.email} onChange={changeUserData} type={"email"} id={"email"} name={"email"} className={"border-(--text-accent) text-(--text-secondary) "}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"password"} className={"text-(--text-secondary)"}>Password </FieldLabel>
                        <InputGroup className={"border-(--text-accent)"}>
                            <InputGroupInput value={userData.password} onChange={changeUserData} name={"password"} id={"password"} type={show ? "text" : "password"}/>
                            <InputGroupButton onClick={toggleShowPassword} className={"cursor-pointer"}>{show ? <Eye />: <EyeClosed />} </InputGroupButton>
                        </InputGroup>
                    </Field>
                    <Field>
                        <Button className={"bg-(--text-accent) cursor-pointer hover:bg-(--text-accent-glow)"} onClick={(event)=>{login(event, userData)}}> Login </Button>
                    </Field>
                </form>
                <p className="text-(--text-secondary) mt-5 text-center"> You forgot your password ? </p>
            </div>   
        </div>
    )
}
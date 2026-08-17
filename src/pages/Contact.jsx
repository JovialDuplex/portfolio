import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller} from "react-hook-form";
import { FaEnvelope, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import * as yup from "yup";
import { useState } from "react";
import {PhoneInput} from "react-international-phone";

import "react-international-phone/style.css";
import {PhoneNumberUtil} from "google-libphonenumber";
import { FieldError } from "@/components/ui/field";
import useUserStore from "@/store/userStore";

export default function ContactPage(){
    const phoneUtil = PhoneNumberUtil.getInstance();
    const {user} = useUserStore();
    console.log(user);

    const informations = [
        {Icon: FaLocationDot, label: "Douala-Cameroon quatier bobongo petit paris", type: "location"},
        {Icon: FaEnvelope, label: user?.user_email ?? "takeuhduplex2006@gmail.com", type: "mail"},
        {Icon: FaPhone, label: user?.user_contact_phone ?? "(+237) 682354056", type: "phone"},
        {Icon: FaWhatsapp, label: user?.user_whatsapp_phone ?? "(+237) 682354056", type: "whatsapp"},
    ];

    const contactFormValidation = yup.object().shape({
        client_name: yup.string().required("please fill your name here"),
        client_email: yup.string().email("This email is not valide ").required("Please fill your email here"),
        client_phone: yup.string().required("please fill your phone number").test("valid-phone", "Phone number is not valid", (value)=> {
            try{
                return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(value)) && value;
            }
            catch(error) {
                return false;
            }
       }),
        client_request: yup.string().required("please fill this field and tell me what you want !"),
    });

    const {
        handleSubmit,
        formState,
        register,
        control,

    } = useForm({mode: "onSubmit", resolver: yupResolver(contactFormValidation)});

    const submitForm = function(data){
        const message = `Hello my name is ${data.client_name}. \n that's my contact informations :\n Email -> ${data.client_email} \n Phone -> ${data.client_phone} \n and my request is : ${data.client_request}`
        const whatsappUrl = `https://wa.me/${user?.user_whatsapp_phone.replace("+", "") ?? '237682354056'}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");

    }

    return (
        <div className="contact-page text-(--text-primary) py-4 flex flex-col gap-6 justify-center items-center">
            <h1 className="capitalize text-2xl sm:text-4xl font-extrabold text-center"> Let's work together </h1>
            <div className="contact-form-container flex flex-col md:grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                <div className="side-container [background:var(--bg-page)] flex flex-col py-8 px-6 gap-6 text-base sm:text-lg rounded-2xl border-2 border-(--text-secondary)">
                    <span className="text-2xl sm:text-3xl font-semibold border-b-4 border-b-(--text-secondary) self-start pb-1">My Information</span>
                    {informations.map((value, index)=>(
                        <div key={index} className="flex gap-3 items-center break-all">
                            <value.Icon className="shrink-0 text-xl text-(--text-accent)"/> <span>{value.label}</span>
                        </div>
                    ))}                
                </div>
                <form className="form-container flex flex-col gap-5 justify-center p-2" onSubmit={handleSubmit(submitForm)}>
                    {formState.errors.client_name && <FieldError>{formState.errors.client_name.message}</FieldError>}
                    <Input {...register("client_name")} type={"text"} name={"client_name"} placeholder={"Your name"} className={"border-(--border-input) h-10"}/>
                    
                    {formState.errors.client_email && <FieldError>{formState.errors.client_email.message}</FieldError>}
                    <Input {...register("client_email")} type={"email"} name={"client_email"} placeholder={"Your email"} className={"border-(--border-input) h-10"}/>
                    
                    {formState.errors.client_phone && <FieldError>{formState.errors.client_phone.message}</FieldError>}
                    <Controller 
                        name="client_phone"
                        control={control}
                        render= {({field})=>(
                            <PhoneInput 
                                value={field.value}
                                onChange={field.onChange}
                                defaultCountry={"cm"} 
                                placeholder={"Please enter your phone number here"} 
                                inputClassName= {"w-full bg-transparent! text-(--text-primary)!"}
                                countrySelectorStyleProps={{className: "bg-red-500!"}}/>
                        )}
                    />
                    {formState.errors.client_request && <FieldError>{formState.errors.client_request.message}</FieldError>}
                    <Textarea {...register("client_request")} name={"client_request"} placeholder={"What do you want me to do for you?"} className={"h-44 border-(--border-input)"}/>
                    <Button variant="accent" type={"submit"} className="cursor-pointer font-semibold py-3"> Send Message </Button>
                </form>
            </div>
        </div>
    )
}
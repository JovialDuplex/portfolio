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

export default function ContactPage(){
    const phoneUtil = PhoneNumberUtil.getInstance();

    const informations = [
        {Icon: FaLocationDot, label: "Douala-Cameroon quatier bobongo petit paris", type: "location"},
        {Icon: FaEnvelope, label: "takeuhduplex2006@gmail.com", type: "mail"},
        {Icon: FaPhone, label: "(+237) 682 35 40 56", type: "phone"},
        {Icon: FaWhatsapp, label: "(+237) 682 35 40 56", type: "whatsapp"},
        {Icon: FaInstagram, label: "(+237) 682 35 40 56", type: "instagram"},
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
        console.log(data);
    }

    return (
        <div className="contact-page text-(--text-primary) py-2 flex flex-col gap-5 justify-center items-center">
            <h1 className="capitalize text-3xl"> Let's work together </h1>
            <div className="contact-form-container grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 gap-10 h-[80%]  w-full max-w-5xl">

                <div className="side-container overflow-y-scroll [background:var(--bg-page)] flex flex-col py-10 px-5 gap-10 text-lg rounded-2xl" style={{border: "2px solid var(--text-secondary)"}}>
                    <span className="text-4xl font-semibold border-b-4 border-b-(--text-secondary) self-center" style={{width: "max-content"}}>My Informations </span>
                    {informations.map((value, index)=>(
                        <div key={index} className="flex gap-3 items-center">
                            <value.Icon /> <span>{value.label}</span>
                        </div>
                    ))}                
                </div>
                <form className="form-container overflow-auto flex flex-col gap-6 justify-center p-2" onSubmit={handleSubmit(submitForm)}>
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
                    <Textarea {...register("client_request")} name={"client_request"} placeholder={"what do you want me to do for you"} className={"h-64 border-(--border-input)"}/>
                    <Button variant="accent" type={"submit"}> Send Message </Button>
                </form>
            </div>
        </div>
    )
}
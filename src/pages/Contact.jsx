import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaEnvelope, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function ContactPage(){
    const informations = [
        {Icon: FaLocationDot, label: "Douala-Cameroon quatier bobongo petit paris", type: "location"},
        {Icon: FaEnvelope, label: "takeuhduplex2006@gmail.com", type: "mail"},
        {Icon: FaPhone, label: "(+237) 682 35 40 56", type: "phone"},
        {Icon: FaWhatsapp, label: "(+237) 682 35 40 56", type: "whatsapp"},
        {Icon: FaInstagram, label: "(+237) 682 35 40 56", type: "instagram"},
    ];

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

                <form className="form-container overflow-auto flex flex-col gap-5 justify-center p-2">
                    <Input type={"text"} name={"client_name"} placeholder={"Your name"} className={"border-(--border-input) h-10"}/>
                    <Input type={"email"} name={"client_email"} placeholder={"Your email"} className={"border-(--border-input) h-10"}/>
                    <Textarea placeholder={"what do you want me to do for you"} className={"h-64"} name={"client_contact"}/>
                    <Button variant="accent"> Send Message </Button>
                </form>
            </div>
        </div>
    )
}
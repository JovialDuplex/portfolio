import Card from "../components/card/card";
import {
    FaGithub, 
    FaLinkedinIn, 
    FaTwitter, FaFacebookF
}from "react-icons/fa";

import {loremIpsum} from "lorem-ipsum";

import image from "../assets/image1.png";
import Hero from "@/components/hero";

export default function HomePage(){
    
    const services = [
        {
        service_name: "Web Development",
        desc_service: loremIpsum(),
        skill_list: ["html", "css", "javascript", "php"]
        }, 

        {
            service_name: "Graphic Designer",
            desc_service: loremIpsum(),
            skill_list: ["Photoshop", "illustrator", "adobe xd"]
            
        },
        {
            service_name: "Design UI/UX",
            desc_service: loremIpsum(),
            skill_list: ["figma", "lunacy", "photoshop", "php"]
        },
        {
            service_name: "Design UI/UX",
            desc_service: loremIpsum(),
            skill_list: ["figma", "lunacy", "photoshop", "php"]
        }
    ];

    return (
        <div className="home-page"> 
            <Hero />
        </div>
    )
}
// <section className="services-section flex flex-col gap-3 h-5/12">
//     <h1 className="text-xl font-bold text-center underline">Mes services </h1>
    
//     {/* <div className="flex-1 grid grid-rows-2 grid-cols-4 gap-5 px-3">
//         <Card service_name={"Developpement web"} desc_service={`
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quam earum, iusto eveniet impedit quas ipsa alias, molestias aperiam vero ex dolorem ullam doloremque sed. Deleniti commodi praesentium itaque neque.
//             `} skill_list={['html', "css", 'javascript']}/>
//         <Card />
//         <Card />
//         <Card />
//     </div>*/}
//     <ul className="list-services flex-1 grid grid-cols-4 gap-4 px-4">
//         {services.map((value, index)=>(
//             <li key={index}> 
//                 <Card service_name={value.service_name} desc_service={value.desc_service} skill_list={value.skill_list}/>
//             </li>
//         ))}
//     </ul>
// </section> 

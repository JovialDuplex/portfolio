import Card from "../components/card/card";
import {
    FaGithub, 
    FaLinkedinIn, 
    FaTwitter, FaFacebookF
}from "react-icons/fa";

import {loremIpsum} from "lorem-ipsum";

import image from "../assets/image1.png";

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
        <div className="home-page w-full h-full">
            <section className="hero-section h-7/12 px-7 py-4 grid grid-cols-2">
                <div className="first-block flex  flex-col gap-4 px-10">
                    <span className={"text-[var(--main-color)] text-lg "}> Bonjour, je suis </span>
                    <span className={"text-5xl font-bold uppercase"}> Soh Takeuh </span>
                    <span className="text-3xl font-bold text-[var(--main-color)] uppercase"> Developpeur Web fullstack</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat earum dolores repudiandae aliquam, cum iure! Distinctio a libero debitis eius reprehenderit! Beatae placeat ut saepe exercitationem, corrupti dolore perspiciatis illum!
                    </p>

                    <div className="flex gap-4">
                        <button className="btn font-bold text-md rounded-4xl btn-primary"> Voir mes projets </button>
                        <button className="btn rounded-4xl btn-outline btn-ghost"> Me contacter </button>
                    </div>
                    <div className="link flex gap-3">
                        <a className="btn btn-circle btn-outline text-xl" href="#"> <FaFacebookF/></a>
                        <a className="btn btn-circle btn-outline text-xl" href="#"> <FaGithub/></a>
                        <a className="btn btn-circle btn-outline text-xl" href="#"> <FaTwitter/></a>
                        <a className="btn btn-circle btn-outline text-xl" href="#"> <FaLinkedinIn/></a>
                    
                    </div>
                </div>

                <div className="second-block overflow-hidden">
                    <div className="h-90 w-90">
                        <img src={image} alt={"profile-picture"} className="h-auto w-90"/>
                    </div>
                </div>
            </section>
            
            <section className="services-section flex flex-col gap-3 h-5/12">
                <h1 className="text-xl font-bold text-center underline">Mes services </h1>
                
                {/* <div className="flex-1 grid grid-rows-2 grid-cols-4 gap-5 px-3">
                    <Card service_name={"Developpement web"} desc_service={`
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quam earum, iusto eveniet impedit quas ipsa alias, molestias aperiam vero ex dolorem ullam doloremque sed. Deleniti commodi praesentium itaque neque.
                        `} skill_list={['html', "css", 'javascript']}/>
                    <Card />
                    <Card />
                    <Card />
                </div>*/}
                <ul className="list-services flex-1 grid grid-cols-4 gap-4 px-4">
                    {services.map((value, index)=>(
                        <li key={index}> 
                            <Card service_name={value.service_name} desc_service={value.desc_service} skill_list={value.skill_list}/>
                        </li>
                    ))}
                </ul>
            </section> 
        </div>
    )
}
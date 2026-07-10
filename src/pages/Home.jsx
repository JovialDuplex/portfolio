import {
    FaCode, 
    FaTachometerAlt, 
    FaServer, 
    FaPencilRuler,
}from "react-icons/fa";

import Hero from "@/components/hero";
import { loremIpsum } from "lorem-ipsum";
import useUserStore from "@/store/userStore";

export default function HomePage(){
    
const services = [
  {
    icon: <FaCode size={28} />,
    title: "Développement Web",
    description:
      "Je conçois et développe des applications web modernes, performantes et évolutives avec des technologies de pointe.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: <FaTachometerAlt size={28} />,
    title: "Performance & SEO",
    description:
      "Optimisation des performances et du référencement pour que vos applications soient rapides et visibles.",
    tags: ["SEO", "Lighthouse", "Speed"],
  },
  {
    icon: <FaServer size={28} />,
    title: "Applications sur mesure",
    description:
      "Développement d'applications fullstack adaptées à vos besoins métiers spécifiques.",
    tags: ["API", "DB", "Fullstack"],
  },
  {
    icon: <FaPencilRuler size={28} />,
    title: "UI/UX Design",
    description:
      "Conception d'interfaces utilisateur intuitives et esthétiques pour une expérience optimale.",
    tags: ["Figma", "UI/UX", "Prototyping"],
  },
];

    const {user} = useUserStore();
    console.log(user);

    return (
        <div className="home-page"> 
            {/* --------section hero----------- */}
            <Hero 
                name={user.user_name} 
                secondName={user.user_second_name} 
                profilePicture={import.meta.env.VITE_URL_BACKEND + user.user_picture} 
                description={user.user_desc}/>

            {/*------- section service ------- */}
            <section className="my-0 mx-auto pt-12 pb-8 px-20">
                <div className="mb-12 text-center">
                    <p className="font-semibold text-(--text-accent) text-[0.85rem] uppercase mb-2">
                        That I do 
                    </p>
                    <h2 className={"font-extrabold text-(--text-primary) "} style={{fontSize: "clamp(1.6rem, 4vw, 2.2rem)"}}>
                        My services 
                    </h2>
                </div>

                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr)", gap: "1.5rem"}}>
                    {services.map((service, index)=> (
                        <div key={index} className="bg-(--bg-card) rounded-[16px] p-8 border border-(--border-card) cursor-default hover:-translate-1.25 hover:border-[rgba(59, 130, 246, 0.5)]" style={{transition: "transform 0.25s, border-color 0.25s"}}>
                            {/* icon */}
                            <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-(--text-accent) mb-5 border border-(--text-accent)">
                                {service.icon}
                            </div>

                            <h3 className="font-bold text-[1.1rem] mb-3 text-(--text-primary)">
                                {service.title}
                            </h3>

                            <p className="text-(--text-secondary) text-[0.95rem] leading-tight mb-5"> 
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag, index)=> (
                                    <span
                                        key={index}
                                        className="bg-(--bg-tags) text-(--text-tags) py-1 px-3 rounded-[20px] text-[0.78rem] font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
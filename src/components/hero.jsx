import { loremIpsum } from "lorem-ipsum"
import { Link } from "react-router-dom";
import {
    FaLinkedin, 
    FaTwitter, 
    FaGithub,
    FaEnvelope,
    FaFacebookF
} from "react-icons/fa";

const heroData = {
    name : "soh takeuh",
    secondName: "jovial duplex",
    job: "developpeur fullstack",
    description : loremIpsum({count: 3}),
    socialNetworks : [
        {Icon: FaLinkedin, href: "#", label: "linkedin"},
        {Icon: FaTwitter, href: "#", label: "Twitter"},
        {Icon: FaFacebookF, href: "#", label: "Facebook"},
        {Icon: FaGithub, href: "#", label: "GitHub"},
        {Icon: FaEnvelope, href: "#", label: "Email"},
    ]
}

export default function Hero(){
    return (
        <section className="max-w-6xl my-0 mx-auto pt-20 pb-16 px-8 grid grid-cols-2 items-center gap-12 relative">

            {/* la goutte brillante */}
            {/* <div className="absolute top-[10%] right-[5%] w-100 h-[400] bg-radial "/> */}
            {/* <div className="absolute bottom-0 left-[5%] w-62.5 h-62.5"></div> */}
        
            {/* texte de gauche */}
            <div className="relative z-2">
                <p className="text-lg text-(--text-secondary) mb-2">
                    Bonjour, je suis 
                </p>
                <h1 className="font-bold leading-tight text-(--text-primary) uppercase" style={{fontSize: "clamp(2rem, 5vw, 3.2rem)"}}>
                    {heroData.name}<br />
                    <span className="bg-linear-135 from-(--text-accent-light)  to-[#1d4ed8]" style={{WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}> 
                        {heroData.secondName} 
                    </span> <br/>
                    <span className="font-semibold text-(--text-primary)" style={{fontSize : "clamp(1.4rem, 3vw, 2rem)"}}> {heroData.job} </span>  
                </h1>

                <p className="mb-8 text-[0.97rem] leading-[1.7] max-w-105 text-(--text-secondary)"> {heroData.description} </p>
            
                {/* bouton cta  */}
                <div className="flex gap-4 mb-8 flex-wrap">
                    <Link to={"/projects"} 
                        className="py-3 px-6 rounded-[8px] font-bold hover:-translate-y-px"
                        style={{
                            fontSize: "0.95rem",
                            background: "var(--text-accent)",
                            boxShadow: "0 6px 20px var(--text-accent-glow)",
                            transition: "transform 0.2s, box-shadow 0.2s"
                        }}>
                            Voir mes Projets
                    </Link>

                    <Link to={"/contact"} 
                        className={"bg-transparent decoration-none rounded-[8px] text-(--text-primary) text-[0.95rem] border-2 border-(--border-cta) px-6 py-2.75 transition-all duration-200 hover:bg-(--bg-cta-hover) hover:text-(--text-cta-hover) font-semibold "}> 
                        
                        Me Contacter
                    </Link>
                </div>

                {/* reseaux sociaux */}
                <div className="flex gap-[1.1rem]">
                        {heroData.socialNetworks.map((value, index)=>(
                            <Link 
                                key={index} 
                                to={value.href} 
                                title={value.label}
                                className="text-(--text-secondary) text-[1.35rem] flex transition-transform duration-200 hover:-translate-y-0.5  hover:text-(--text-accent)"
                            > 
                                <value.Icon/> 
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    )
}
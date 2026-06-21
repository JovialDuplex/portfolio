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
    job: "fullstack developer",
    description : loremIpsum({count: 3}),
    socialNetworks : [
        {Icon: FaLinkedin, href: "#", label: "linkedin"},
        {Icon: FaTwitter, href: "#", label: "Twitter"},
        {Icon: FaFacebookF, href: "#", label: "Facebook"},
        {Icon: FaGithub, href: "#", label: "GitHub"},
        {Icon: FaEnvelope, href: "#", label: "Email"},
    ],
    profilePicture : "/image1.png"
}

export default function Hero({name, secondName, job, description, profilePicture}){
    return (
        <section className="max-w-6xl my-0 mx-auto pt-20 pb-16 px-8 grid lg:grid-cols-2 sm:grid-cols-1 items-center gap-12">

            {/* la goutte brillante */}
            {/* <div className="absolute top-[10%] right-[5%] w-100 h-[400] bg-radial "/> */}
            {/* <div className="absolute bottom-0 left-[5%] w-62.5 h-62.5"></div> */}
        
            {/* block de gauche */}
            <div className="relative">
                <p className="text-lg text-(--text-secondary) mb-2">
                    Hello, I am 
                </p>
                <h1 className="font-bold leading-tight text-(--text-primary) uppercase" style={{fontSize: "clamp(2rem, 5vw, 3.2rem)"}}>
                    {name}<br />

                    <span className="bg-linear-135 from-(--text-accent-light)  to-[#1d4ed8]" style={{WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}> 
                        {secondName} 
                    </span> <br/>
                    <span className="font-semibold text-(--text-primary)" style={{fontSize : "clamp(1.4rem, 3vw, 2rem)"}}> {job} </span>  
                </h1>

                <p className="mb-8 text-[0.97rem] leading-[1.7] max-w-105 text-(--text-secondary)"> {description} </p>
            
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
                            My Projects
                    </Link>

                    <Link to={"/contact"} 
                        className={"bg-transparent decoration-none rounded-[8px] text-(--text-primary) text-[0.95rem] border-2 border-(--border-cta) px-6 py-2.75 transition-all duration-200 hover:bg-(--bg-cta-hover) hover:text-(--text-cta-hover) font-semibold "}> 
                        
                        Contact Me
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

            {/* block de droite avec la photo */}
            <div className=" w-120 h-120 border-none overflow-hidden">
                <img src={profilePicture} alt={"profile picture"} className="w-full h-auto"/>
            </div>
        </section>
    )
}
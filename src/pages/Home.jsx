import Hero from "@/components/hero";
import useUserStore from "@/store/userStore";
import ServiceCard from "@/components/service-card";
import { useEffect, useState } from "react";
import useService from "@/hooks/services";
import useProject from "@/hooks/projects";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const {getServices} = useService();
  const {projects, getAllProjects} = useProject();
  const [services, setServices] = useState([]);

  const { user } = useUserStore();
  
  const navigate = useNavigate();

  useEffect(()=>{
    const getData = async function(){
      const serviceData = await getServices();
      getAllProjects();
      setServices(serviceData);
    }
    getData();
  }, []);

  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="home-page">
      {/* --------section hero----------- */}
      <Hero
        name={user?.user_name ?? "jovial"}
        secondName={user?.user_secondName ?? ""}
        profilePicture={user?.user_picture ? `${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}` : ""}
        description={user?.user_desc ?? ""}
      />

      {/*------- section service ------- */}
      <section className="mx-auto py-6 px-4 sm:px-8 lg:px-16 border-t-2 border-t-(--border-card)">
        <div className="mb-5 text-center">
          <p className="font-semibold text-(--text-accent) text-[0.85rem] capitalize mb-2">
            That I do
          </p>
          <h2 className={"font-extrabold text-(--text-primary) "} style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
            My services
          </h2>
          <Button className={"mt-2 cursor-pointer"} variant={"accent"} onClick={()=>navigate("/services")}> See all services <ArrowRight /> </Button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index)=> (
              <ServiceCard service={service} key={index}/>
          ))}
        </div>
      </section>

      {/* -------- project section ------- */}
      <section className="mt-10 mx-auto px-4 sm:px-8 lg:px-16 py-6 border-t-2 border-t-(--border-card)">
        <div className="mb-5 text-center">
          <p className="text-(--text-accent) font-semibold capitalize mb-2 text-[0.85rem]">
            what i did before 
          </p>
          <h2 className="font-extrabold text-(--text-primary)" style={{fontSize: "clamp(1.6rem, 4vw, 2.2rem)"}}> My Projects </h2>
          <Button className="mt-2 cursor-pointer" variant={'accent'} onClick={()=>navigate("/projects")}> See all projects <ArrowRight /> </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index}
                id = {project._id}
                title={project.project_title}
                desc={project.project_desc}
                status={project.project_status}
                image= {import.meta.env.VITE_URL_BACKEND + "/" + project.project_cover_image}
                isFocus = {activeCard === index}
                onFocus = {()=> setActiveCard(activeCard === index ? null : index)}
            />
        ))}
          
        </div>
      </section>
    </div>
  )
}


import * as SimpleIcon from "@icons-pack/react-simple-icons";

const GetIcon = function({name}){
    const Icon = SimpleIcon[name];
    const iconColor = SimpleIcon[name+"Hex"];
    return <Icon color={iconColor}/>
}

const ServiceCard = function({service}){
    return (

        <div className="bg-(--bg-card) rounded-[16px] p-8 border border-(--border-card) cursor-default hover:-translate-1.25 hover:border-[rgba(59, 130, 246, 0.5)]" style={{transition: "transform 0.25s, border-color 0.25s"}}>
            {/* icon */}
            {/* <GetIcon name={"SiC"}/> */}
            <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-(--text-accent) mb-5 border border-(--text-accent)">
            {/* <si.SiC /> */}
                {service.service_icon}
            </div>

            <h3 className="font-bold text-[1.1rem] mb-3 text-(--text-primary)">
                {service.service_name}
            </h3>

            <p className="text-(--text-secondary) text-[0.95rem] leading-tight mb-5"> 
                {service.service_desc}
            </p>
            <div className="flex flex-wrap gap-2">
                {service.service_skills.map((skill, index)=> (
                    <span
                        key={index}
                        className="bg-(--bg-tags) text-(--text-tags) py-1 px-3 rounded-[20px] text-[0.78rem] font-semibold"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>

    )
};

export default ServiceCard;

import { Button } from "./ui/button";
import { Icon } from "./ui/icon-picker";

const ServiceCard = function ({ service, isFocus, onFocus }) {

    return (

        <div onClick={onFocus} className="bg-(--bg-card) mx-5 sm:mx-0 max-h-70 rounded-[16px] p-8 border border-(--border-card) cursor-pointer">
            <div className="w-10 h-10 rounded-[14px] flex items-center justify-center text-(--text-accent) mb-5 border border-(--text-accent)">
                {/* <si.SiC /> */}
                <Icon name={service.service_category.category_icon} />
                {/* {service.service_category.category_name} */}
            </div>

            <h3 className="font-bold text-[1.1rem] mb-3 text-(--text-primary)">
                {service.service_name}
            </h3>

            <p className="text-(--text-secondary) text-[0.95rem] leading-tight mb-5">
                {service.service_desc}
            </p>
            <div className="flex flex-wrap gap-2">
                {service.service_skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-(--bg-tags) text-(--text-tags) py-1 px-3 rounded-[20px] text-[0.78rem] font-semibold"
                    >
                        {skill.skill_name}
                    </span>
                ))}
            </div>
            {isFocus && <Button className={"w-full mt-6"} variant="accent"> Request this service </Button>}
        </div>

    )
};

export default ServiceCard;
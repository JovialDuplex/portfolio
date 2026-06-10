import {FaCode} from "react-icons/fa";

export default function Card({service_name, desc_service, skill_list}) {
    return (
        <div className="card border flex p-5 h-full border-gray-500 gap-3">
            <div className="card-header flex flex-row gap-3">
                <span className="avatar p-2 rounded-4xl  bg-blue-100 logo text-primary text-2xl"><FaCode/></span>
                <div className="card-title capitalize"> {service_name} </div>
            </div>

            <div className="card-bod flex-1">
                {desc_service}
            </div>
            
            <div className="card-footer">
                <ul className="grid grid-cols-3 gap-3">
                    {
                        skill_list && skill_list.map((value, index)=>(
                            <li key={index} className="w-full badge badge-lg rounded-4xl font-bold badge-primary"> {value} </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
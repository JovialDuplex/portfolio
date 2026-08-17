import useUserStore from "@/store/userStore";
import useSkills from "@/hooks/skills";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

export default function InfosPage() {
    const { user } = useUserStore();
    const { getSkills } = useSkills();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getSkills().then((data) => setSkills(data || [])).catch(() => {});
    }, []);

    return (
        <div className="infos-page text-(--text-primary) py-4 flex flex-col items-center gap-8 max-w-4xl mx-auto">
            <header className="flex flex-col sm:flex-row items-center gap-6 w-full p-6 bg-(--bg-card) border border-(--border-card) rounded-2xl shadow-sm">
                <img
                    src={user?.user_picture ? `${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}` : "/logo.png"}
                    alt="profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-(--text-accent) shadow-md"
                />
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
                        {user?.user_name ?? "Portfolio Owner"} {user?.user_secondName ?? ""}
                    </h1>
                    <p className="text-(--text-accent) font-semibold text-lg flex items-center gap-2">
                        <Briefcase size={20} /> {user?.user_job_name ?? "Fullstack Developer"}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-(--text-secondary) justify-center sm:justify-start">
                        {user?.user_email && (
                            <span className="flex items-center gap-1.5"><Mail size={16} /> {user.user_email}</span>
                        )}
                        {user?.user_contact_phone && (
                            <span className="flex items-center gap-1.5"><Phone size={16} /> {user.user_contact_phone}</span>
                        )}
                    </div>
                </div>
            </header>

            <section className="w-full p-6 bg-(--bg-card) border border-(--border-card) rounded-2xl flex flex-col gap-4">
                <h2 className="text-xl font-bold border-b border-(--border-card) pb-2">About Me</h2>
                <p className="text-(--text-secondary) leading-relaxed text-base">
                    {user?.user_desc || "Welcome to my portfolio! I am a passionate developer committed to building sleek, modern, and performant web applications."}
                </p>
            </section>

            <section className="w-full p-6 bg-(--bg-card) border border-(--border-card) rounded-2xl flex flex-col gap-4">
                <h2 className="text-xl font-bold border-b border-(--border-card) pb-2">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-3">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <Badge key={index} className="bg-(--bg-tags) text-(--text-tags) py-1.5 px-3.5 rounded-full text-sm font-semibold">
                                {skill.skill_name || skill}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-(--text-secondary)">No skills specified yet.</span>
                    )}
                </div>
            </section>
        </div>
    );
} 
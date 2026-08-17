import { create } from "zustand";
import { persist } from "zustand/middleware";

const TYPE_ICON_MAP = {
    project: "FolderOpen",
    service: "Package",
    category: "Tag",
    skill: "GraduationCap",
    user: "User",
};

const useActivitiesStore = create(persist((set) => ({
    activityList: [],
    makeActivity: (icon, label, date, type) => set((state) => {
        const defaultIcon = TYPE_ICON_MAP[type] || "Activity";
        const selectedIcon = icon || defaultIcon;
        return {
            activityList: [{ icon: selectedIcon, label, date, type }, ...state.activityList]
        };
    })
}), {
    name: "activityStorage"
}));

export default useActivitiesStore;
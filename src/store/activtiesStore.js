import { create } from "zustand";
import { persist } from "zustand/middleware";

const useActivitiesStore = create(persist(set=>({
    activityList: [],
    makeActivity : (icon, label, date, type)=>set(state=>({
        activityList: [...state.activityList, {icon, label, date, type}]
    }))
}), {
    name: "activityStorage"
}));

export default useActivitiesStore;
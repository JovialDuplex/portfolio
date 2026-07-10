import {create} from "zustand";

const useProjectStore = create((set)=>({
    actionProject: 0,
    addActionProject: ()=>set((state)=>({actionProject : state.actionProject + 1}))
}));

export default useProjectStore;
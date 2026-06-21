import {persist} from "zustand/middleware"
import { create } from "zustand";

const useUserStore = create(
    persist((set)=>({
            user: null,
            token: null,
            loginUser: (user, token) => set({user: user, token: token}),
            logoutUser: ()=> set({user: null, token: null}),

        }), {
            name: "user-storage",
        }
    )
);

export default useUserStore;
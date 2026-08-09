import {persist} from "zustand/middleware"
import { create } from "zustand";

const useUserStore = create(
    persist((set)=>({
            user: null,
            token: null,
            tokenExpiration: null, // Timestamp (ms) d'expiration du token JWT
            loginUser: (user, token, tokenExpiration) => set({user, token, tokenExpiration}),
            logoutUser: ()=> set({user: null, token: null, tokenExpiration: null}),
            updateUser: (user)=> set({user}),

        }), {
            name: "user-storage",
        }
    )
);

export default useUserStore;

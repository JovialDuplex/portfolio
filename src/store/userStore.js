import {persist} from "zustand/middleware"
import { create } from "zustand";
import axios from "axios";

const useUserStore = create(
    persist((set)=>({
            user: null,
            token: null,
            tokenExpiration: null, // Timestamp (ms) JWT expiration
            loginUser: (user, token, tokenExpiration) => set({user, token, tokenExpiration}),
            logoutUser: ()=> set({user: null, token: null, tokenExpiration: null}),
            updateUser: (user)=> set({user}),

            // Public user info fetched through the /get-infos route (no auth required)
            fetchPublicInfos: async ()=> {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/get-infos`);
                    const data = response.data;
                    const publicUser = data?.user || data?.users?.[0] || null;
                    if (publicUser) {
                        set({user: publicUser});
                    }
                    return publicUser;
                } catch (error) {
                    console.error("Failed to fetch public user info:", error);
                    return null;
                }
            },
        }), {
            name: "user-storage",
        }
    )
);

export default useUserStore;

import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "@/store/userStore";
import { getTokenExpiration } from "@/utils/tokenUtils";

const useUser = function(){
    const navigate = useNavigate();
    const {loginUser, logoutUser, token} = useUserStore();

    const login = async(data)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/myself/login`, data);
            const mydata = await response.data;
            if(!mydata.user && !mydata.token) {
                return mydata.message;
            }

            // Décoder le token pour extraire la date d'expiration
            const tokenExpiration = getTokenExpiration(mydata.token);

            loginUser(mydata.user, mydata.token, tokenExpiration);

            console.log("Connexion admin réussie. Token expire le :", new Date(tokenExpiration).toLocaleString());
            navigate("/admin/dashboard/home");

        } catch(error) {
            console.log(error.message);
            throw error;
        }
    };

    const getInfos = async function() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/admin/myself/get-infos`, {
                headers: { token: token }
            });
            const data = response.data;
            if (data?.user) {
                useUserStore.getState().updateUser(data.user);
            }
            return data?.user;
        } catch (error) {
            console.log("Erreur lors de la récupération des infos utilisateur :", error);
            throw error;
        }
    };

    const updateUser = async function(formData) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/admin/myself/update`, formData, {
                headers: {
                    token: token,
                    "Content-Type": "multipart/form-data"
                }
            });
            const data = response.data;
            if (data?.user) {
                useUserStore.getState().updateUser(data.user);
            }
            return data;
        } catch (error) {
            console.log("Erreur lors de la mise à jour de l'utilisateur :", error);
            throw error;
        }
    };

    const verifyPassword = async function(password) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/myself/verify-password`, { password }, {
                headers: { token: token }
            });
            return response.data;
        } catch (error) {
            console.log("Erreur lors de la vérification du mot de passe :", error);
            throw error;
        }
    };

    const logout = async function() {
        logoutUser();
        navigate("/admin/login");
    };

    return {
        login, 
        logout,
        getInfos,
        updateUser,
        verifyPassword
    }
};

export default useUser;
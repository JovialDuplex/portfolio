import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "@/store/userStore";
import { getTokenExpiration } from "@/utils/tokenUtils";

const useUser =  function(){
    const navigate = useNavigate();
    const {loginUser, logoutUser} = useUserStore();

    const login = async(data)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_URL_ADMIN_BACKEND}/admin/myself/login`, data);
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

    const logout = async function() {
        logoutUser();
        navigate("/admin/login");
    }

    return {
        login, 
        logout,
    }
};

export default useUser;
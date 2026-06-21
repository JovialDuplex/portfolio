import { useNavigate } from "react-router-dom";
import { loremIpsum } from "lorem-ipsum";
import axios from "axios";
import useUserStore from "@/store/userStore";

const useUser =  function(){
    const navigate = useNavigate();
    const {user, loginUser, logoutUser} = useUserStore();

    const login = async(event, userData)=>{
        event.preventDefault();
        try{
            const response = await axios.post(`${import.meta.env.VITE_URL_ADMIN_BACKEND}/login`, userData);
            const data = await response.data;
            if(!data.user && !data.token) {
                return data.message;
                console.log("erreur lors de la connexion ");
            }
            loginUser(data.user, data.token);

            console.log("connexion de l'admin reussit avec success ")
            navigate("/dashboard/home");

        } catch(error) {
            console.log(error.message);
        }
    };

    const logout = async function() {
        navigate("/");
    }

    return {
        login, 
    }
};

export default useUser;
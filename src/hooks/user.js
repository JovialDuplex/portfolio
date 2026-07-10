import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "@/store/userStore";

const useUser =  function(){
    const navigate = useNavigate();
    const {loginUser, logoutUser} = useUserStore();

    const login = async(data)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_URL_ADMIN_BACKEND}/admin/myself/login`, data);
            const mydata = await response.data;
            if(!mydata.user && !mydata.token) {
                return mydata.message;
                console.log("erreur lors de la connexion ");
            }
            loginUser(mydata.user, mydata.token);

            console.log("connexion de l'admin reussit avec success ");
            console.log(mydata);
            navigate("/admin/dashboard/home");

        } catch(error) {
            console.log(error.message);
            throw error;

        }
    };

    const logout = async function() {
        navigate("/admin/login");
        logoutUser();
    }

    return {
        login, 
        logout,
    }
};

export default useUser;
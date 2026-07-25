import axios from "axios";
import { useState } from "react";

/* Hook qui permet de faire la gestion des services (Create, Read, Updata, Delete) */
const useService = function(){

    // Lecture de tous les services 
    const getServices = async function(){
        try{
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/services/`);
            const data = await response.data;;
            console.log(data);
            return data.services;
            
        } catch(error) {
            console.log(error.message);
            throw error;
        }
    };

    // Lecture d'un service particulier 
    const getService = function() {

    };

    return {
        getService,
        getServices,
    };
};

export default useService;
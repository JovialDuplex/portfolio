import axios from "axios";
import { useState } from "react";
import useUserStore from "@/store/userStore";

/* Hook qui permet de faire la gestion des services (Create, Read, Updata, Delete) */
const useService = function () {
    const { token } = useUserStore();

    // Lecture de tous les services 
    const getServices = async function () {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/services/`);
            const data = await response.data;;
            console.log(data);
            return data.services;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    // Lecture d'un service particulier 
    const getService = async function (service_id) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/services?id=${service_id}`);
            const data = await response.data;
            console.log(data);
            return data.service;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const createService = async function (data) {
        try {
            await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/services/create`, data, { headers: { token: token } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateService = async function (id, data) {
        try {
            await axios.put(`${import.meta.env.VITE_URL_BACKEND}/admin/services/update?id=${id}`, data, { headers: { token: token } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const deleteService = async function (id) {
        try {
            await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/admin/services/delete?id=${id}`, { headers: { token: token } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return {
        getService,
        getServices,
        createService,
        updateService,
        deleteService,
    };
};

export default useService;
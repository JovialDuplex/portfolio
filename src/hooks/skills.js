import axios from "axios";
import useUserStore from "@/store/userStore";

const useSkills = function () {
    const { token } = useUserStore();

    const getSkills = async function () {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/admin/skills`, { headers: { token: token } });
            const data = await response.data;
            return data.skills;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const createSkill = async function (data) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/skills/create`, data, { headers: { token: token } });
            return response.data?.skill;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateSkill = async function (id, data) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/admin/skills/update?id=${id}`, data, { headers: { token: token } });
            return response.data?.skill;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const deleteSkill = async function (id) {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/admin/skills/delete?id=${id}`, { headers: { token: token } });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getSkills, createSkill, updateSkill, deleteSkill };
};

export default useSkills;
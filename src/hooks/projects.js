import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";


const useProject =  function(){
    const navigate = useNavigate();
    const {token} = useUserStore();

    const [project, setProject] = useState({});
    const [projects, setProjects] = useState([]);

    const getAllProjects = async function(){
        try{
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/projects`);
            const data = await response.data;
            setProjects(data.projects);
        } catch(error) {
            navigate("/error");
        }
    };

    const getProject = async function(id_project) {
        try{
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/projects?id=${id_project}`);
            const data = await response.data;
            setProject(data.project);

        } catch(error) {
            navigate("/error");
        }
    };

    const deleteProject = async function(id_project){
        try{
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/admin/projects/delete?id=${id_project}`, {
                headers: {token: token},
            });
            const data = await response.data;
            console.log(data);
            
        } catch(error) {
            console.log(error);
        }
    };

    const updateProject = async function(id_project, project_data) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/admin/projects/update?id=${id_project}`, project_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: token,
                }
            });
            const data = await response.data;
            console.log(data);

        } catch(error) {

        }
    };

    const createProject = async function(project_data) {
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/projects/add`, project_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: token
                }
            });

            const data = await response.data;
            console.log(data);

        } catch(error) {
            console.log(error);
        }
    };

    return {
        project,
        projects,
        createProject,
        getProject,
        getAllProjects,
        deleteProject,
        updateProject
    }
};

export default useProject;
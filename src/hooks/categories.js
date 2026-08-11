import useUserStore from "@/store/userStore";
import axios from "axios";

const useCategories = function() {
    const {token} = useUserStore();
    // lecture de toutes les categories 
    const getCategories = async function(){
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/category`);
            const data = await response.data;
            console.log(data);
            return data.categories;

        } catch(error) {
            console.log(error.message);
            throw error;
        }
    };

    const deleteCategory = async function(id){
        try{
            await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/admin/category/delete?id=${id}`, {
                headers: {token: token}
            });
        } catch(error) {
            console.log(error.message);
            throw error;
        }
    };

    const updateCategory = async function(id, categoryData){
        try {
            await axios.put(`${import.meta.env.VITE_URL_BACKEND}/admin/category/update?id=${id}`, categoryData, {
                headers: {token: token}
            });

        } catch(error) {
            console.log(error.message);
            throw error;
        }
    };

    const createCategory = async function(categoryData){
        try {
            await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/category/create`, categoryData, {
                headers: {token: token}
            });

        } catch(error) {
            console.log(error.message);
            throw error;
        }
    }
    return {
        getCategories,
        deleteCategory,
        updateCategory,
        createCategory,
    }
};

export default useCategories;
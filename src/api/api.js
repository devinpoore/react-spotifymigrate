import axios from "axios";

const api = {
    getMigrationData: (token) => {
        const uri = process.env.GET_MIGRATION_DATA_URI || "http://localhost:3500/migration-data/get/";
        return axios.get(uri + token);
    },
    getNewUserData: (token) => {
        const uri = process.env.GET_NEW_USER_DATA_URI || "http://localhost:3500/new-user-data/get/";
        return axios.get(uri + token);
    },
    migrate: (token, newUserID, userData) => {
        const uri = process.env.PUT_MIGRATION_DATA_URI || "http://localhost:3500/migration-data/put/";
        return axios.put(uri + token + "/" + newUserID, userData);
    }
};

export default api;
import axios from "axios";

const api = {
    authorize: () => {
        return axios.get("http://localhost:3500/login");
    },
    getRecentlyPlayed: (token) => {
        return axios.get("http://localhost:3500/recently-played/" + token);
    },
    getMigrationData: (token) => {
        return axios.get("http://localhost:3500/migration-data/" + token);
    }
};

export default api;
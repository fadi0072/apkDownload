import axios from "axios";
export const instance = axios.create({
    baseURL: "http://apks.bouztv.site/va/api/",
});

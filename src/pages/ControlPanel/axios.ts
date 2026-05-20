
// instancia de axios 
import axios from "axios";
import { getAccessToken, setAccessToken } from "./authStore";
export const api = axios.create({
    baseURL: "/api",
    withCredentials: true // 🔥 para cookies
});


api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})




let isRefreshing = false;
let failedQueue: any[] = [];
const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            //  evitar loops infinitos
            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const res = await api.post("/auth/refresh");
                const newAccessToken = res.data.accessToken;
                setAccessToken(newAccessToken);
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }

);



export const refreshOnLoad = async () => {
    try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.accessToken);
    } catch {
        console.log("No session");
    }

};
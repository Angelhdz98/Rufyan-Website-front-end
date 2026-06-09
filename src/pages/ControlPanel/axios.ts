
// instancia de axios 
import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./authStore";
import { TokenResponse } from "../../types/typesIndex";



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
/*
api.interceptors.response.use((res) => res,
    async (error) => {
        const originalRequest = error.config;
        if ((error.response?.status !== 201 || error.response?.status !== 201) && !originalRequest._retry) {
            try {
                await api.post("/auth/refresh", {}, { withCredentials: true }).then((httpResponse) => {
                    const response = httpResponse.data as TokenResponse;
                    localStorage.setItem(getTokenKey(), response.access_token);
                }).catch((e) => {
                    const navigate = useNavigate();
                    console.log("Hubo un problema " + e);
                    navigate(-1);

                })
            } catch (e) {
                console.error("Error during token refresh:", e);
            }
        }
        return Promise.reject(error);
    }
)
*/





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
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/refresh")

        ) {
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
                const res = await api.post("/auth/refresh", {}, {
                    withCredentials: true
                });
                const respondedToken = res.data as TokenResponse;
                const newAccessToken = respondedToken.access_token;
                setAccessToken(newAccessToken);
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                clearAccessToken();
                processQueue(err, null);
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        // Manejar otros errores de autenticación (500, 403, etc)
        if (error.response?.status === 403 || error.response?.status == 401) {
            clearAccessToken();
            window.location.href = "/login";
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }

);



export const refreshOnLoad = async () => {
    try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.access_token);
    } catch {
        console.log("No session");
    }

};
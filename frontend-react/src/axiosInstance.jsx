import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})


// Request Interceptor
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('access_token')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    // Handle failed responses
    async function(error){
        const originalRequest = error.config;
        
        // Prevent infinite loops if the refresh token request itself fails
        if(error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/token/refresh/')){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token')
            
            if (!refreshToken) {
                return Promise.reject(error);
            }
            
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                console.log('Token refreshed successfully', response.data.access)
                localStorage.setItem('access_token', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(refreshError){
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                // Optional: redirect to login page here if desired
                window.location.href = '/login'
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;
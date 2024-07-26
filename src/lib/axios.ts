import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Backend URL
});

// Request Interceptor (istek gönderilmeden önce yapılacak işlemler)
// apiClient.interceptors.request.use(
//     (config) => {
//       // Örneğin, isteklerde her zaman bir Authorization header ekleyebilirsiniz.
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export default apiClient;



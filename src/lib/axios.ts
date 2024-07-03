import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend URL
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



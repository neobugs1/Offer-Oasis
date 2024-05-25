import axios from "axios";

const getCsrfToken = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}sanctum/csrf-cookie`, { withCredentials: true });
    return response.data.csrf_token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;

  const csrfToken = await getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }
);

export default axiosClient;

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setErrorMessage } from "../Redux/Slice/PopUpMessageSlice";
import { Navigate } from "react-router-dom";

let baseURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

function isTokenExpired(token) {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
}

export async function authorizedFetch(endpoint, method = "GET", data = null,dispatch) {
    try {
        
        let token = localStorage.getItem("token");

        if (!token) {
            dispatch(setErrorMessage("Please log in again"));
            return;
        }

        if (isTokenExpired(token)) {
            console.warn("Token has expired. Please log in again");
            localStorage.removeItem("token");
            Navigate("/");
        }

        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const config = {
            method,
            url: endpoint
        }

        if (data) {
            config.data = data;
        }

        const response = await apiClient(config);

        return response;
    } catch (error) {
        if (error.response && (error.response.statusCode == 401 || error.response.statusCode == 403)) {
            console.warn("Unauthorized Request. Logging out...")
            localStorage.removeItem("token");
            Navigate("/");
            return;
        }
        console.log("Error fetching data: ", error);
        throw error;
    }
}

import axios from "axios";
import { useContext, useState, createContext } from "react";

// create context
const AuthContext = createContext();
// this function use different components  to call easyly
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({
        username: localStorage.getItem("username") || "",
        token: localStorage.getItem("token") || "",
        id: localStorage.getItem("id") || "",
    });
    // signup function
    async function register(username, password) {
        //Request body is username:username, password:password
        //Use axios to send request
        let result = await axios.post(process.env.REACT_APP_BASE_URL +"api/v1/auth", {
            username: username,
            password: password,
        })
        return result;
    }
    async function login(username, password) {
        //Request body is username:username, password:password
        //Use axios to send request
        let result = await axios.post(process.env.REACT_APP_BASE_URL+ "api/v1/auth/login", {
            username: username,
            password: password
        })
        if (result.status === 200) {
            setCurrentUser(result.data.data);
            localStorage.setItem("username", result.data.data.username);
            localStorage.setItem("token", result.data.data.token);
            localStorage.setItem("id", result.data.data.id);
        }
        return result;
    }
    async function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
    }
    // get user knowledge from firebase

    const value = {
        currentUser,
        register,
        login,
        logout,
        //   loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
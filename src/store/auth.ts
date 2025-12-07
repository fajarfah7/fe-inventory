import { useState } from "react";

export function useAuth() {
    const [loading, setLoading] = useState<boolean>(false);

    const token: string | null = localStorage.getItem("token");
    const isLoggedIn: boolean = !!token;
    const login = (email: string, password: string): boolean => {
        try {
            setLoading(true);
            if (email !== "admin" && password != "password") {
                return false;
            }
            localStorage.setItem("token", "dummy-token");
            return true;

        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };
    const logout = () => localStorage.removeItem("token");

    return {
        loading,
        token,
        isLoggedIn,
        login,
        logout,
    }
}
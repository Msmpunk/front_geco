import React, { createContext, useContext, useState, useEffect } from 'react';
// Create a Context for the auth state
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to simulate login
    const login = async (token) => {

        // Save token to local storage for this example
        localStorage.setItem('custom-auth-token', token);
        setIsAuthenticated(true);
    };

    // Function to simulate logout
    const logout = () => {
        localStorage.removeItem('custom-auth-token');
        setIsAuthenticated(false);
    };

    // Check for token in local storage on mount
    useEffect(() => {
        const token = localStorage.getItem('custom-auth-token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

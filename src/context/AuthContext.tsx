import { createContext, ReactNode, useState, useEffect } from "react";

type Props = {
    children?: ReactNode;
};

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
};

const initialValue = {
    authenticated: false,
    setAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(() => {
        
        const token = localStorage.getItem("token");
        return !!token;
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
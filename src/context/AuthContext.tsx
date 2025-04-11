import { createContext, ReactNode, useState, useEffect } from "react";

type Props = {
    children?: ReactNode;
};

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
};

// initial value for AuthContext
// user is not logged in initially, so false
const initialValue = {
    authenticated: false,
    setAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {

    const [authenticated, setAuthenticated] = useState(() => {
        // fetch token from localStorage
        // check if it exists (= user is logged in)
        const token = localStorage.getItem("token");

        // if yes, return true
        return !!token;
    });

    // check if token exists during component rendering
    // if the browser refreshes, the user remains logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token:" + token);
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    return (
        // return provider that gives AuthContext values to children
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
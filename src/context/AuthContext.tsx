import { createContext, ReactNode, useState } from "react"

// AuthContext for the app to check if a user is logged in

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({children}: Props) => {
    // initializes an auth state as unauthenticated (= false value)
    const [authenticated, setAuthenticated] = useState(initialValue.authenticated);

    return (
        <AuthContext.Provider value= {{authenticated, setAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
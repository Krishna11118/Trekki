import { createContext, useEffect, useReducer } from "react";

const initial_state = {
    user: localStorage.getItem("username") !== undefined ? JSON.stringify(localStorage.getItem("username")): null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: false, 
                error: null,
            };
        case 'LOGIN_SCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            }

        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            }

        case 'REGISTER_SUCCESS':
            return {
                user: null,
                loading: false,
                error: null,
            }
        case 'REGISTER_FAILURE':
            return {
                user: null,
                loading: false,
                error: null,
            }
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,

            }
        default:
            return state
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_state)

    // useEffect(() => {
    //     // localStorage.setItem('username', JSON.stringify(state.username))
    // }, [state.username])

    return <AuthContext.Provider value={{
        user: state.username,
        loading: state.loading,
        error: state.error,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>
}
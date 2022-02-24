import { createContext, useState } from 'react';

export const  authContext = createContext();

const AuthContextProvider = (props) => {
    const [logged, Setlogged] = useState(null);

    return (
        <authContext.Provider
            value = {{
                logged,
                Setlogged
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;
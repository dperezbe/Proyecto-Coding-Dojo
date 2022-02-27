import { createContext, useState } from 'react';

export const  authContext = createContext();

const AuthContextProvider = (props) => {
    const [logged, Setlogged] = useState(null);
    const [myapps, SetMyapps] = useState(null);
    const [mysubs, SetMysubs] = useState(null);

    return (
        <authContext.Provider
            value = {{
                logged,
                myapps,
                mysubs,
                Setlogged,
                SetMyapps,
                SetMysubs
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;
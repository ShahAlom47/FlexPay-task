


import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; // ES6
import axios from "axios";







export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState({ name: 'xyz', accountType:'user'});
    // const [user, setUser] = useState({ name: 'xyz', accountType:'agent'});


    const userRegister = (email, password) => {
        setLoading(true);

    }
    const userLogin = (email, password) => {
        setLoading(true);
    }



    const userLogOut = () => {
        setLoading(true);
    }

    useEffect(() => {
        const unSubscribe = () => {
            setUser({ name: 'xyz', roll: 'user' })

        };
        return () => unSubscribe
    }, [loading, user])


    const AuthInfo = { user, userLogin, userRegister, userLogOut, }


    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {

    children: PropTypes.node.isRequired
}
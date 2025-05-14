import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const baseURL = "http://localhost:5000/";
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const passwordReset = async (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/api/auth/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            localStorage.setItem('user-id', res.data.user_id)
                            setUserId(res.data.user_id)
                            setLoading(false);
                        }
                    })

            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                localStorage.removeItem('user-id')
                setLoading(false);
            }

        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])
    const authInfo = {
        user,
        userId,
        loading,
        createUser,
        signIn,
        logOut,
        baseURL,
        passwordReset
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
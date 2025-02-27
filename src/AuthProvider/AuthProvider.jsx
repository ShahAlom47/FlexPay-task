/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null) // Initially, no user is logged in

    // Function to verify the JWT token and set the user
    const verifyTokenAndSetUser = async () => {
        setLoading(true)
        try {
            // Backend request to verify the token
            const response = await axios.get(
                'https://mobile-banking-tawny.vercel.app/api/auth/verify-token',
                {
                    withCredentials: true, // Include cookies in the request
                }
            )
            console.log("User data received:", response.data.data.user);
            if (response.data.success) {
               
                setUser(response.data?.data?.user) // Set the user from backend response
            } else {
                console.warn("Token verification failed. No valid user.");
                setUser(null) // No valid token, set user to null
            }
        } catch (error) {
            console.error('Token verification failed:', error)
            toast.error('Authentication failed. Please login again.')
            setUser(null) // Set user to null if there's an error
        } finally {
            setLoading(false) // Stop loading
        }
    }

    // Function to log out the user
    const userLogOut = async () => {
        console.log('hhh');
        try {
            // Call the backend to clear the token cookie
            await axios.post(
                'https://mobile-banking-tawny.vercel.app/api/auth/logout',
                {},
                {
                    withCredentials: true, // Include cookies in the request
                }
            )

            setUser(null) // Clear the user state
            toast.success('Logged out successfully')
        } catch (error) {
            console.error('Logout failed:', error)
            toast.error('Logout failed. Please try again.')
        }
    }

    // Verify the token and set the user when the component mounts
    useEffect(() => {
        verifyTokenAndSetUser()
    }, [])

    

    // Provide the user and logout function to the app
    const AuthInfo = { user, loading, userLogOut, verifyTokenAndSetUser } // `verifyTokenAndSetUser` ও পাঠানো হলো

    return (
        <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider

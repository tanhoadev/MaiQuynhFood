import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
    const storedData = JSON.parse(localStorage.getItem('user_data'))
    const [NumCart, setNumCart] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    
    
    useEffect(() => {
        const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
        if (storedIsAdmin) {
            setIsAdmin(true); // Cập nhật trạng thái isAdmin từ local storage
        } else {
            setIsAdmin(false);
        }
        if (storedData) {
            console.log(storedData.user)
            // setToken(storedData.newData.token)
            setUserData(storedData.user)
            setIsAuthenticated(true)
            // if (user.role === 'admin') {
            //     setIsAdminAuthenticated(true)
            // }
        }
        else{
            // window.location('/dangnhap')
        }
    }, [])

    const login = (newData) => {
        localStorage.setItem("user_data", JSON.stringify({ user: newData }))
        setToken(newData.token)
        setUserData(newData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("user_data")
        setToken(null)
        setUserData(null)
        setIsAuthenticated(false)
        setIsAdminAuthenticated(false)
    }

    return (
        <AuthContext.Provider
        value={{
            token: token,
            isAuthenticated: isAuthenticated,
            isAdminAuthenticated: isAdminAuthenticated,
            login: login,
            logout: logout,
            userData: userData,
            setUserData: setUserData,
            NumCart: NumCart,
            setNumCart: setNumCart,
            isAdmin: isAdmin,
            setIsAdmin:setIsAdmin
        }}
    >
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
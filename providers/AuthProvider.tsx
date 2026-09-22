'use client';

import { api } from "@/lib/axiosInstances";
import { Route } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface User {
    id: string,
    name: string,
    email: string,
    role : string
};

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logOut: ()=> void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useRouter()

    const fetchUser = useCallback(async() => {
        setIsLoading(true)
        try {
            const loggedUser = await api.get('/api/auth/me');
            setUser(loggedUser.data?.data)
        } catch (error) {
            console.log(error)
            setUser(null)
        } finally{
            setIsLoading(false)
        }
    },[]);

    useEffect(()=>{
        fetchUser()
    },[fetchUser])

    const logOut = async() => {
        try {
            await api.post('/api/auth/logout');
            navigate.push('/')
            toast.success("User logout successfully")
        } catch (error) {
            console.log(error)
        }
    };


    return(
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, isLoading, logOut }} >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    const context = useContext(AuthContext);

    if(!context) throw new Error("useAuth must be used inside AuthProvider");

    return context;
}
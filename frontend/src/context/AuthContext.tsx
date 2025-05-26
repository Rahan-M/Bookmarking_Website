import {createContext, useState, useEffect, ReactNode} from 'react'

export interface User{
    _id:string,
    name:string,
    email:string
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, jwt: string) => void;
    logout: () => void;
  }

export const AuthContext=createContext<AuthContextType>({
    user:null,
    token:null,
    login:()=>{
        console.log("Function Not DEfined");
    },
    logout:()=>{},
});

interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthProvider=({children}:AuthProviderProps)=>{
    const [user, setUser]=useState<User |null>(null);
    const [token, setToken]=useState<string | null>(null);

    useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        const storedToken=localStorage.getItem('token');
        if(!(storedUser && storedToken)) return;
        try{
            const parsedUser=JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken); 
        }catch (err){
            console.error("Error while parsing,",err);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } 
    },[user])

    const login=(userData: User, jwt:string)=>{
        if(!userData) return;
        setUser(userData);
        setToken(jwt);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', jwt);
        console.log("Logged In");
    }

    const logout=()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
        );
}
import {createContext, useState, useEffect, ReactNode} from 'react'

interface User{
    _id:string,
    username:string,
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
    login:()=>{},
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
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }},[])

        const login=(userData: User, jwt:string)=>{
            setUser(userData);
            setToken(jwt);

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', jwt);
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
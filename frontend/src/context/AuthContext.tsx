import {createContext, useState, useEffect, ReactNode} from 'react'

export interface User{
    _id:string,
    name:string,
    email:string
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loggedIn:Boolean;
    loadingAuth:Boolean;
    login: (userData: User, jwt: string) => void;
    logout: () => void;
  }

export const AuthContext=createContext<AuthContextType>({
    user:null,
    token:null,
    loggedIn:false,
    loadingAuth:false,
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
    const [loggedIn, setLoggedIn]=useState<Boolean>(false);
    const [loadingAuth, setLoadingAuth]=useState<Boolean>(true);

    useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        const storedToken=localStorage.getItem('token');
        const storedLoginState=localStorage.getItem('loggedIn');
        if(!(storedUser && storedToken && storedLoginState)) return;
        try{
            const parsedUser=JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken); 
            if(storedLoginState=='true') 
                setLoggedIn(true);
        }catch (err){
            console.error("Error while parsing,",err);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('loggedIn');
        } 
        setLoadingAuth(false);
    },[])

    const login=(userData: User, jwt:string)=>{
        if(!userData) return;
        setUser(userData);
        setToken(jwt);
        setLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', jwt);
        localStorage.setItem('loggedIn', "true");
        console.log("Logged In");
    }
    
    const logout=()=>{
        setUser(null);
        setToken(null);
        setLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
    }

    return (
        <AuthContext.Provider value={{ user, token, loggedIn, loadingAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
        );
}
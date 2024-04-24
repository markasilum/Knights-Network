import { createContext, useEffect, useReducer } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export const AuthContext = createContext()

export const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return{user: action.payload}
        case 'LOGOUT':
            return{user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer,{
        user: null,
        isLoading: true // Add isLoading state
    })
    
    useEffect(() => {
      const logout = async () => {
        try {
            console.log("check current user")
            const userData = await fetch(`http://localhost:3000/auth/user`, {
            credentials: "include",
          });
         
          if (userData.status === 401) {
            console.log("User not logged in");
            dispatch({ type: "LOGOUT" });
          } else {
            const user = await userData.json();
            console.log(user);
            dispatch({ type: "LOGIN", payload: user });
          }
          
        } catch (error) {
          // Handle error, maybe set user to null
          console.error("Error fetching user:", error);
          dispatch({ type: "LOGOUT" }); // Assuming you have a LOGOUT action
        } 
      };
      logout()
    }, []);

    console.log('AuthContext state: ', state)
    if (state.isLoading) {
      // Render loading indicator while fetching user data
      return (
         <div className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center w-16 h-16 border-t-4 border-gray-400 rounded-full animate-spin"></div>
          <p className="ml-2">Loading...</p>
        </div>
      )
    }

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}



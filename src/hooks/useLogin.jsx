import  { useState } from 'react'
import useAuthContext from './useAuthContext';


const url='https://workoutbuddybackend1.onrender.com'


export default function useLogin() {
    const  [ error, setError] = useState(null) ;
    const [isLoading , setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    async function login(email, password) {
        setIsLoading(true) ;
        setError(null) ;

        const response = await fetch(url+'/api/user/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const json = await response.json() ;

        if(!response.ok) {
            setIsLoading(false) ;
            setError(json.error)
        }
        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({type:"LOGIN" , payload:json})
            setIsLoading(false) ;
        }
    }
  return  {
    login , isLoading , error
  }
}

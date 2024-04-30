import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import LoadRedirect from './LoadRedirect';
const RouteProtect = ({children}) => {
    const { users } = useSelector((state)=>({...state}));
    const [logined,setLogined] = useState(false)

    let getData = JSON.parse(localStorage.getItem("data"));

    useEffect(()=>{
      if(users && users.token && users.role === "admin"  || users.role ==="super" ){
        setLogined(true)
      }
    },[users.token,users.role,users.role === "admin" ||  users.role ==="super"]);

  return logined && users.token && users.role === "admin" ||  users.role ==="super" 
  ? 
  children 
  : 
  <LoadRedirect />
}

export default RouteProtect

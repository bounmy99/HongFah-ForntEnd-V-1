import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import LoadRedirect from './LoadRedirect';
const RouteProtect = ({children}) => {
    const { users } = useSelector((state)=>({...state}));
    const [logined,setLogined] = useState(false)

    let getData = JSON.parse(localStorage.getItem("data"));

    useEffect(()=>{
      if(getData && getData.token && getData.role === "admin"){
        setLogined(true)
      }
    },[getData.token,getData.role,getData.role === "admin"]);

  return logined && getData.token && getData.role === "admin" 
  ? 
  children 
  : 
  <LoadRedirect />
}

export default RouteProtect

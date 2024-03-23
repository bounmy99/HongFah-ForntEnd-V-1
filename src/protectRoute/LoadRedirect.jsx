import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function LoadRedirect() {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(()=>{
        const Interval = setInterval(()=>{
            setCount((currentCount)=>--currentCount)
        },2000)
        count === 0 && navigate("/");
        return ()=>clearInterval(Interval)
    },[count]);

    const alerts = ()=>{
         if(count === 0){
            Swal.fire({
              position : "center",
              icon : "success",
              title : `Token is Expire go to login page in ${count}`,
              showCancelButton: false,
              timer : 3500
            });


        }
    }

  return (
    <div>
      {
       alerts()
      }
    </div>
  )
}

export default LoadRedirect

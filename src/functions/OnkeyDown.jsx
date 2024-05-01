import { useEffect } from "react";

export const  OnKeyDown = (callFunction, key)=>{
    // ============ Enter Key ====================
  useEffect(() => {
    const keyDownHandle = (event) => {
      if (event.key === key) {
        callFunction();
      }
    };
    document.addEventListener("keydown", keyDownHandle);
    return () => {
      document.removeEventListener("keydown", keyDownHandle);
    };
  }, [callFunction, key]);
  //============== end Enter Key ==============
}
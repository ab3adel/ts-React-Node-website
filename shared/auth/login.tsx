import React, { useEffect } from 'react' 
import googleBtn from '../img/google-btn.png'
export const Login=(props:any)=>{
    

    return (
        <div className="auth">
              <a href="http://localhost:9000/google/auth" ><img src={googleBtn} alt="Sign In" /></a>
        </div>
    )
}
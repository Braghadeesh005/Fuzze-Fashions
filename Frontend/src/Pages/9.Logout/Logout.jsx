import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {

    const Navigate = useNavigate();
    useEffect(()=>{
        fetch('https://fuzzefashions.onrender.com/logout1',{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        }).then((res)=>{
            Navigate("../",{replace:true});
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('issignedin', false);

  return(
      <>
      <section><h3>ONE MOMENT PLEASE!!!</h3></section>
      </>
  )
}

export default Logout
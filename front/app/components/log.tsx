import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import css from "../styles/sass/components/newEdit.module.scss";

function Login({setAuth}) {
const [id,setId] = useState("");
const [pass,setPass] = useState("");


    return (
        <>
            id:<input type="text" value={id} onChange={ e => setId(e.target.value)} />
            pass:<input type="text" value={pass} onChange={ e => setPass(e.target.value)}/>
            <button onClick={ () =>{ 
                if(id == "test" || pass == "1234"){
                setAuth(true)}
            }}>送信</button>
        </>
    )
}

export default Login;
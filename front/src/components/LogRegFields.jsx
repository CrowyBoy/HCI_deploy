import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACC_TOKEN, REF_TOKEN } from "../const";

function LogRegFields({route, mode}) {
    const [username, setUsr] = useState("")
    const [password, setPass] = useState("")
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    const name = mode === "login" ? "Login" : "Register"
    const submitHand = async(e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await api.post(route, {username,password})
            if (mode === "login"){
                localStorage.setItem(ACC_TOKEN, res.data.access)
                localStorage.setItem(REF_TOKEN, res.data.refresh)
                nav("/")
            }
            else{
                nav("/register")
            }
        } catch (err) {
            alert(err)
        } finally{
            setLoading(false)
        }}
    return(
        <>
        <form onSubmit={submitHand} className="form-container">
            <input className="form-input" type="text" value={username} onChange={(e) => setUsr(e.target.value)} placeholder="Username"/>
            <input className="form-input" type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
        
        {loading}
        <button className="form-button" type="submit">
            {name}
        </button>
        </form>
        </>
    )
}
export default LogRegFields
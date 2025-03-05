import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACC_TOKEN, REF_TOKEN } from "../const";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/LogRegField.css'

function LogRegFields({route, mode}) {
    const [username, setUsr] = useState("")
    const [password, setPass] = useState("")
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    //const name = mode === "login" ? "Login" : "Register"
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
                alert("You have created an account")
                nav("/Login")
            }
        } catch (err) {
            alert(err)
        } finally{
            setLoading(false)
        }}
        const gotoReg = async(e) => {
            setLoading(true)
            try {
                nav("/Register")
            } catch (err) {
                alert(err)
            } finally{
                setLoading(false)
            }}
        document.title = mode
    if(mode === "login"){
    return(
        <div className="container">
        <div className="row justify-content-center">
            <h1 style={{textAlign:"center"}}>Welcome to Whiskr!</h1>
        </div>
        <div className="row justify-content-center">
            <img src="logo.png" alt="logo" className="w-50 h-auto" />
        </div>
        <form onSubmit={submitHand} className="form-container">
            <div className="form-group">
                <label htmlFor="email">User name</label>
                <input id="email" className="form-control" type="text" value={username} onChange={(e) => setUsr(e.target.value)} placeholder="Username"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
            </div>
        {loading}
        <div className="row flex-nowrap justify-content-center">
            <div className="col-auto m-0">
        <button className="btn btn-primary btn-lg m-0" type="submit">
            Login
        </button>
        </div>
        <div className="col-auto m-0">
        <button className="btn btn-secondary btn-lg m-0" onClick={gotoReg} type="button">Register</button>
        </div>
        </div>
        </form>
        </div>
    )
}
else if(mode === "register"){
    return(
        <div className="container">
        <div className="row justify-content-center">
            <h1 style={{textAlign:"center"}}>Welcome to Whiskr!</h1>
        </div>
        <div className="row justify-content-center">
            <img src="logo.png" alt="logo" className="w-50 h-auto" />
        </div>
        <form onSubmit={submitHand} className="form-container">
            <div className="form-group">
                <label htmlFor="email">User name</label>
                <input id="email" className="form-control" type="text" value={username} onChange={(e) => setUsr(e.target.value)} placeholder="Username"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
            </div>
        {loading}
        <div className="row justify-content-center">
            <div className="col-auto">
        <button className="btn btn-primary btn-lg" type="submit">
            Register
        </button>
        </div>
        </div>
        </form>
        </div>
    )
}
}
export default LogRegFields
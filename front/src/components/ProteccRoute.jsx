import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REF_TOKEN, ACC_TOKEN } from "../const"
import { useState, useEffect } from "react"

function ProteccRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null)
    useEffect(()=>{auth().catch(() => setIsAuth(false))},[])
    const refToken = async () => {
        const refToken = localStorage.getItem(REF_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/", { refresh: refToken, })
            if (res.status === 200) {
                localStorage.setItem(ACC_TOKEN, res.data.access)
                setIsAuth(true)
            }
        } catch (err) {
            console.log(err)
            setIsAuth(false)

        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACC_TOKEN)
        if (!token) {
            setIsAuth(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExp = decoded.exp
        const now = Date.now() / 1000
        if (tokenExp < now) {
            await refToken()
        }
        else {
            setIsAuth(true)
        }
    }
    if (isAuth === null) {
        return <div>Loading</div>
    }
    return isAuth ? children : <Navigate to="/login" />
}
export default ProteccRoute
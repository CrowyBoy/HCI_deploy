import "../styles/PicPost.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api";
function PicPost() {
    const [loading, IsLoading] = useState(false)
    const [post, SetPost] = useState({
        content: null,
        pfp: null,
        username: null
    })
    const nav = useNavigate()
    useEffect(()=>{
        const choosePost = async () => {
           IsLoading(true)
           try {
            const postResp = await api.get("/api/posts/")
            const dataList = postResp.data
            const uploadResp = await api.get(`/api/uploader/${dataList[0].posterid}/`)
            SetPost({
                upid: dataList[0].posterid,
                content: dataList[0].content,
                pfp: uploadResp.data.pfp,
                username: uploadResp.data.username
            })
            
            
           } catch (error) {
            alert(error)
           }
           finally{
            IsLoading(false)
           }
        };
        choosePost();
    },[])
    const profileNav = () => {
        nav("/profile",{state:{accid:post.upid}})
    }
    if(loading){
        return (<>
        <div className="content">
            <div>
                <div>
                    <p>LOADING</p>
                </div>
            </div>
        </div>
        </>)
    }
    return(
        <div className="content">
            <div className="row flex-nowrap justify-content-start g-0">
                <div className="col-auto m-0">
                    <img src={post.pfp} alt="cat" className="pfp" onClick={profileNav}/>
                </div>
                <div className="col m-0">
                    <h3 className="m-0 ps-2" onClick={profileNav}>{post.username}</h3>
                </div>
            </div>
            <div className="row justify-content-center g-0">
                <div className="col">
                    <img src={post.content} alt="nala" className="catpost" />
                </div>
            </div>
            <div className="row flex-nowrap g-0">
                <div className="col m-0">
                    <button className="btn btn-primary w-100">Like</button>
                </div>
                <div className="col m-0">
                    <button className="btn btn-secondary w-100">Comment</button>
                </div>
            </div>
        </div>
    )
}

export default PicPost
import { useState, useEffect, use } from "react"
import api from "../api"
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/ProfileComp.css"
function ProfileComp({accid}) {
    const [profile, SetProfile] = useState({
        username: null,
        pfp: null
    })
    const [pics, SetPics] = useState([null])
    const [followStatus, SetFollowStatus] = useState("")
    const [loading, IsLoading] = useState(false)
    const [button, SetButton] = useState({
        value:null,
        class:null,
    })
    useEffect(()=>{
        const resolveProfile = async () => {
            IsLoading(true)
            try {
                const UploadRes = await api.get(`/api/uploader/${accid}/`)
                const PostsRes = await api.get(`/api/posts/${accid}/`)
                SetProfile({
                    username: UploadRes.data.username,
                    pfp: UploadRes.data.pfp,
                })
                const pics = []
                const mountOfRows = Math.floor(PostsRes.data.length/3)
                const remPicsMount = PostsRes.data.length % 3
                for(let i = 0; i<mountOfRows; i=i+3){
                    pics[i] = (
                    <div className="row g-0 flex-nowrap justify-content-center">
                    <div className="col m-1">
                    <img src={PostsRes.data[i].content} alt={`${UploadRes.data.username}'s picture`} className="otherPics"/>
                    </div>
                    <div className="col m-1">
                    <img src={PostsRes.data[i+1].content} alt={`${UploadRes.data.username}'s picture`} className="otherPics"/>
                    </div>
                    <div className="col m-1">
                    <img src={PostsRes.data[i+2].content} alt={`${UploadRes.data.username}'s picture`} className="otherPics"/>
                    </div>
                    </div>
                )
                if(remPicsMount === 2){
                    pics.push(
                    <div className="row g-0 flex-nowrap justify-content-center">
                    <div className="col m-1">
                    <img src={PostsRes.data[mountOfRows*3].content} alt={`${UploadRes.data.username}'s picture`} className="otherPics"/>
                    </div>
                    <div className="col m-1">
                    <img src={PostsRes.data[(mountOfRows*3)+1].content} alt={`${UploadRes.data.username}'s picture`} className="otherPics"/>
                    </div>
                    </div>)
                }
                else if (remPicsMount === 1){
                    pics.push(
                    <div className="row g-0 flex-nowrap justify-content-center">
                    <div className="col m-1">
                    <img src={PostsRes.data[mountOfRows*3].content} alt={`${UploadRes.data.username}'s picture`} className="otherPics"/>
                    </div>
                    </div>)
                }
                }
                SetPics(pics)
            } catch (error) {
                alert(error)
            }
            finally{
                IsLoading(false)
            }            
        };
        const getFollow = async () => {
            IsLoading(true)
            try {
                const FollowRes = await api.get(`api/follow/retrive/${accid}/`)
                console.log(`this is follow data ${FollowRes.data.length}`)
                if(await FollowRes.data.length === 0 ){
                    SetFollowStatus("Follow")
                    SetButton({
                        value: "Follow",
                        class: "btn btn-primary btn-lg"
                    })
                }
                else{
                    SetFollowStatus("Unfollow")
                    SetButton({
                        value: "Unfollow",
                        class: "btn btn-outline-primary btn-lg"
                    })
                }                
            } catch (error) {
                alert(error)                
            }
            finally{
                IsLoading(false)
            }
        };
        resolveProfile()
        getFollow()
    },[])
    const followFunc = async (e) => {
        IsLoading(true)
        try {
            if(followStatus === "Follow"){
                const FollowRes = await api.post(`api/follow/create/${accid}/`)
                console.log(FollowRes)
                SetButton({
                    value: "Unfollow",
                    class: "btn btn-outline-primary btn-lg"
                })
                SetFollowStatus("Unfollow")
            }
            else if(followStatus === "Unfollow"){
                const FollowRes = await api.delete(`api/follow/delete/${accid}/`)
                console.log(FollowRes)
                SetButton({
                    value: "Follow",
                    class: "btn btn-primary btn-lg"
                })
                SetFollowStatus("Follow")
            }
            
        } catch (error) {
            alert(error)
        }
        finally{
            IsLoading(false)
        }
    }
    if(loading){
        return <h1>Loading</h1>
    }
    document.title = `page of ${profile.username}`
    return (
        <div className="container-fluid justify-content-center">
            <img src={profile.pfp} alt={`profile picture`} className="rounded mx-auto d-block w-50 h-100"/>
            <div className="row g-0">
                <h1 className="username">{profile.username}</h1>
            </div>
            <div className="row justify-content-md-center g-0">
                <div className="col-md-auto">
                <button onClick={followFunc} className={button.class}>{button.value}</button>
                </div>
            </div>
                    {pics}
        </div>
    )
    
}
export default ProfileComp
//            <div className="row justify-content-center d-flex flex-wrap g-0" style={{border: "2px solid green"}}>

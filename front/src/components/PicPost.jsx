import "../styles/PicPost.css"
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
    let accountId = -1
    const profileNav = () => {
        nav("/profile",{state:{accid:accountId}})
    }
    useEffect(()=>{
        const choosePost = async () => {
            /*
            let accountName = ""
            const randNum = Math.floor(Math.random() * accounts.length)
            const randomAccount = accounts[randNum]
            const randomPic = Math.floor(Math.random() * numberOfPics) +1
            if(randNum === 0){
                accountName = "Crunchy the cat"
            }
            else if(randNum === 1){
                accountName = "Nala's sillies"
            }
            else{
                accountName = "Venus from space"
            }
            accountId = randNum
            postId = randomPic - 1
            return [`${randomAccount}/${randomPic}.jpg`,`${randomAccount}/pfp/pfp.jpg`,accountName]
            */
           IsLoading(true)
           try {
            const postResp = await api.get("/api/posts/")
            const dataList = postResp.data
            const uploadResp = await api.get(`/api/uploader/${dataList[0].posterid}/`)
            SetPost({
                content: dataList[0].content,
                pfp: uploadResp.data.pfp,
                username: uploadResp.data.username
            })
            console.log(post);
            console.log(post.content);
            
            
           } catch (error) {
            alert(error)
           }
           finally{
            IsLoading(false)
           }
        };
        choosePost();
    },[])

    
    const likeButtonDoer = async () =>{
        
    }

    if(loading){
        return (<>
        <tbody>
            <tr>
                <td>
                    <p>LOADING</p>
                </td>
            </tr>
        </tbody>
        </>)
    }
    return(
        <>
        <tbody>
            <tr>
                <td>
                    <img src={post.pfp} alt="cat" className="pfp" onClick={profileNav}/>
                    <h3 onClick={profileNav}>{post.username}</h3>
                </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
                <td>
                    <img src={post.content} alt="nala" />
                </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
                <td>
                    <button>Like</button>
                    <button>Comment</button>
                </td>
            </tr>
            </tbody>
        </>
    )
}

export default PicPost
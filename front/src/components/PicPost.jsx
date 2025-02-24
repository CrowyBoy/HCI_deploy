import "../styles/PicPost.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PicPost() {
    const numberOfPics = 4
    const accounts = ["crunch","nala","venus"]
    const nav = useNavigate()
    let accountId = -1
    let postId = -1
    const profileNav = () => {
        nav("/profile",{state:{accid:accountId}})
    }
    const choosePost = () => {
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
    }
    const likeButtonDoer = async () =>{
        
    }
    const chosenPost = choosePost()
    const picSrc = chosenPost[0]
    const pfpSrc = chosenPost[1]
    const accountName = chosenPost[2]
    return(
        <>
        <tbody>
            <tr>
                <td>
                    <img src={pfpSrc} alt="cat" className="pfp" onClick={profileNav}/>
                    <h3 onClick={profileNav}>{accountName}</h3>
                </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
                <td>
                    <img src={picSrc} alt="nala" />
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
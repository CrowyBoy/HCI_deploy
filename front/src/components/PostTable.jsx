import PicPost from "./PicPost";
import "../styles/PicPost.css"
function PostTable(numberOfPosts) {
    const postList = []
    for(let i = 0; i<parseInt(Object.values(numberOfPosts)[0]); i++){
        postList.push(PicPost())
    }
    document.title = "Home"
    return(
        <main>
            {postList}
        </main>
    )
}
export default PostTable
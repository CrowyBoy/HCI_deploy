import PicPost from "./PicPost";

function PostTable(numberOfPosts) {
    const postList = []
    for(let i = 0; i<parseInt(Object.values(numberOfPosts)[0]); i++){
        postList.push(PicPost())
    }
    
    return(
        <table>
            {postList}
        </table>
    )
}
export default PostTable
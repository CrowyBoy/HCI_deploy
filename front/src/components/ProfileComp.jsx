function ProfileComp({accid}) {
    const numOfPics = 4
    const accounts = ["crunch","nala","venus"]
    const account = accounts[accid]
    const resolveAccount = () =>{
        let name = "cat"
        const accPicturesLinks = []
        const accPictures = []
        const pfpSrc = `${account}/pfp/pfp.jpg`
        for(let i=1; i<numOfPics+1; i++){
            accPicturesLinks[i] = `${account}/${i}.jpg`
        }
        for(let j=0; j<accPicturesLinks.length;j++){
            accPictures[j] = (
                <td>
                    <img src={accPicturesLinks[j]} alt="" />
                </td>
            )
        }
        if (accid = 0){
            name = "Crunchy the cat"
        }
        else if(accid = 1){
            name = "Nala's sillies"
        }
        else{
            name = "Venus from space"
        }
        return [pfpSrc,accPictures,name]
    }

    const data = resolveAccount()
    const pfpSrc = data[0]
    const pictures = data[1]
    const name = data[2]
    return (
        <>
        <img src={pfpSrc} alt={`${name}'s profile picture`} />
        <h1>{name}</h1>
        <button>follow</button>
        <table>
            <tbody>
                <tr>
                    {pictures}
                </tr>
            </tbody>
        </table>
        </>
    )
    
}
export default ProfileComp
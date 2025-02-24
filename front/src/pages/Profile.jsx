import { useLocation } from "react-router-dom"
import ProfileComp from "../components/ProfileComp"
function Profile() {
    const props = useLocation()
    
    return <ProfileComp accid={props.state.accid}/>
}
export default Profile
import { useContext} from "react";
import { AuthContext } from "../context/authContext";

// import Component
import Header from "../components/Header"
import ProfileCard from "../components/ProfileCard"
import MyLiterature from "../components/MyLiterature"

export default function Profile() {
    const { state } = useContext(AuthContext);

    return (
        <div className="profile">
            {/* header  */}
            <Header />

            {/* profile card  */}
            <div 
            style={{
                width: '80%',
                margin: 'auto'
            }}>
                <ProfileCard state={state} />
                <MyLiterature state={state} />        
            </div>

        </div>
    )
}
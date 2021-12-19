import { useContext } from "react";
import { AuthContext } from "../context/authContext";

import UserHome from "./Search";
import AdminHome from "./Admin/HomeAdmin";

export default function Home() {
    const { state } = useContext(AuthContext);

    return (
        <div className="home">
            {state.user?.role === "admin" && <AdminHome />}
            {state.user?.role === "user" && <UserHome />}
        </div>
    );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api"

import NoData from "../components/NoData";
import Pdf from "../components/Pdf";

// import css 
import "../assets/css/myLiterature.css"

export default function MyLiterature({state}) {
    const [myLiterature, setMyLiterature] = useState([]);

    const getMyLiterature = async () => {
        try {
            const response = await API.get(`/profile/literatures`);
            setMyLiterature(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyLiterature();
    }, []);

    return (
        <div className="myLiterature">
            <h1>My Literature</h1>

            <div className="myLiterature-container">
            {myLiterature.length ? (
                myLiterature.map((item, index) => (
                    <div   
                    className=" myLiterature-data"
                    key={`literature-${index}`}
                    >
                        <Link to={`/DetailLiterature/${item.id}`}
                        style={{
                            textDecoration: "none"
                        }}>
                            <Pdf
                            attache={item.attache}
                            title={item.title}
                            status={item?.status}
                            author={item.author}
                            publication_date={item.publication_date}
                            />
                        </Link>
                    </div>
                ))
            ) : (
                <>
                    <NoData />
                </>
            )}
            </div>
        </div>
    )
}
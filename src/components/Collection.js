import { useEffect, useState } from "react";
import { API } from "../config/api";

// import css 
import "../assets/css/myCollection.css"

// import image 
import NoData from "../components/NoData";
import PdfLiterature from "../components/Pdf";

export default function Collection() {
    const [myCollections, setMyCollections] = useState([]);

    const getMyCollections = async () => {
        try {
        const response = await API.get(`/collections`);

        setMyCollections(response.data.data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getMyCollections();
    }, []);

    return (
        <div className="myCollection">
            <h1>My Collection</h1>

            <div className="myCollection-container">

            {myCollections.length ? (
              myCollections.map((item, index) => (
                <div className="myCollection-data">
                    <div className="data" key={`myCollections-${index}`}>
                        <PdfLiterature
                            attache={item?.literature.attache}
                            literatureId={item?.literature.id}
                            title={item?.literature.title}
                            author={item?.literature.author}
                            publication_date={item?.literature.publication_date}
                        />
                    </div>
                </div>
              ))
            ) : (
              <NoData />
            )}

                
                

            </div>
        </div>
    )
}
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NotificationManager } from "react-notifications";
import { pdfjs, Document, Page } from "react-pdf";

import Header from "./Header";
import { donwloadPdf } from "../utils/donwloadPdf";

import { API } from "../config/api";
import { AuthContext } from "../context/authContext";

// import css 
import "../assets/css/detail.css";

// import bootstrap 
import { Button } from "react-bootstrap";

// import image 
import image from "../assets/images/literature-book.png";
import collection from "../assets/images/collection.png";
import download from "../assets/images/download.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function Detail() {
    const { id } = useParams();
    const history = useHistory();
    console.log("params + " +id)

    const { state } = useContext(AuthContext);

    const [detailLiterature, setDetailLiterature] = useState(null);
    const [detailCollection, setDetailCollection] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getDetailLiterature();
        getDetailCollection();
    }, []);

    
    const getDetailLiterature = async () => {
        try {
            const response = await API.get(`/literatures/${id}`);
            setDetailLiterature(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const getDetailCollection = async () => {
        try {
            const response = await API.get(`/collections/literature/${id}`);
            setDetailCollection(response.data.data);
        } catch (error) {
            if (error.response) {
                setDetailCollection(null);
            }
        }
    };

    // collection 
    const handleCollect = async () => {
        try {
          if (detailCollection) {
            const response = await API.delete(`/collections/${detailCollection.id}` );
    
            if (response.status === 200) {
              NotificationManager.success(
                response.data.message,
                response.data.status,
                4000,
                () => {
                  history.push("/collection");
                }
              );
    
              getDetailCollection();
            }
          } else {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
    
            const body = JSON.stringify({ literatureId: detailLiterature.id });
    
            const response = await API.post("/collections", body, config);
    
            if (response.status === 200) {
              NotificationManager.success(
                response.data.message,
                response.data.status,
                4000,
                () => {
                  history.push("/collection");
                }
              );
    
              getDetailCollection();
            }
          }
        } catch (error) {
          console.log(error);
        }
    };

    // download pdf 
    const handleDownload = () => {
        donwloadPdf(detailLiterature.attache, String(detailLiterature.title));
        NotificationManager.success("Download starting...", "Success");
    };

    return (
        <div className="detail-literature">

            <div className="detail-img">
              <div
                className="col-auto position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(detailLiterature?.attache);
                }}
              >
                <Document file={detailLiterature?.attache}>
                  <Page
                    pageNumber={1}
                    width={320}
                    className="rounded"
                  />
                </Document>
              </div>
            </div>

            <div className="detail-data">
                <div className="data-1">
                    <h1>{detailLiterature?.title}</h1>
                    <p>{detailLiterature?.author}</p>
                </div>
                <div className="data-1">
                    <h2>Publication date</h2>
                    <p>{detailLiterature?.publication_date}</p>
                </div>
                <div className="data-1">
                    <h2>Pages</h2>
                    <p>{detailLiterature?.pages}</p>
                </div>
                <div className="data-1">
                    <h2 style={{color:"#AF2E1C"}}>ISBN</h2>
                    <p>{detailLiterature?.isbn}</p>
                </div>
                <div className="data-1">
                    <Button variant="" onClick={handleDownload}> 
                        Download 
                        <img src={download} alt="Download icon" />
                    </Button>
                </div>
            </div>
            
            <div className="collection-action">
              {detailCollection ? (
                <button className="btn btn-secondary btn-action-collect" onClick={handleCollect} >
                  Remove Collection
                  <span>
                    <img src={collection} />
                  </span>
                </button>
              ) : (
                <button className="btn btn-danger btn-action-collect" onClick={handleCollect}>
                  Add My Collection
                  <span>
                    <img src={collection} />
                  </span>
                </button>
              )}
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";
import { API } from "../../config/api"

import { Button, Table } from "react-bootstrap";

// import css 
import "../../assets/css/homeAdmin.css"

// import component 
import noData from "../../components/NoData"

// import Component
import Header from "../../components/HeaderAdmin"

export default function HomeAdmin() {

    const [literatures, setLiteratures] = useState([]);

    const getLiteratures = async () => {
        try {
        const response = await API.get("/literatures");

        setLiteratures(response.data.data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getLiteratures();
    }, []);

    const handleAction = async (literatureId, status) => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ status });
          const response = await API.put(
            `/literatures/${literatureId}`,
            body,
            config
          );
          if (response.status === 200) {
              console.log("Success")
          }
    
          getLiteratures();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="homeAdmin">
                <div className="homeAdmin-table">
                    <h1>Book Verification</h1>

                    <div className="tableScroll">
                    {literatures.length ? (
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{width:"5%"}}>No</th>
                                    <th style={{width:"20%"}}>Users or Author</th>
                                    <th style={{width:"10%"}}>ISBN</th>
                                    <th style={{width:"35%"}}>Literature</th>
                                    <th style={{width:"15%"}}>Status</th>
                                    <th style={{width:"15%"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {literatures.map((item, index) => (
                                    <tr key={`data-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{item?.author}</td>
                                        <td>{item?.isbn}</td>
                                        <td>
                                            <a
                                            href={item?.attache.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="textAttache"
                                            >
                                                {item?.attache.filename}
                                            </a>
                                        </td>
                                        <td>
                                            <div
                                                className={`fw-bold status ${
                                                (item?.status === "Waiting Approve" &&
                                                    "waiting") ||
                                                (item?.status === "Approve" &&
                                                    "approve") ||
                                                (item?.status === "Cancel" && "cancel")
                                                }`}
                                            >
                                                {item?.status === "Waiting Approve"
                                                ? "Waiting to be verified"
                                                : item?.status}
                                            </div>
                                        </td>
                                        <td>
                                            
                                            <div className="table-admin">
                                                <Button 
                                                variant="" 
                                                className="btn-admin-cancel" 
                                                onClick={() => {
                                                    handleAction(item.id, "Cancel");
                                                }}>
                                                Cancel
                                                </Button>

                                                <Button variant="" className="btn-admin-approve" 
                                                onClick={() => {
                                                    handleAction(item.id, "Approve");
                                                }}
                                                >
                                                Approve
                                                </Button>
                                            </div>

                                            {item?.status === "Approve" && (
                                                <div className="text-center">
                                                <i className="fas fa-check-circle text-success fs-2"></i>
                                                </div>
                                            )}
                                            {item?.status === "Cancel" && (
                                                <div className="text-center">
                                                <i className="fas fa-times-circle text-danger fs-2"></i>
                                                </div>
                                            )}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </Table>
                    ) : (
                        <noData />
                    )}
                    </div>

                    
                </div>
            </div>
        </>
    )
}
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { API } from "../config/api";
import { pdfjs, Document, Page } from "react-pdf";
import { NotificationManager } from "react-notifications";

// import css 
import "../assets/css/addLiterature.css"
// import bootstrap 
import { Form, Button, Modal } from 'react-bootstrap';
// import Component
import Header from "../components/Header"
// import image 
import attache from "../assets/images/attache.png"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AddLiterature() {

    const [preview, setPreview] = useState(null);
    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let date = new Date().toLocaleDateString("id-ID");
    const day = String(date.split("/")[0]).padStart(2, "0");
    const month = String(date.split("/")[1]).padStart(2, "0");
    const year = date.split("/")[2];
    date = `${day}-${month}-${year}`;

    const [form, setForm] = useState({
        title: "",
        publication_date: date,
        pages: "",
        isbn: "",
        author: "",
        attache: "",
    });

    const handleChange = (e) => {
        setForm((prevState) => ({
          ...prevState,
          [e.target.id]:
            e.target.type === "file" ? e.target.files[0] : e.target.value,
        }));
    
        if (e.target.type === "file") {
          const fileList = e.target.files;
    
          for (const file of fileList) {
            setPreview(URL.createObjectURL(file));
          }
        }
    };

    // handle Add 
    const handleAdd = async () => {
        try {
            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            };
        
            const formData = new FormData();
        
            formData.set("attache", form.attache, form.attache.name);
            formData.set("title", form.title);
            formData.set("publication_date", form.publication_date);
            formData.set("pages", form.pages);
            formData.set("isbn", form.isbn);
            formData.set("author", form.author);
    
            const response = await API.post("/literatures", formData, config);
        
            if (response?.status === 200) {
                setForm({
                  title: "",
                  publication_date: date,
                  pages: "",
                  isbn: "",
                  author: "",
                  attache: "",
                });
        
                setPreview(null);
                setShow(false);
        
                NotificationManager.success(
                  response.data.message,
                  response.data.status,
                  4000,
                  () => {
                    history.push("/profile");
                  }
                );
            } 
        } catch (error) {
            console.log(error.response);
            if (error?.response?.data?.message) {
                return NotificationManager.error(
                error.response.data.message,
                error.response.data.status
                );
            }
        }
    };

    return (
        <>
            <Header />
            <div className="add-literature">
                <h1>Add Literature</h1>
                <Form className="add-form">
                    <Form.Group controlId="title">
                        <Form.Control 
                        id="title"
                        className="form-input" 
                        value={form.title} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Title" 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="publication_date">
                        <Form.Control 
                        id="publication_date"
                        className="form-input" 
                        value={form.publication_date} 
                        onChange={handleChange}
                        type="date" 
                        placeholder="Publication Date" 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="pages">
                        <Form.Control 
                        id="pages"
                        className="form-input" 
                        value={form.pages} 
                        onChange={handleChange}
                        type="text" 
                        placeholder="Pages" 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="isbn">
                        <Form.Control 
                        id="isbn"
                        className="form-input" 
                        value={form.isbn} 
                        onChange={handleChange}
                        type="text" 
                        placeholder="ISBN" 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="author">
                        <Form.Control 
                        id="author"
                        className="form-input" 
                        value={form.author} 
                        onChange={handleChange}
                        type="text" 
                        placeholder="Author" 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="attache" className="fileUpload">
                        <Form.Label>
                            <div className="attache">
                                <p>Attache Book File</p> 
                                <img src={attache} alt="Attache" />
                            </div>
                        </Form.Label>
                        <Form.Control
                        type="file" 
                        id="attache"
                        name="attache"
                        onChange={handleChange}
                        hidden
                        />

                        {preview && (
                            <div>
                                <Document file={preview}>
                                <Page
                                    pageNumber={1}
                                    width={200}
                                    height={250}
                                    className="rounded"
                                />
                                </Document>
                            </div>
                        )}
                    </Form.Group>

                    <Button variant=""  onClick={handleShow}>
                        Add Literature
                    </Button>

                    <Modal show={show} className="modal-add mt-5"> 

                        <Modal.Body className="modal-add-body text-dark">Are you sure you want to add this literature?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="" className="btn-add-no" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="" className="btn-add-yes" onClick={handleAdd}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </Form>
            </div>
        </>
    )
}
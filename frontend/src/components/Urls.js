import { useState, useEffect } from "react"
import { Table, Modal, Form, Button } from "react-bootstrap"
import UrlService from "../services/UrlService.js"
import AlertMessage from "./AlertMessage.js"

const baseUrl = "https://mighty-sands-84969.herokuapp.com/urlShortener/"

const Urls = () => {
    const [originalUrl, setOriginalUrl] = useState("")
    const [urls, setUrls] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState("")
    const [formAlertMessage, setFormAlertMessage] = useState(null)
    const [listAlertMessage, setListAlertMessage] = useState(null)

    useEffect(() => {
        UrlService
            .getUrls()
            .then(initialUrls => {
                setUrls(initialUrls)
            })
    }, [])

    const handleOriginalUrlChange = (event) => {
        setOriginalUrl(event.target.value)
    }

    const handleCreateShortenedUrl = (event) => {
        event.preventDefault()
        console.log(originalUrl)
        const originalUrlObject = {
            originalUrl: originalUrl,
        }
        UrlService.createShortenedUrl(originalUrlObject)
            .then(returnedUrl => {
                setOriginalUrl("")
                setUrls(urls.concat(returnedUrl))
                setFormAlertMessage("Url has been shortened!")
                setTimeout(() => {
                    setFormAlertMessage(null)
                }, 3000)
            })
            .catch((err) => {
                setFormAlertMessage(err.response.data.message)
                setTimeout(() => {
                    setFormAlertMessage(null)
                }, 3000)
                console.log(err)
            })
    }

    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = (event) => {
        setSelectedUrl(event.target.id)
        setShowDelete(true)
    }
    const handleDeleteUrl = (event) => {
        const urlToBeDeleted = event.target.id
        const urlToBeDeletedObject = {
            originalUrl: urlToBeDeleted
        }
        UrlService.deleteUrl(urlToBeDeletedObject)
            .then(() => {
                setUrls(urls.filter(url => url.originalUrl !== urlToBeDeleted))
                setShowDelete(false)
                setSelectedUrl("")
                setListAlertMessage("Url has been deleted!")
                setTimeout(() => {
                    setListAlertMessage(null)
                }, 3000)
            })
            .catch((err) => {
                setListAlertMessage(err.response.data.message)
                setTimeout(() => {
                    setListAlertMessage(null)
                }, 3000)
                console.log(err)
            })
    }

    return (
        <>
            <div className="mb-5">
                <AlertMessage message={formAlertMessage} />
                <h2>Shorten Url</h2>
                <Form onSubmit={handleCreateShortenedUrl}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Url</Form.Label>
                        <Form.Control type="text" placeholder="Enter url" value={originalUrl} onChange={handleOriginalUrlChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Shorten Url</Button>
                </Form>
            </div>
            <div className="mb-3">
                <AlertMessage message={listAlertMessage} />
                <h2>List of Urls</h2>
                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>Original Url</th>
                            <th>Shortened Url</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map(url =>
                            <tr key={url.originalUrl}>
                                <td>
                                    {url.originalUrl}
                                </td>
                                <td>
                                    <a href={baseUrl + url.shortenedUrl}>{baseUrl + url.shortenedUrl}</a>
                                </td>
                                <td className="deleteButton">
                                    <Button variant="danger" id={url.originalUrl} onClick={handleShowDelete}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Modal className="deleteModal" show={showDelete} onHide={handleCloseDelete} keyboard={false} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete "{selectedUrl}"?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>Close</Button>
                        <Button variant="danger" id={selectedUrl} onClick={handleDeleteUrl}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
        
    )
}

export default Urls
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import UrlService from "../services/UrlService.js"
import AlertMessage from "../components/AlertMessage.js"

const CreateShortenedUrl = () => {
    const [originalUrl, setOriginalUrl] = useState("")
    const [alertMessage, setAlertMessage] = useState(null)

    const handleOriginalUrlChange = (event) => {
        setOriginalUrl(event.target.value)
    }

    const handleCreateShortenedUrl = (event) => {
        event.preventDefault()
        const originalUrlObject = {
            originalUrl: originalUrl,
        }
        UrlService.createShortenedUrl(originalUrlObject)
            .then(returnedUrl => {
                setOriginalUrl("")
                setAlertMessage("Url has been shortened!")
                setTimeout(() => {
                    setAlertMessage(null)
                }, 3000)
            })
            .catch((err) => {
                setAlertMessage(err.response.data.message)
                setTimeout(() => {
                    setAlertMessage(null)
                }, 3000)
                console.log(err)
            })
    }

    return (
        <>
            <AlertMessage message={alertMessage} />
            <h2>Shorten Url</h2>
            <Form onSubmit={handleCreateShortenedUrl}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter url" value={originalUrl} onChange={handleOriginalUrlChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Shorten Url</Button>
            </Form>
        </>
    )
}

export default CreateShortenedUrl
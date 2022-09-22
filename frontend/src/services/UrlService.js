import axios from "axios"
const baseUrl = "https://mighty-sands-84969.herokuapp.com/urlShortener/"

const createShortenedUrl = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    return response.data
}

const getUrls = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const deleteUrl = async (newObject) => {
    const request = axios.delete(baseUrl, newObject)
    const response = await request
    return response.data
}

const getOriginalUrl = async (shortenedUrl) => {
    const request = axios.get(`${baseUrl}${shortenedUrl}`)
    const response = await request
    return response.data
}

export default { createShortenedUrl, getUrls, deleteUrl, getOriginalUrl }
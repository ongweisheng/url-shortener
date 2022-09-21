import Url from "../models/url.js"

export async function createShortenedUrl(req, res) {
    try {
        const originalUrl = await Url.findOne(req.body)
        if (originalUrl !== null) {
            throw ({ status: 404, message: "Error! Url has already been shortened" })
        } else {
            const response = await Url.create(req.body)
            res.status(201).json(response)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
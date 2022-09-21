import Url from "../models/url.js"

export async function createShortenedUrl(req, res) {
    try {
        const originalUrl = await Url.findOne(req.body)
        if (originalUrl !== null) {
            throw ({ status: 404, message: "Error! Url has already been shortened!" })
        } else {
            const response = await Url.create(req.body)
            res.status(201).json(response)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getUrls(req, res) {
    try {
        const response = await Url.find()
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteUrl(req, res) {
    try {
        const response = await Url.deleteOne(req.body) // delete by originalUrl or shortenedUrl
        if (response.deletedCount === 0) {
            throw ({ status: 404, message: "Error! Url cannot be deleted or has already been deleted!" })
        } else {
            return res.status(200).json(response)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getOriginalUrl(req, res) {
    try {
        const shortenedUrl = await Url.findOne({ shortenedUrl: req.params.shortenedUrl })
        if (shortenedUrl === null) {
            throw ({ status: 404, message: "Error! Shortened url cannot be found!" })
        } else {
            res.redirect(shortenedUrl.originalUrl)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
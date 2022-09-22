import mongoose from "mongoose"
import { nanoid } from 'nanoid'

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortenedUrl: {
        type: String,
        required: true,
        unique: true,
        default: nanoid,
    }
})

export default mongoose.model("Url", urlSchema)
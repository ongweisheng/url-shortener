import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import app from "../index.js"

chai.use(chaiHttp)
chai.should()

let shortenedUrl

describe("URLs", () => {
    describe("POST/", () => {
        it("Create shortened url successful", (done) => {
            const url = {
                originalUrl: "https://github.com/ongweisheng/url-shortener"
            }
            chai.request(app)
                .post("/urlShortener")
                .send(url)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a("object")
                    res.body.should.have.property("originalUrl")
                    assert.equal(res.body.originalUrl, "https://github.com/ongweisheng/url-shortener")
                    res.body.should.have.property("shortenedUrl")
                    shortenedUrl = res.body.shortenedUrl
                    done()
                })
        })
    })

    describe("GET/", () => {
        it("Get all urls successful", (done) => {
            chai.request(app)
                .get("/urlShortener")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("array")
                    res.body[0].should.have.property("originalUrl")
                    assert.equal(res.body[0].originalUrl, "https://github.com/ongweisheng/url-shortener")
                    res.body[0].should.have.property("shortenedUrl")
                    assert.equal(res.body[0].shortenedUrl, shortenedUrl)
                    done()
                })
        })
    })

    describe("GET/:shortenedUrl", () => {
        it("Get original url successful", (done) => {
            chai.request(app)
                .get(`/urlShortener/${shortenedUrl}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })

    describe("DELETE/:", () => {
        it("Delete url successful", (done) => {
            const url = {
                originalUrl: "https://github.com/ongweisheng/url-shortener"
            }
            chai.request(app)
                .delete("/urlShortener")
                .send(url)
                .end((err, res) => {
                    res.should.have(200)
                    res.body.should.have.property("acknowledged")
                    assert.equal(res.body.acknowledged, true)
                    res.body.should.have.property("deletedCount")
                    assert.equal(res.body.deletedCount, 1)
                    done()
                })
        })
    })
})
const express = require("express")
const app = express()
const port = 3000
const publics = express.static("public")
const axios = require("axios")

app.use(publics)
app.get("/quote", async (req, res) => {
  try {
    const quoteUrl =
      "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    const response = await axios.get(quoteUrl)
    const quoteData = response.data
    console.log(quoteData)
    return res.send(quoteData)
  } catch (e) {
    return res.status(502).send("Failed to get quote")
  }
})

app.listen(port, () => {
  console.log("Listening...")
})

//add a docker container

const contract = require("./contract.js")

const method = require("./method.js")

const express = require('express')

const distribute = require('./distribute.js')

//create a web server
const app = express()

app.use(express.json())

const port = 8080

app.get('/symbol', async(req, res) => {
    res.send(await contract.getSymbol())
})

//add a URL to the web server to do a transfer
app.post('/transfer', async(req, res) => {
    let accountTo = req.body.accountTo
    let amount = req.body.amount

    res.send(await method.transferToken(accountTo, amount))
})

 //use web server to distribute token
 app.get('/distribute', async(req, res) => {
   res.send(await distribute.distribute())
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
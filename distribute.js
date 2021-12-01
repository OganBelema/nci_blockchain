//create a method that will be called by webserver

//in this method:
//read the accounts.txt file
//put the accounts into an array
//get the totalsupply for the token owner 
//calculate 5% of the totalSupply
//loop N times, and execute N transactions transferring the token 

const fs = require("fs")

const BigNumber = require("big-number")

const method = require("./method.js")

const contract = require("./contract.js")

//this sets up my .env file
require('dotenv').config()

//loading environment variables
infuraToken = process.env.INFURA_TOKEN
contractAddress = process.env.CONTRACT_ADDRESS
ownerAddress = process.env.OWNER_METAMASK_ADDRESS
privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex')

const distribute = async() =>  {
    //read in the file
    let distributionAddresses = fs.readFileSync('./accounts.txt', 'utf8').split('\n')
    console.log(`Distribution addresses are: ${distributionAddresses}`)

    //get the balance of the token owner
    let ownerBalance = BigNumber(await contract.getBalanceOfAccount(ownerAddress))
    console.log(`Owner balance is ${ownerBalance}`)

    //get five percent of owner balance
    let fivePercent = ownerBalance.div(20)
    console.log(`Five percent of owner balance is ${fivePercent}`)
}

distribute()
//module.exports = { distribute }
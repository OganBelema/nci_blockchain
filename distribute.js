//create a method that will be called by webserver
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

    //get the symbol of the token
    let tokenSymbol = await contract.getSymbol()

    //get five percent of owner balance
    let fivePercent = ownerBalance.div(20)
    console.log(`Five percent of owner balance is ${fivePercent}`)

    //workout how many addresses in file N
    let numberOfAddresses = distributionAddresses.length
    console.log(`Number of addresses in file is ${numberOfAddresses}`)

    //divide the five percent by N to get the distribution amount
    let distributionAmount = fivePercent.div(numberOfAddresses)
    console.log(`distribution amount per address is ${distributionAmount}`)

    for(i = 0; i < numberOfAddresses; i++) {
        console.log(`About to distribute ${distributionAmount} ${tokenSymbol} tokens to ${distributionAddresses[i]}`)
        //execute a transfer to distribution address 
        await method.transferToken(distributionAddresses[i], distributionAmount)
    }

}

module.exports = { distribute }
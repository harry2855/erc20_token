const {network} = require("hardhat")
const {developmentChains,INITIAL_SUPPLY} = require("../helper-hardhat-config")
const {verify} = require("../verify/verify")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()
    args = [INITIAL_SUPPLY]
    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(ourToken.address, args)
    }
}

module.exports.tags = ["all","token"]


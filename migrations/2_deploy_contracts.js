const RICO = artifacts.require("./RICO.sol");
const Launcher = artifacts.require("./Launcher.sol")
const ContractManager = artifacts.require("./ContractManager.sol")

const name = "BitOne Token";
const symbol = "BTO";
const decimals = 1;

const totalTokenSupply = 400000 * 10 ** 18; // set maximum supply to 400,000.
const bidTokenSupply = totalTokenSupply * 1 / 10
const bidWeiLimit = 100 * 10 ** 18
const now = parseInt(new Date() / 1000)
const bidStartTime = now + 72000; //sec

const podTokenSupply = totalTokenSupply * 90 / 100
const podWeiLimit = 10 ** 18
const podStartTime = now; //sec

const lastSupply = totalTokenSupply * 30 / 100;

const marketMaker = 0x1d0DcC8d8BcaFa8e8502BEaEeF6CBD49d3AFFCDC; // set first market maker's address
const owner = 0x98d6b4d574b1cba14c884e057a2932df4299415b;

module.exports = async function (deployer, network, accounts) {

  // if (network === "development") return; // Don't deploy on tests

  deployer.deploy(RICO).then(() => {
    return deployer.deploy(Launcher)
  }).then(() => {
    return deployer.deploy(ContractManager)
  }).then(async() => {
    // certifiers
    projectOwner = accounts[0]

    rico = await RICO.deployed()
    launcher = await Launcher.deployed()
    cm = await ContractManager.deployed()
    init = await launcher.init(rico.address, cm.address)

    console.log(`RICO: ${rico.address} launcher: ${launcher.address}`)

    // const standardICO = await launcher.standardICO(
    //   name,
    //   symbol,
    //   decimals,
    //   projectOwner, [bidStartTime, bidTokenSupply, bidWeiLimit, lastSupply], [podStartTime, podTokenSupply, podWeiLimit], [projectOwner, owner], [marketMaker, owner]
    // )

    // const simpleICO = await launcher.simpleICO(
    //   name,
    //   symbol,
    //   decimals,
    //   projectOwner, [podStartTime, podTokenSupply, podWeiLimit], [podTokenSupply / 2, podStartTime + 78000]
    // )

  });
}

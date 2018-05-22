const Launcher = artifacts.require("./Launcher.sol")
const RICO = artifacts.require("./RICO.sol")
const MultiSigWalletWithDailyLimit = artifacts.require("./MultiSigWalletWithDailyLimit.sol")

const name = "BitOne Token";
const symbol = "BTO";
const decimals = 1;

const totalTokenSupply = 400000 * 10 ** 18; // set maximum supply to 400,000.
const TokenSupply = totalTokenSupply * 10 / 100
const bidWeiLimit = 100 * 10 ** 18
const now = parseInt(new Date() / 1000)
const bidStartTime = now + 72000; //sec

const podTokenSupply = totalTokenSupply * 90 / 100
const podWeiLimit = (10 ** 18) * 10
const podStartTime = now; //sec

const lastSupply = totalTokenSupply * 30 / 100;

const marketMaker = 0x1d0DcC8d8BcaFa8e8502BEaEeF6CBD49d3AFFCDC; // set first market maker's address
const owner = 0x98d6b4d574b1cba14c884e057a2932df4299415b;
const dailyLimit = 200 * 10 ** 18

module.exports = async function (callback) {

  const rico = await RICO.at(process.env.RICO_ADDR) // ropsten tsetnet
  const launcher = await Launcher.at(process.env.LAUNCHER_ADDR) //ropsten testnet
  const po = await getAccount()

  console.log(`RICO: ${rico.address} launcher: ${launcher.address}`)

  const wallet = await MultiSigWalletWithDailyLimit.new([owner, po], 2, dailyLimit)

  console.log(`MultisigWallet: ${wallet.address}`)

  var newICO;

  newICO = await launcher.simpleICO(
    name,
    symbol,
    decimals,
    wallet.address, [podStartTime, podTokenSupply, podWeiLimit], [podTokenSupply / 2, podStartTime + 78000]
  )

  /**
   *
   * newICO = await launcher.standardICO(
    rico.address,
    name,
    symbol,
    decimals,
    wallet.address,
    0, [bidStartTime, bidTokenSupply, bidWeiLimit, lastSupply], [podStartTime, podTokenSupply, podWeiLimit], [po, owner], [marketMaker]
  )
   */


  console.log(`tx:${newICO.tx}`)

}

function getAccount() {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      const owner = accounts[0]
      resolve(owner)
    })
  })
}

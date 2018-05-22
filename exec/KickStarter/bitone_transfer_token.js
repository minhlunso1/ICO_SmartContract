const RICO = artifacts.require("./RICO.sol")

module.exports = async function (callback) {

  // await rico.tran

  RICO.deployed().then(function(instance) {
    web3.eth.getAccounts(function(error, accounts) {
      // please specifiy account address to transfer token if not transfer with list address
      // var checkAccount = "0x187A90D5C193D57f559410231Bf0a8EE5141272c";
      //var checkAccount = accounts[0];

      var mintEvent = instance.MintToken();
      mintEvent.watch(function(error, result){
            if (!error) {
                if (result.args.operCode == 2)
                  mintEvent.stopWatching();
                else {
                  console.log("user " + result.args.user + " with " + result.args.token);
                  instance.mintToken({gas: "120000", from: accounts[0]}).then(function(v1) {
                      console.log("mint after event throw");
                  });
                }
            } else {
                console.log(error);
            }
      });

      instance.startMintToken({gas: "120000", from: accounts[0]}).then(function(v1) {
          console.log("mint started");
      });

    });
  });
}

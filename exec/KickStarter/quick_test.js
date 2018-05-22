module.exports = async function (callback) {
  web3.eth.getAccounts(function(error, accounts) {
    web3.eth.sendTransaction({from: '0x8bc54872a753fabf687434a5829085224e0f4079',
      to: accounts[0], value: web3.toWei(1, 'ether'),
      gasLimit: 21000, gasPrice: 20000000000});
  });

}

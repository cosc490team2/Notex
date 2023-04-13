const Web3 = require('web3');
const NotexCoinABI = require('./NotexCoinABI.json');

async function sendNotexCoin(amount, receiverAddress) {
  // Connect to Metamask wallet
  const provider = window.ethereum;
  const web3 = new Web3(provider);

  // Set the contract address
  const contractAddress = '0x123456789abcdef'; // Replace with your Notex Coin contract address

  // Retrieve the user's Notex Coin balance
  const notexCoinContract = new web3.eth.Contract(NotexCoinABI, contractAddress);
  const userAddress = await web3.eth.getCoinbase();
  const userBalance = await notexCoinContract.methods.balanceOf(userAddress).call();

  // Set the amount to send (in wei)
  const amountToSend = web3.utils.toWei(amount, 'ether');

  // Ensure the user has enough funds to send the desired amount
  if (userBalance < amountToSend) {
    console.log('Insufficient funds');
    return;
  }

  // Create the transaction object
  const txObj = {
    from: userAddress,
    to: contractAddress,
    gas: 200000,
    gasPrice: web3.utils.toWei('10', 'gwei'),
    value: 0,
    data: notexCoinContract.methods.transfer(receiverAddress, amountToSend).encodeABI(),
  };

  // Sign and send the transaction
  const signedTx = await web3.eth.signTransaction(txObj);
  const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log('Transaction sent:', txHash);
}
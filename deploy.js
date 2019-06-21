const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
   "venture discover yard session arch float since produce diesel olympic dash choose",
   "https://rinkeby.infura.io/v3/442848b3d98d403da4f9753de4df0939");

const  web3 = new Web3(provider);

// const result = await new web3.eth.Contract(JSON.parse(interface))
//      .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
//      .send({from: accounts[0]}); // remove 'gas'

let firstAcc;
console.log('Starting deploy 1');
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts);

    const result = await new web3.eth.Contract(JSON.parse(interface))
         .deploy({data: '0x' + bytecode}) // add 0x bytecode
         .send({from: accounts[0]}); // remove 'gas'

    console.log('Contract deployed to', result.options.address);
};
deploy();

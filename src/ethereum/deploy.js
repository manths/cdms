const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledDepartment = require('./build/DepartmentManagementSystem.json');

const provider = new HDWalletProvider(
  'tomorrow lift menu genuine behave demise loop flower maple rival already piece',
  'https://rinkeby.infura.io/v3/581ac54f78514389adaf2e41b2e0c53e'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledDepartment.interface)
  )
    .deploy({ data: compiledDepartment.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

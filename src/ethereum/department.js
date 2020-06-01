import web3 from './web3';
import DepartmentManagementSystem from './build/DepartmentManagementSystem.json';

const instance = new web3.eth.Contract(
  JSON.parse(DepartmentManagementSystem.interface),
  '0xcAa4f5e1B9270edeD9e2b994FF684212aE03f9eA'
);

export default instance;

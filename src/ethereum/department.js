import web3 from './web3';
import DepartmentManagementSystem from './build/DepartmentManagementSystem.json';

const instance = new web3.eth.Contract(
  JSON.parse(DepartmentManagementSystem.interface),
  '0xA3756c6405D722B29386eF8a5F32FeC430901916'
);

export default instance;

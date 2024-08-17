import { useState } from 'react';
import { ethers } from 'ethers';

// Import your ABIs
import FactoryABI from './FactoryABI.json';
import DeployedContractABI from './DeployedContractABI.json'; // Replace with your deployed contract's ABI

// Your factory contract address
const FACTORY_ADDRESS = '0xB25c274b99049869d5b0d516191534a099bd5bD7'; 

declare global {
  interface Window {
    ethereum?: any;
  }
}

const hexToAddress = (hex: string): string => {
  // Convert the last 40 characters of the hex string to an Ethereum address
  return ethers.getAddress(`0x${hex.slice(-40)}`);
};

export default function DeployAgreementButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({
    freelancerAddress: '',
    projectPrice: '',
    numberOfMilestones: '',
    projectTitle: '',
    projectDescription: ''
  });
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [contractFunctions, setContractFunctions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        return false;
      }
    } else {
      alert('Please install MetaMask!');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isConnected = await connectWallet();
    if (!isConnected) return;

    setIsDeploying(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, signer);

      const tx = await factory.createFreelanceAgreement(
        await signer.getAddress(),
        formData.freelancerAddress,
        ethers.parseEther(formData.projectPrice),
        parseInt(formData.numberOfMilestones),
        formData.projectTitle,
        formData.projectDescription
      );

      const receipt = await tx.wait();
      console.log('Raw receipt:', receipt);


      const logs = receipt.logs;
      if (logs.length > 0) {
        const log = logs.find((log: ethers.Log) => log.topics[0] === ethers.id('AgreementCreated(address,address,uint256,uint256,address,string,string)'));

        if (log) {
          const topics = log.topics;
          // Extract address from the third topic (indexed parameter)
          const deployedContractAddressHex = topics[3];
          const deployedContractAddress = hexToAddress(deployedContractAddressHex);
          
          console.log('Deployed contract address:', deployedContractAddress);
          setContractAddress(deployedContractAddress);
          await fetchContractFunctions(deployedContractAddress);
        } else {
          console.error('AgreementCreated event not found in logs');
        }
      } else {
        console.error('No logs found in receipt');
      }

      console.log('Agreement deployed successfully');
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error deploying agreement:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const fetchContractFunctions = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(address, DeployedContractABI, provider);

      // Extract function names from ABI
      const functionNames = DeployedContractABI.filter((item: any) => item.type === 'function').map((func: any) => func.name);

      if (functionNames.length === 0) {
        console.error('No functions found in the ABI');
      } else {
        console.log('Functions retrieved:', functionNames);
        setContractFunctions(functionNames);
      }
    } catch (error) {
      console.error('Error fetching contract functions:', error);
    }
  };

  const callContractFunction = async (funcName: string) => {
    if (contractAddress) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, DeployedContractABI, signer);

        // Call the function dynamically
        console.log(`Calling function ${funcName}...`);
        const tx = await contract[funcName]();
        await tx.wait();
        console.log(`${funcName} called successfully`);
      } catch (error) {
        console.error(`Error calling ${funcName}:`, error);
      }
    }
  };

  return (
    <div>
      <button onClick={() => setIsFormOpen(true)}>Create New Agreement</button>

      {isFormOpen && (
        <form onSubmit={handleSubmit}>
          <input
            name="freelancerAddress"
            value={formData.freelancerAddress}
            onChange={handleInputChange}
            placeholder="Freelancer Address"
            required
          />
          <input
            name="projectPrice"
            type="number"
            value={formData.projectPrice}
            onChange={handleInputChange}
            placeholder="Project Price (in ETH)"
            required
          />
          <input
            name="numberOfMilestones"
            type="number"
            value={formData.numberOfMilestones}
            onChange={handleInputChange}
            placeholder="Number of Milestones"
            required
          />
          <input
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            placeholder="Project Title"
            required
          />
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Project Description"
            required
          />
          <button type="submit" disabled={isDeploying}>
            {isDeploying ? 'Deploying...' : 'Deploy Agreement'}
          </button>
        </form>
      )}

      {contractAddress && (
        <div>
          <h2>Deployed Contract Address: {contractAddress}</h2>
          {contractFunctions.length > 0 ? (
            contractFunctions.map(funcName => (
              <button key={funcName} onClick={() => callContractFunction(funcName)}>
                Call {funcName}
              </button>
            ))
          ) : (
            <p>No functions available.</p>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import styled from 'styled-components';

import FactoryABI from './FactoryABI.json';
import DeployedContractABI from './DeployedContractABI.json';

const FACTORY_ADDRESS = '0xB25c274b99049869d5b0d516191534a099bd5bD7';
declare global {
  interface Window { 
    ethereum?: any;
  }
}
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

interface DeployAgreementButtonProps {
  freelancerAddress: string;
  onHire: (address: string, functions: string[]) => void;
}

const DeployAgreementButton: React.FC<DeployAgreementButtonProps> = ({ freelancerAddress, onHire }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({
    projectPrice: '',
    numberOfMilestones: '',
    projectTitle: '',
    projectDescription: ''
  });

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
        freelancerAddress,
        ethers.parseEther(formData.projectPrice),
        parseInt(formData.numberOfMilestones),
        formData.projectTitle,
        formData.projectDescription
      );

      const receipt = await tx.wait();
      const log = receipt.logs.find((log: ethers.Log) => log.topics[0] === ethers.id('AgreementCreated(address,address,uint256,uint256,address,string,string)'));

      if (log) {
        const deployedContractAddress = ethers.getAddress(`0x${log.topics[3].slice(-40)}`);
        const functions = await fetchContractFunctions(deployedContractAddress);
        onHire(deployedContractAddress, functions);
      } else {
        console.error('AgreementCreated event not found in logs');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deploying agreement:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const fetchContractFunctions = async (address: string): Promise<string[]> => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(address, DeployedContractABI, provider);

      const functionNames = DeployedContractABI.filter((item: any) => item.type === 'function').map((func: any) => func.name);

      if (functionNames.length === 0) {
        console.error('No functions found in the ABI');
      } else {
        console.log('Functions retrieved:', functionNames);
      }
      return functionNames;
    } catch (error) {
      console.error('Error fetching contract functions:', error);
      return [];
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Hire</Button>

      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create New Agreement"
      >
        <h2>Create New Agreement</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            name="freelancerAddress"
            value={freelancerAddress}
            placeholder="Freelancer Address"
            required
            readOnly
          />
          <Input
            name="projectPrice"
            type="number"
            value={formData.projectPrice}
            onChange={handleInputChange}
            placeholder="Project Price (in ETH)"
            required
          />
          <Input
            name="numberOfMilestones"
            type="number"
            value={formData.numberOfMilestones}
            onChange={handleInputChange}
            placeholder="Number of Milestones"
            required
          />
          <Input
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            placeholder="Project Title"
            required
          />
          <TextArea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Project Description"
            required
          />
          <Button type="submit" disabled={isDeploying}>
            {isDeploying ? 'Deploying...' : 'Deploy Agreement'}
          </Button>
        </Form>
      </StyledModal>
    </>
  );
};

export default DeployAgreementButton;
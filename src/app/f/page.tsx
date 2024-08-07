"use client";
// src/app/freelancer/page.tsx

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface User {
  id: string;
  walletAddress: string;
  userType: string;
  name: string;
  age: string;
  experienceYears: string;
  skills: string;
  portfolioLink: string;
}

const FreelancerPage: React.FC = () => {
  const { address } = useAccount();
  const [freelancer, setFreelancer] = useState<User | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchFreelancer = async () => {
      const res = await fetch('https://dapp-ashy-sigma.vercel.app/api/users');
      const users: User[] = await res.json();

      // Find the logged-in freelancer
      const loggedInFreelancer = users.find(
        user => user.userType === 'freelancer' && user.walletAddress === address
      );
      setFreelancer(loggedInFreelancer || null);
    };

    fetchFreelancer();
  }, [address]);

  if (!address) {
    return <div>Please connect your wallet.</div>;
  }

  if (!freelancer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello {freelancer.name}</h1>
      <p>Age: {freelancer.age}</p>
      <p>Experience: {freelancer.experienceYears} years</p>
      <p>Skills: {freelancer.skills}</p>
      <a href={freelancer.portfolioLink}>Portfolio</a>
      <hr />
    </div>
  );
};

export default FreelancerPage;

// src/app/freelancer/page.tsx
"use client";
import React, { useEffect, useState } from 'react';

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
    const [freelancers, setFreelancers] = useState<User[]>([]);

    useEffect(() => {
        const fetchFreelancers = async () => {
            const res = await fetch('http://localhost:3000/api/users');
            const users: User[] = await res.json();

            // Filter freelancers
            const freelancers = users.filter(user => user.userType === 'freelancer');
            setFreelancers(freelancers);
        };

        fetchFreelancers();
    }, []);

    return (
        <div>
            <h1>Freelancers</h1>
            {freelancers.map((freelancer) => (
                <div key={freelancer.walletAddress || freelancer.id}>
                    <h2>{freelancer.name}</h2>
                    <p>Age: {freelancer.age}</p>
                    <p>Experience: {freelancer.experienceYears} years</p>
                    <p>Skills: {freelancer.skills}</p>
                    <a href={freelancer.portfolioLink}>Portfolio</a>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default FreelancerPage;

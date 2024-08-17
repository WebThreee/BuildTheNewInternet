"use client";
// src/app/freelancer/page.tsx

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ChatPage from "@/components/ChatPage";
import dynamic from 'next/dynamic';
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { JSX, SVGProps } from "react";

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

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
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 to-blue-100 font-sans">
    <MotionDiv
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between border-b bg-white/80 backdrop-blur-sm px-6 py-4 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <MotionDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2">
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </MotionDiv>
        <div className="grid gap-1">
          <h1 className="text-xl font-bold text-gray-800 font-serif">Hello, {freelancer.name}</h1>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <MotionDiv
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: star * 0.1 }}
              >
                <StarIcon
                  className={`h-4 w-4 ${
                    star <= 3 ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-colors">
          Find Gigs
        </Button>
        <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-colors">
          Chat
        </Button>
      </div>
    </MotionDiv>
    <main className="flex-1 grid grid-cols-[1fr_300px] gap-6 p-6">
      <div className="grid gap-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 font-serif">Skills</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {["Web Design", "UI/UX", "Branding", "SEO", "Social Media", "Photography"].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: "Active", badge: "3", items: [
              { name: "Website Design", amount: "$1,200" },
              { name: "Mobile App Development", amount: "$2,500" },
              { name: "Branding", amount: "$800" },
            ]},
            { title: "Completed", badge: "12", items: [
              { name: "Logo Design", amount: "$500" },
              { name: "Social Media Management", amount: "$1,200" },    
              { name: "SEO Optimization", amount: "$800" },
            ]},
            { title: "Payments", badge: "$4,500", items: [
              { name: "Paid", amount: "$3,800" },
              { name: "Pending", amount: "$700" },
            ]},
          ].map((section, index) => (
            <MotionDiv
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow h-[300px] flex flex-col">
                <CardHeader className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">{section.badge}</Badge>
                </CardHeader>
                <CardContent className="flex-grow overflow-auto">
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
      <MotionDiv
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6"
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
            <div>
                <div className="font-medium">Age</div>
                <div className="text-muted-foreground">{freelancer.age}</div>
              </div>
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">San Francisco, CA</div>
              </div>
              <div>
                <div className="font-medium">Hourly Rate</div>
                <div className="text-muted-foreground">$75/hr</div>
              </div>
              <div>
                <div className="font-medium">Availability</div>
                <div className="text-muted-foreground">Full-time</div>
              </div>
              <div>
                <div className="font-medium">Experience</div>
                <div className="text-muted-foreground">{freelancer.experienceYears}</div>
              </div>
              <div>
                <div className="font-medium">Portfolio Link</div>
                <div className="text-muted-foreground">{freelancer.portfolioLink}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
      <ChatPage userType="Freelancer" />;
    </main>
  </div>
  );
};

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default FreelancerPage;

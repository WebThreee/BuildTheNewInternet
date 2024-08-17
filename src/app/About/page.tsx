"use client";
import React from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styling with Styled Components
const Container = styled.div`
  background-color: #121212;
  color: #f5f5f5;
  padding: 3rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
`;

const MemberCard = styled(motion.div)`
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  width: 300px;
  margin: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  &:hover {
    transform: translateY(-10px);
  }
`;

const MemberName = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #ffffff;
`;

const MemberRole = styled.h3`
  color: #aaaaaa;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #f5f5f5;
  margin: 0 10px;
  transition: color 0.3s;
  &:hover {
    color: #1e90ff;
  }
`;

// Motion variants for animations
const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Team member data
const teamMembers = [
  {
    name: 'Lakshya',
    role: 'Project Manager',
    imageUrl: 'https://via.placeholder.com/150',
    mail: 'alice.johnson@example.com',
    linkedin: 'https://www.linkedin.com/in/alice-johnson',
    twitter: 'https://twitter.com/alicejohnson',
  },
  {
    name: 'Kairvee',
    role: 'Lead Developer',
    imageUrl: 'https://via.placeholder.com/150',
    mail: 'bob.smith@example.com',
    linkedin: 'https://www.linkedin.com/in/bob-smith',
    twitter: 'https://twitter.com/bobsmith',
  },
  {
    name: 'Kshitij',
    role: 'UI/UX Designer',
    imageUrl: 'https://via.placeholder.com/150',
    mail: 'charlie.davis@example.com',
    linkedin: 'https://www.linkedin.com/in/charlie-davis',
    twitter: 'https://twitter.com/charliedavis',
  },
];

const AboutUs = () => {
  return (
    <Container>
      <Title initial="hidden" animate="visible" variants={titleVariants}>
        About Us
      </Title>
      <h1>
        Meet the team
      </h1>
      <TeamContainer>
        {teamMembers.map((member) => (
          <MemberCard
            key={member.name}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Avatar src={member.imageUrl} size="150" round={true} />
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            <SocialLinks>
              <SocialIcon href={`mailto:${member.mail}`}>
                <Mail size={24} />
              </SocialIcon>
              <SocialIcon
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </SocialIcon>
              <SocialIcon
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={24} />
              </SocialIcon>
            </SocialLinks>
          </MemberCard>
        ))}
      </TeamContainer>
    </Container>
  );
};

export default AboutUs;

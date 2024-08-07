"use client";
import React, { useEffect, useState } from 'react';
import { FaUser, FaBirthdayCake, FaBriefcase, FaTools, FaExternalLinkAlt, FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Chip, Avatar, TextField, Select, MenuItem, InputLabel, FormControl, AppBar, Toolbar, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '@/components/footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

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
    const [searchTerm, setSearchTerm] = useState('');
    const [skillFilter, setSkillFilter] = useState('');

    useEffect(() => {
        const fetchFreelancers = async () => {
            const res = await fetch('https://dapp-ashy-sigma.vercel.app/api/users');
            const users: User[] = await res.json();
            const freelancers = users.filter(user => user.userType === 'freelancer');
            setFreelancers(freelancers);
        };

        fetchFreelancers();
    }, []);

    const filteredFreelancers = freelancers.filter(freelancer => 
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (skillFilter === '' || freelancer.skills.toLowerCase().includes(skillFilter.toLowerCase()))
    );

    return (
        <ThemeProvider theme={theme}>
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Find Your Perfect Freelancer
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
                    Connect with skilled professionals for your next project
                </Typography>
                
                <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <TextField
                        label="Search freelancers"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <FaSearch style={{ marginRight: '8px' }} />,
                        }}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel>Filter by skill</InputLabel>
                        <Select
                            value={skillFilter}
                            onChange={(e) => setSkillFilter(e.target.value as string)}
                            label="Filter by skill"
                        >
                            <MenuItem value="">All Skills</MenuItem>
                            <MenuItem value="React">React</MenuItem>
                            <MenuItem value="Node.js">Node.js</MenuItem>
                            <MenuItem value="Python">Python</MenuItem>
                            <MenuItem value="Design">Design</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Typography variant="h4" component="h3" gutterBottom sx={{ mt: 6, mb: 3 }}>
                    Available Freelancers ({filteredFreelancers.length})
                </Typography>

                <Grid container spacing={4}>
                    {filteredFreelancers.map((freelancer) => (
                        <Grid item xs={12} sm={6} md={4} key={freelancer.walletAddress || freelancer.id}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Card elevation={3}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                                                <FaUser size={30} />
                                            </Avatar>
                                            <Typography variant="h5" component="h2">
                                                {freelancer.name}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <FaBirthdayCake style={{ marginRight: '8px' }} />
                                            <Typography variant="body2">Age: {freelancer.age}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <FaBriefcase style={{ marginRight: '8px' }} />
                                            <Typography variant="body2">Experience: {freelancer.experienceYears} years</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="flex-start" mb={2}>
                                            <FaTools style={{ marginRight: '8px', marginTop: '4px' }} />
                                            <Box>
                                                <Typography variant="body2" mb={1}>Skills:</Typography>
                                                {freelancer.skills.split(',').map((skill, index) => (
                                                    <Chip key={index} label={skill.trim()} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                                ))}
                                            </Box>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<FaExternalLinkAlt />}
                                                href={freelancer.portfolioLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Portfolio
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                Hire
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Why Choose FreelancerHub?
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Verified Professionals
                            </Typography>
                            <Typography variant="body1">
                                All our freelancers are thoroughly vetted to ensure top-quality service.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Secure Payments
                            </Typography>
                            <Typography variant="body1">
                                Our blockchain-based system ensures safe and transparent transactions.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                24/7 Support
                            </Typography>
                            <Typography variant="body1">
                                Our dedicated team is always ready to assist you with any queries.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
           <Footer />
        </ThemeProvider>
    );
};

export default FreelancerPage;
import React from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const FunctionButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

interface DashboardProps {
  freelancerName: string;
  contractAddress: string | null;
  contractFunctions: string[];
  onCallFunction: (funcName: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  freelancerName,
  contractAddress,
  contractFunctions,
  onCallFunction,
}) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom>
        Project Dashboard
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">Freelancer: {freelancerName}</Typography>
      </Box>
      {contractAddress ? (
        <>
          <Box mb={2}>
            <Typography variant="subtitle1">Contract Address:</Typography>
            <Typography variant="body1" style={{ wordBreak: 'break-all' }}>
              {contractAddress}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Contract Functions:
            </Typography>
            <Grid container spacing={1}>
              {contractFunctions.map((funcName) => (
                <Grid item key={funcName}>
                  <FunctionButton
                    variant="contained"
                    color="primary"
                    onClick={() => onCallFunction(funcName)}
                  >
                    {funcName}
                  </FunctionButton>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Typography variant="body1">No contract deployed yet.</Typography>
      )}
    </StyledPaper>
  );
};

export default Dashboard;
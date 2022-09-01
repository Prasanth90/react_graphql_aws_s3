import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AddIcon from '@mui/icons-material/Add';

export interface AppBarProps {
  onAddScoreClicked: () => void;
}

export const ScoresAppBar: React.FC<AppBarProps> = ({ onAddScoreClicked }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" style={{ color: 'inherit' }} aria-label="menu">
            <SportsScoreIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'inherit' }}>
            Ping Pong Scores
          </Typography>
          <Button onClick={onAddScoreClicked} color="inherit">
            <AddIcon style={{ marginRight: 8 }} />
            ADD NEW RESULT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

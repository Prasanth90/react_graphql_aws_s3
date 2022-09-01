import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

export interface AppBarProps {
  onAddScoreClicked: () => void;
}

export const ScoresAppBar: React.FC<AppBarProps> = ({ onAddScoreClicked }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ background: 'white' }}>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <SportsScoreIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            Scores
          </Typography>
          <Button onClick={onAddScoreClicked} variant="contained">
            ADD NEW RESULT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

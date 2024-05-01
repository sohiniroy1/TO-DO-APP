import React from 'react';
import { Typography, FormGroup, FormControlLabel, Switch, Divider, MenuItem, Select } from '@mui/material';

const SettingsTab = ({ darkMode, onThemeChange }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Settings
      </Typography>
      <Divider />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={onThemeChange} />}
          label="Dark Theme"
        />
      </FormGroup>
    </div>
  );
};

export default SettingsTab;

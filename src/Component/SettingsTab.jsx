import React, { useState } from 'react';
import { Typography, FormGroup, FormControlLabel, Switch, Divider, MenuItem, Select } from '@mui/material';

const SettingsTab = ({ darkMode, onThemeChange }) => {
  const [fontStyle, setFontStyle] = useState('normal');

  const handleFontStyleChange = (event) => {
    setFontStyle(event.target.value);
  };

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
        <Select
          value={fontStyle}
          onChange={handleFontStyleChange}
          style={{ marginTop: '10px', width: '100%' }}
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="italic">Italic</MenuItem>
          <MenuItem value="oblique">Oblique</MenuItem>
        </Select>
      </FormGroup>
    </div>
  );
};

export default SettingsTab;

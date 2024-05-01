import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const CompletedTasksTab = ({ tasks, onDeleteCompletedTask }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemText primary={task.name} secondary={task.description} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => onDeleteCompletedTask(index)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default CompletedTasksTab;

import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, TextField } from '@mui/material';
import { Edit, Delete, Done } from '@mui/icons-material';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onMarkTaskAsCompleted }) => {
  const [editIndex, setEditIndex] = React.useState(-1);
  const [editedName, setEditedName] = React.useState('');
  const [editedDescription, setEditedDescription] = React.useState('');

  const handleEdit = (index, name, description) => {
    setEditIndex(index);
    setEditedName(name);
    setEditedDescription(description);
  };

  const handleSave = (index) => {
    onEditTask(index, editedName, editedDescription);
    setEditIndex(-1);
    setEditedName('');
    setEditedDescription('');
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditedName('');
    setEditedDescription('');
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          {editIndex === index ? (
            <>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <TextField
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <Button onClick={() => handleSave(index)}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <ListItemText primary={task.name} secondary={task.description} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleEdit(index, task.name, task.description)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDeleteTask(index)}>
                  <Delete />
                </IconButton>
                {!task.completed && (
                  <Button onClick={() => onMarkTaskAsCompleted(index)} startIcon={<Done />}>
                    Mark as Completed
                  </Button>
                )}
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;

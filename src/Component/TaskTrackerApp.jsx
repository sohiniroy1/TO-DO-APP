import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Tab,
  Tabs,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import CompletedTasksTab from './CompletedTasksTab';
import SettingsTab from './SettingsTab';
import { CheckCircleOutline as CheckCircleOutlineIcon, PlaylistAddCheck as PlaylistAddCheckIcon, Settings as SettingsIcon } from '@mui/icons-material';

const TaskTrackerApp = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEditTask = (index, editedName, editedDescription) => {
    const newTasks = [...tasks];
    newTasks[index] = { name: editedName, description: editedDescription };
    setTasks(newTasks);
  };

  const handleMarkTaskAsCompleted = (index) => {
    const newTasks = [...tasks];
    const completedTask = newTasks.splice(index, 1)[0];
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleDeleteCompletedTask = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1A237E', // Change the primary color to dark blue
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Task Tracker
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <IconButton onClick={handleThemeChange} sx={{ color: 'inherit' }}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton> */}
          </Stack>
        </Toolbar>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab
            icon={<PlaylistAddCheckIcon />}
            label="Tasks"
            sx={{ fontWeight: 'semibold', display: 'flex', alignItems: 'center', gap: '8px' }}
          />
          <Tab
            icon={<CheckCircleOutlineIcon />}
            label="Completed Tasks"
            sx={{ fontWeight: 'semibold', display: 'flex', alignItems: 'center', gap: '8px' }}
          />
          <Tab
            icon={<SettingsIcon />}
            label="Settings"
            sx={{ fontWeight: 'semibold', display: 'flex', alignItems: 'center', gap: '8px' }}
          />
        </Tabs>
      </AppBar>
      <Container sx={{ mt: 8 }}>
        <Box sx={{ bgcolor: darkMode ? '#333' : '#f4f4f4', p: 3, borderRadius: 8 }}>
          {tabValue === 0 && (
            <>
              <TaskForm onAddTask={handleAddTask} />
              <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onMarkTaskAsCompleted={handleMarkTaskAsCompleted}
              />
            </>
          )}
          {tabValue === 1 && (
            <CompletedTasksTab tasks={completedTasks} onDeleteCompletedTask={handleDeleteCompletedTask} />
          )}
          {tabValue === 2 && <SettingsTab darkMode={darkMode} onThemeChange={handleThemeChange} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TaskTrackerApp;

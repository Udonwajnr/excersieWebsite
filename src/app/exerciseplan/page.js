'use client';
// App.js
import React, { useState } from 'react';
import ExerciseForm from '../components/ExerciseForm';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

function App() {
  const [workoutPlan, setWorkoutPlan] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Customized Workout Plan
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <ExerciseForm onResults={(data) => setWorkoutPlan(data.result)} />
      </Paper>

      {workoutPlan && (
        <Box mt={8}>
          <Typography variant="h5" gutterBottom>
            Your {workoutPlan.total_weeks}-Week Workout Plan:
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Goal:</strong> {workoutPlan.goal}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Fitness Level:</strong> {workoutPlan.fitness_level}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Days per Week:</strong> {workoutPlan.schedule.days_per_week}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Session Duration:</strong> {workoutPlan.schedule.session_duration} minutes
          </Typography>

          {workoutPlan.exercises && workoutPlan.exercises.length > 0 ? (
            <Grid container spacing={4} mt={4}>
              {workoutPlan.exercises.map((dayPlan, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {dayPlan.day}
                      </Typography>
                      <List>
                        {dayPlan.exercises.map((exercise, i) => (
                          <ListItem key={i} sx={{ display: 'block' }}>
                            <ListItemText
                              primary={
                                <>
                                  <strong>{exercise.name}</strong> - {exercise.duration}
                                </>
                              }
                              secondary={
                                <>
                                  {exercise.repetitions !== 'N/A' && (
                                    <span>Reps: {exercise.repetitions}</span>
                                  )}
                                  {exercise.sets !== 'N/A' && (
                                    <span>, Sets: {exercise.sets}</span>
                                  )}
                                  {exercise.equipment !== 'N/A' && (
                                    <span>, Equipment: {exercise.equipment}</span>
                                  )}
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No exercises found in the plan.</Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

export default App;

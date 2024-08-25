'use client'
import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Typography,
} from '@mui/material';

export default function ExerciseForm({ onResults }) {
  const [goal, setGoal] = useState('weight_loss');
  const [fitnessLevel, setFitnessLevel] = useState('intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [sessionDuration, setSessionDuration] = useState(45);
  const [planDuration, setPlanDuration] = useState(4);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      goal,
      fitness_level: fitnessLevel,
      preferences: {
        exercise_types: ['cardio', 'strength'],
        equipment_available: ['dumbbells', 'yoga_mat'],
      },
      health_conditions: ['knee_pain'],
      schedule: {
        days_per_week: daysPerWeek,
        session_duration: sessionDuration,
      },
      lang: 'en',
      plan_duration_weeks: planDuration,
    };

    try {
      const response = await axios.post(
        'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan?noqueue=1',
        requestBody,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY, // Replace with your actual API key
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        }
      );

      onResults(response.data); // Pass the response data to the parent component
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching workout plan:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Create Your Workout Plan
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Goal</InputLabel>
          <Select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            label="Goal"
          >
            <MenuItem value="weight_loss">Weight Loss</MenuItem>
            <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
            <MenuItem value="endurance">Endurance</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Fitness Level</InputLabel>
          <Select
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            label="Fitness Level"
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Days per Week"
          type="number"
          value={daysPerWeek}
          onChange={(e) => setDaysPerWeek(e.target.value)}
          fullWidth
        />

        <TextField
          label="Session Duration (minutes)"
          type="number"
          value={sessionDuration}
          onChange={(e) => setSessionDuration(e.target.value)}
          fullWidth
        />

        <TextField
          label="Plan Duration (weeks)"
          type="number"
          value={planDuration}
          onChange={(e) => setPlanDuration(e.target.value)}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Get Workout Plan
        </Button>
      </Box>
    </Paper>
  );
}

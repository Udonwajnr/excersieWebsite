"use client"
import React, { useState } from 'react';
import { Box } from '@mui/material';

import Exercises from './components/Exercises';
import SearchExercises from './components/SearchExercises';
import HeroBanner from './components/HeroBanner';
import Container from './components/Container';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Container>
      <Box>
        <HeroBanner />
        <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} /> 
      </Box>
    </Container>
  );
};

export default Home;

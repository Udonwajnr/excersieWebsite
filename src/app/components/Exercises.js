"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6; // No need to use state for a constant value

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const endpoint =
          bodyPart === "all"
            ? "https://exercisedb.p.rapidapi.com/exercises"
            : `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;

        const exercisesData = await fetchData(endpoint, exerciseOptions);
        setExercises(exercisesData);
      } catch (error) {
        console.error("Failed to fetch exercises data:", error);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise) || [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  if (!exercises.length) return <Loader />;

  console.log(exercises)
  return (
    <Box id="exercises" sx={{ mt: { lg: "109px" }, p: "20px" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { lg: "44px", xs: "30px" }, mb: "46px" }}
      >
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      {exercises.length > exercisesPerPage && (
        <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
          />
        </Stack>
      )}
    </Box>
  );
};

export default Exercises;

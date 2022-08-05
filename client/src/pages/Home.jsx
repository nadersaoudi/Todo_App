import { Box } from "@mui/material";
import { useState } from 'react'
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from 'react-redux'
import { setBoards } from '../redux/features/boadSlice'
import { useNavigate } from 'react-router-dom'
import boardApi from "../api/boardApi";
const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const createBoard = async () => {
    try {
      const res = await boardApi.create()
      dispatch(setBoards([res]))
      navigate(`/boards/${res.id}`)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton variant="outlined" color="info" onClick={createBoard} loading={loading}>
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
};

export default Home;

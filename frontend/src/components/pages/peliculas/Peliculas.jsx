import React, { useEffect, useState } from "react";
import axios from "axios";

import confetti from "canvas-confetti";
import styles from "./Peliculas.module.css";
import CreateMovieModal from "../../common/createMovieModal/CreateMovideModal";
import Pelicula from "./Pelicula";
import Header from "../../common/header/Header";
import { useNavigate } from "react-router-dom";

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [isFavoritos, setIsFavoritos] = useState(false);
  const [isMovieCreate, setIsMovieCreate] = useState(false);
  const [isMovieDelete, setIsMovieDelete] = useState(false);

  useEffect(() => {
    axios
      .get("https://pelisbackend.vercel.app/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.log(error));

    setIsMovieCreate(false);
    setIsMovieDelete(false);
  }, [isMovieCreate, isMovieDelete]);

  const handleLike = async (movieId) => {
    try {
      const response = await axios.patch(`https://pelisbackend.vercel.app/movies/${movieId}`, {
        isliked: !movies.find(movie => movie.id === movieId).isliked
      });

      const updatedMovies = movies.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, isliked: !movie.isliked };
        }
        return movie;
      });

      setMovies(updatedMovies);

      if (!response.data.isliked) {
        confetti({
          zindex: 999,
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovieById = async (id) => {
    try {
      await axios.delete(`https://pelisbackend.vercel.app/movies/${id}`);
      setIsMovieDelete(true);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOpenModal = () => {
    setIsMovieCreate(true);
  };

  const filteredMovies = isFavoritos ? movies.filter(movie => movie.isliked) : movies;

  return (
    <>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <Header setIsFavoritos={setIsFavoritos} handleOpen={handleOpenModal} />

      <CreateMovieModal
        open={open}
        handleClose={() => setIsMovieCreate(false)}
        setIsMovieCreate={setIsMovieCreate}
      />

      <div className={styles.containerCard}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Pelicula
              movie={movie}
              key={movie.id}
              handleLike={handleLike}
              deleteMovieById={deleteMovieById}
            />
          ))
        ) : (
          <p>No hay películas disponibles.</p>
        )}
      </div>
    </>
  );
};

export default Peliculas;

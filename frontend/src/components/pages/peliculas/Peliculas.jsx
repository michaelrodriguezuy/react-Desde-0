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

    setIsMovieDelete(false);
  }, [isMovieDelete]);

  const handleLike = async (movieId) => {
    try {
      const movieToUpdate = movies.find(movie => movie.id === movieId);
      if (!movieToUpdate) {
        console.error(`Movie with id ${movieId} not found.`);
        return;
      }
  
      const isCurrentlyLiked = movieToUpdate.isliked;
  
      const response = await axios.patch(`https://pelisbackend.vercel.app/movies/${movieId}`, {
        isliked: !isCurrentlyLiked
      });
  
      const updatedMovies = movies.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, isliked: !isCurrentlyLiked };
        }
        return movie;
      });
  
      setMovies(updatedMovies);
  
      if (!isCurrentlyLiked) { // Si previamente no estaba en favoritos
        confetti({
          zIndex: 999,
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

  const handleCloseModal = () => {
    setIsMovieCreate(false);
  };

  const filteredMovies = isFavoritos ? movies.filter(movie => movie.isliked) : movies;

  return (
    <>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <Header setIsFavoritos={setIsFavoritos} handleOpen={handleOpenModal} />

      <CreateMovieModal
        open={isMovieCreate}
        handleClose={handleCloseModal}
        setIsMovieCreate={setIsMovieCreate}
      />

      <div className={styles.containerCard}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Pelicula
              movie={movie}
              key={movie.id}
              handleLike={() => handleLike(movie.id)} // Pasamos solo el ID de la película
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

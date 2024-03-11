import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import confetti from "canvas-confetti";
import styles from "./Peliculas.module.css";
import CreateMovieModal from "../../common/createMovieModal/CreateMovideModal";
import Pelicula from "./Pelicula";
import Header from "../../common/header/Header";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [isLiked, setIsLiked] = useState(false); //lo uso como bandera, para que cuando cambie el estado de isLiked, se vuelva a renderizar el componente

  const [isFavoritos, setIsFavoritos] = useState(false); //este estado existe para saber si yo le di click al boton de favoritos o no, y en base a esto muestro el arreglo movies (todos) o moviesFiltro (favoritos)

  //estas 3 funciones las uso para el modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isMovieCreate, setIsMovieCreate] = useState(false);

  //creo esta variable para saber si se elimino una peli, y asi volver a renderizar el componente llamando al useEffect
  const [isMovieDelete, setIsMovieDelete] = useState(false);

  useEffect(() => {
    axios
    //   .get("http://localhost:4000")
       .get("https://pelisbackend.vercel.app/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.log(error));

    setIsLiked(false);
    setIsMovieCreate(false);
    setIsMovieDelete(false);
  }, [isLiked, isMovieCreate, isMovieDelete]);
  //si el estado de isLiked cambia o se agrega/elimino una peli, se vuelve a ejecutar el useEffect

  const handleLike = (movie) => {
    if (!movie.isliked) {
      confetti({
        zindex: 999,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  
    axios
      .patch(`https://pelisbackend.vercel.app/movies/${movie.id}`, {
        isliked: !movie.isliked,
      })
      .then((response) => {
        // Actualiza el estado con el valor actualizado de isLiked de la respuesta
        console.log("isLiked: ",response.data.isliked);
        setIsLiked(response.data.isliked);
      })
      .catch((error) => console.log(error));
  };
  

  const moviesArray = Array.isArray(movies) ? movies : [];

  const moviesFiltro = isFavoritos
    ? moviesArray.filter((movie) => movie.isliked)
    : moviesArray;

  const deleteMovieById = (id) => {
    axios
      .delete(`https://pelisbackend.vercel.app/movies/${id}`)
      .then((response) => setIsMovieDelete(true))
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <Header setIsFavoritos={setIsFavoritos} handleOpen={handleOpen} />

      <CreateMovieModal
        open={open}
        handleClose={handleClose}
        setIsMovieCreate={setIsMovieCreate}
      />

      <div className={styles.containerCard}>
        {movies && movies.length > 0 ? (
          !isFavoritos ? (
            movies.map((movie) => (
              <Pelicula
                movie={movie}
                key={movie.id}
                handleLike={handleLike}
                deleteMovieById={deleteMovieById}
              />
            ))
          ) : (
            moviesFiltro.map((movie) => (
              <Pelicula
                movie={movie}
                key={movie.id}
                handleLike={handleLike}
                deleteMovieById={deleteMovieById}
              />
            ))
          )
        ) : (
          <p>No hay películas disponibles.</p>
        )}
      </div>
    </>
  );
};

export default Peliculas;

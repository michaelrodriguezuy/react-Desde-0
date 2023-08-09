import React, { useEffect, useState } from 'react'
import axios from 'axios'

import confetti from 'canvas-confetti';
import styles from './Peliculas.module.css'
import CreateMovieModal from '../../common/createMovieModal/CreateMovideModal';
import Pelicula from './Pelicula';
import Header from '../../common/header/Header';

const Peliculas = () => {

    const [movies, setMovies] = useState([])
    const [isLiked, setIsLiked] = useState(false) //lo uso como bandera, para que cuando cambie el estado de isLiked, se vuelva a renderizar el componente

    const [isFavoritos, setIsFavoritos] = useState(false); //este estado existe para saber si yo le di click al boton de favoritos o no, y en base a esto muestro el arreglo movies (todos) o moviesFiltro (favoritos)

    //estas 3 funciones las uso para el modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isMovieCreate, setIsMovieCreate] = useState(false);

    //creo esta variable para saber si se elimino una peli, y asi volver a renderizar el componente llamando al useEffect
    const [isMovieDelete, setIsMovieDelete] = useState(false);

    useEffect(() => {

        axios.get("http://localhost:4000/movies")
            .then(response => setMovies(response.data))
            .catch(error => console.log(error))

        setIsLiked(false); //una vez renderizado el componente, isLiked vuelve a ser false
        setIsMovieCreate(false) //una vez renderizado el componente, isMovieCreate vuelve a ser false
        setIsMovieDelete(false) //una vez renderizado el componente, isMovieDelete vuelve a ser false
    }, [isLiked, isMovieCreate, isMovieDelete]); //si el estado de isLiked cambia o se agrega/elimino una peli, se vuelve a ejecutar el useEffect

    const handleLike = (movie) => {

        if (!movie.isLiked) {
            confetti({
                zindex: 999,
                particleCount: 100, //cantidad de papelitos
                spread: 70, //cuanto se esparcen
                origin: { y: 0.6 } //desde donde salen
            });
        }


        axios.patch(`http://localhost:4000/movies/${movie.id}`, { isLiked: !movie.isLiked })

            .then(response => setIsLiked(response)) //en esta peticion traigo el nuevo valor de isLiked
            .catch(error => console.log(error))
    }

    const moviesFiltro = movies.filter(movie => movie.isLiked) //filtro las pelis que me gustan

    const deleteMovieById = (id) => {
        axios.delete(`http://localhost:4000/movies/${id}`)
            .then(response => setIsMovieDelete(true))
            .catch(error => console.log(error))
    }

    return (
        <>
            <Header setIsFavoritos={setIsFavoritos} handleOpen={handleOpen} />
            
            <CreateMovieModal open={open} handleClose={handleClose} setIsMovieCreate={setIsMovieCreate} />

            <div className={styles.containerCard}>
                {
                    !isFavoritos ? (movies.map((movie) => {
                        return <Pelicula movie={movie} key={movie.id} handleLike={handleLike} deleteMovieById={deleteMovieById} />
                        
                    })) : moviesFiltro.map((movie) => {
                        return <Pelicula movie={movie} key={movie.id} handleLike={handleLike} deleteMovieById={deleteMovieById} />
                    })
                }

            </div>

        </>
    )
}

export default Peliculas
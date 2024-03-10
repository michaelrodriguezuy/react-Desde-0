import React from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import {useFormik} from 'formik'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateMovieModal = ({ open, handleClose, setIsMovieCreate }) => {

    let x = {   
        title: '',
        createdAt: '',
        description: '',
        genre: '',
        img: ''
    }

    //esta funcion se ejecuta cuando se hace el envio del formulario
    const enviarDatosBackend=(data)=>{
        
        let arg={
            //estas variables deben llamarse igual que el backend
            name: data.title,
            description: data.description,
            createdAt: data.createdAt,            
            img: data.img,        
            genre: data.genre,   
            isLiked: false //por defecto, cuando creo una peli, no me gusta
        }

        axios.post("https://pelisbackend-3hcd72i0w-michaelrodriguezuy.vercel.app/movies", arg)
        .then(res => {
            handleClose() //codigo 201 significa que se creo correctamente, por lo tanto cierro el modal
            
            setIsMovieCreate(true) //esta variable la uso para que se vuelva a renderizar el componente Home.jsx
            })
        .catch(err => console.log(err))
    }

    //la etiqueta handleChange es la que se encarga de actualizar el estado de los inputs
    //la etiqueta handleSubmit es la que se encarga de hacer el envio del formulario
    const {handleChange, handleSubmit} = useFormik({
        initialValues: x,
        /* validationSchema: Yup.object({
            title: Yup.string().required('El titulo es obligatorio'),
            date: Yup.string().required('La fecha es obligatoria'),
            description: Yup.string().required('La descripción es obligatoria'),
            image: Yup.string().required('La imagen es obligatoria')
        }),  */
        onSubmit: enviarDatosBackend
    })
    
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form style={
                        { display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '30em' }
                    } onSubmit={handleSubmit}>
                        <Typography variant='h6' color='primary' align='center'>Agregar pelicula</Typography>

                        <TextField id="outlined-basic" label="Titulo de la película" variant="outlined" name="title" onChange={handleChange} fullWidth/>
                        <TextField id="outlined-basic" label="Fecha de creación" variant="outlined" name="createdAt" onChange={handleChange} fullWidth/>
                        <TextField id="outlined-basic" label="Descripción" variant="outlined" name="description" onChange={handleChange} fullWidth/>
                        <TextField id="outlined-basic" label="Género" variant="outlined" name="genre" onChange={handleChange} fullWidth/>
                        <TextField id="outlined-basic" label="Adjuntar url de la imagen" variant="outlined" name="img" onChange={handleChange} fullWidth/>

                        <Button variant='contained' color='primary' type='submit'>Agregar</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateMovieModal
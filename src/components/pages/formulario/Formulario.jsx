import { Link } from 'react-router-dom'
import { Typography, TextField, Button, Grid } from '@mui/material'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import './Formulario.css'

const Formulario = () => {

    let valoresIniciales = {
        nombre: "",
        email: "",
        contraseña: ""
    };
    
     const validarForm = Yup.object({
            
            nombre: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string().email("El email no es válido").required("El email es obligatorio"),
            contraseña: Yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres")
        }) 

    const enviarForm = (data) => {
        //envio la data al backend
        console.log(data);
    }
    
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: valoresIniciales,
        validationSchema: validarForm,        
        onSubmit: enviarForm
    })

    return (
        <>
            <Link to="/">Ir al Home</Link>

            <Typography color="primary" variant="h2" align='center'>Formulario de registro</Typography>
            <form className='form-container' onSubmit={handleSubmit}>
                <Grid container alignItems="center" justifyContent="space-evenly" spacing={1} sx={{ width: "100%" }}>

                    <Grid item xs="12" md="7" >
                        <TextField type='text' label="Ingrese su nombre" variant="outlined" fullWidth name="nombre" onChange={handleChange} helperText={errors.nombre || ''} value={values.nombre} error={!!errors.nombre}/>
                        
                    </Grid>

                    <Grid item xs="12" md="7" >
                        <TextField type='email' label="Ingrese su email" variant="outlined" fullWidth name="email" onChange={handleChange} helperText={errors.email || ''} value={values.email} error={!!errors.email}/>
                    </Grid>
                    <Grid item xs="12" md="7" >

                        <TextField type='password' label="Ingrese su contraseña" variant="outlined" fullWidth name="contraseña" onChange={handleChange} helperText={errors.contraseña || ''} value={values.contraseña} error={!!errors.contraseña}/>
                    </Grid>

                </Grid>
                <Button type='submit' variant="contained" color="primary">Enviar</Button>
            </form>
        </>
    )
}

export default Formulario
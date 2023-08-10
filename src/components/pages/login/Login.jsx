import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Grid, TextField, Typography } from '@mui/material';

import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext';

import './Login.css'

const Login = () => {

  const { userData, setUserData } = useContext(AuthContext)
  const navigate = useNavigate()

  let valoresIniciales = {
    nombre: "",
    contraseña: ""
  };

  const validarForm = Yup.object({

    nombre: Yup.string().required("El nombre es obligatorio"),
    contraseña: Yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres")
  })

  const enviarForm = (data) => {
    //envio la data al backend    
    setUserData({
      ...userData,
      nombre: data.nombre,
      contraseña: data.contraseña
    })
    console.log(userData);

    //al margen de que me lleve directo a peliculas, voy a poder ingresar directamente, siempre y cuando el token sea true
    localStorage.setItem('token',"true")

    //me lleva directo a peliculas
    navigate('/peliculas')
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: valoresIniciales,
    validationSchema: validarForm,
    onSubmit: enviarForm
  })

  return (
    <>
      <Link to="/">Ir al Home</Link>


      <Typography color="primary" variant="h2" align='center'>Login</Typography>
      <form className='form-container' onSubmit={handleSubmit}>
        <Grid container alignItems="center" justifyContent="space-evenly" spacing={1} sx={{ width: "100%" }}>

          <Grid item xs="12" md="7" >
            <TextField type='text' label="Ingrese su nombre" variant="outlined" fullWidth name="nombre" onChange={handleChange} helperText={errors.nombre || ''} value={values.nombre} error={!!errors.nombre} />

          </Grid>


          <Grid item xs="12" md="7" >

            <TextField type='password' label="Ingrese su contraseña" variant="outlined" fullWidth name="contraseña" onChange={handleChange} helperText={errors.contraseña || ''} value={values.contraseña} error={!!errors.contraseña} />
          </Grid>

        </Grid>
        <Button type='submit' variant="contained" color="primary">Enviar</Button>
      </form>

    </>
  )
}

export default Login
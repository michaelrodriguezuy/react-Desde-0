import { Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const Header = ({setIsFavoritos, handleOpen}) => {   
    
    //lo uso para mostrar el nombre del usuario logueado
    const {userData}=useContext(AuthContext)

    return (
        <div style={{
            backgroundColor: 'black',
            display: "flex",
            justifyContent: 'space-between',
            width: "100%",
            padding: "1rem",
            alignItems: "center",
        }}>                        
               <Link to="/" >HOME </Link>
                <Typography variant="title" fontSize={12} fontWeight={700} textTransform={'uppercase'}  color="primary"  align="center" > Bienvenido {userData.nombre} </Typography>
                <Link to="/login" > CERRAR SESION</Link>


            <Typography variant="title" fontSize={54} fontWeight={700} textTransform={'uppercase'}  color="primary"  align="center" > Películas </Typography>
            <div style={{display: "flex", justifyContent:"center", gap: "1rem"}}>
               
                <Button variant="contained" color="primary" onClick={()=>handleOpen(true)}>Agregar</Button>
               <Button variant="contained" color="primary" onClick={()=>setIsFavoritos(false)}>Todos</Button>
               <Button variant="contained" color="primary" onClick={()=>setIsFavoritos(true)}>Favoritos</Button>

            {/* luego se llamara cerrar sesion */}
               </div>             
            
        </div>
    )
}

export default Header
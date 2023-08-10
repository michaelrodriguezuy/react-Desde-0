import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, IconButton } from '@mui/material';

import {useParams} from 'react-router-dom'

const Pelicula = ({movie, handleLike, deleteMovieById}) => {

    let {name, genre, description, createdAt, img, isLiked} = movie
 
    // rutas dinamicas
  /* let {id} = useParams()
  let peliSeleccionada = movie.find(peli => peli.id === parseInt(id)) */

    return (

        <Card sx={{ width: 300, height: 650 }}>
      <CardHeader
                
        title={name}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"        
        image={img}
        alt={name}
      />
      <CardContent sx={{ height: 260 }}>
        <Typography variant="body2" color="text.secondary">
          <h4>{genre}</h4>
            <p> {description} </p>

        </Typography>
      </CardContent>

      <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color={ isLiked ? "error" : "disabled"} onClick={()=> handleLike(movie) }/>
        </IconButton>
        <Button type='button' variant='contained' color='primary' onClick={()=>deleteMovieById(movie.id)}>Eliminar</Button>
      </CardActions>
      
    </Card>
       
    )
}

export default Pelicula


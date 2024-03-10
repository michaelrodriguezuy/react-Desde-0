const express = require('express');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://pelis-alpha.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));  // CORS habilitado para todos los origenes
require('dotenv').config();

const dbPath = process.env.MOVIES_DATA_PATH || path.join(__dirname, 'db.json');
let moviesData = [];
moviesData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

app.get('/', (req, res) => {
    res.send('Hola muñeko!'
    );
}
);

app.get('/movies', (req, res) => {
    res.json(moviesData);
});

app.patch('/movies/:id', (req, res) => {
    const id = req.params.id;
    const isLiked = req.body.isLiked;

    // Encuentra la película por ID y actualiza el campo isLiked
    const movieIndex = moviesData.findIndex(movie => movie.id === parseInt(id, 10));
    if (movieIndex === -1) {
        return res.status(404).send('Película no encontrada');
    }

    moviesData[movieIndex].isLiked = isLiked;

    // Actualiza la variable de entorno con los nuevos datos de películas
    process.env.MOVIES_DATA = JSON.stringify(moviesData);

    res.json(moviesData[movieIndex]);
});

app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    
    try {
        const moviesData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        
        // Encuentra el índice de la película en el array moviesData
        const movieIndex = moviesData.findIndex(movie => movie.id === parseInt(movieId, 10));
        
        // Si la película no se encuentra, devuelve un error 404
        if (movieIndex === -1) {
            return res.status(404).send('Película no encontrada');
        }
        
        // Elimina la película del array moviesData
        moviesData.splice(movieIndex, 1);
        
        // Escribe los cambios de vuelta al archivo JSON
        fs.writeFileSync(dbPath, JSON.stringify(moviesData, null, 2));
        
        // Devuelve una respuesta 200 OK con el ID de la película eliminada
        res.json({ id: movieId });
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).send('Error interno del servidor');
    }
});





const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});





const express = require('express');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hola muñeko!'
    );
}
);

app.get('/movies', (req, res) => {
    // Construye la ruta absoluta hacia db.json
    const dbPath = path.join(__dirname, 'db.json');

    res.setHeader('Content-Type', 'application/json');

    // Lee el archivo db.json
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData.movies);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    });
});

app.patch('/movies/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const id = req.params.id;
    const isLiked = req.body.isLiked;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const jsonData = JSON.parse(data);
            const movies = jsonData.movies;

            const movieIndex = movies.findIndex(movie => movie.id === parseInt(id, 10));

            if (movieIndex === -1) {
                return res.status(404).send('Pelicula no encontrada');
            }

            movies[movieIndex].isLiked = isLiked;

            fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error interno del servidor');
                }

                res.json(movies[movieIndex]);
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    });
});

app.delete('/movies/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const id = req.params.id;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const jsonData = JSON.parse(data);
            const movies = jsonData.movies;

            const movieIndex = movies.findIndex(movie => movie.id === parseInt(id, 10));

            if (movieIndex === -1) {
                return res.status(404).send('Pelicula no encontrada');
            }

            movies.splice(movieIndex, 1);

            fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error interno del servidor');
                }

                res.json({ id });
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    });
});





const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});





const express = require('express');
const cors = require('cors');
const { sql } = require("@vercel/postgres");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['https://pelis-alpha.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    res.send('Hola muñeko!');
});

app.get('/movies', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM movies`;
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.patch('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const { isliked } = req.body;

    try {
        const result = await sql`
            UPDATE movies 
            SET isliked = ${isliked}
            WHERE id = ${id}
        `;
        
        res.json({ id, isliked });
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        res.status(500).send('Error interno del servidor');
    }
});


app.delete('/movies/:id', async (req, res) => {
    const movieId = req.params.id;

    try {
        await sql`DELETE FROM movies WHERE id = ${movieId}`;
        res.json({ id: movieId });
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/movies', async (req, res) => {
    const { name, description, createdAt, img, genre, isliked } = req.body;

    try {
        const result = await sql`
            INSERT INTO movies (name, description, createdAt, img, genre, isliked)
            VALUES (${name}, ${description}, ${createdAt}, ${img}, ${genre}, ${isliked})
            RETURNING *
        `;
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear la película:', error);
        res.status(500).send('Error interno del servidor');
    }
}
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});

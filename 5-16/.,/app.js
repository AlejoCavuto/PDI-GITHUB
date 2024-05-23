const express = require('express');
const app = express();

const alumnos = [
    { id: 1, nombre: 'thiago', apellido: 'vergara', password: '1234' },
    { id: 2, nombre: 'alejo', apellido: 'cavuto', password: '1234' },
    { id: 3, nombre: 'octavio', apellido: 'cichello', password: '1234' }
];

app.get('/', (req, res) => {
    const nombres = alumnos.map(alumno => alumno.nombre);
    res.send(nombres);
});

app.get('/usuarios', (req, res) => {
    res.json(alumnos);
});

app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mostrarPassword = req.query.mostrarpassword === 'true';
    const alumno = alumnos.find(alumno => alumno.id === id);

    if (alumno) {
        if (mostrarPassword) {
            res.json(alumno); 
        } else {
            /* desestructuro el objeto eliminando password con el operador de propagacion 
            y se crea una nueva variable con todos los valores del objeto menos la password */
            const { password, ...alumnoSinPassword } = alumno;
            res.json(alumnoSinPassword);
        }
    } else {
        res.json({ message: 'No se encontró un alumno con ese ID' });
    }
});

app.listen(3000, () => {
    console.log('Server UP running in http://localhost:3000/');
});

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/miTienda';

// Rutas
app.use(express.static(path.join(__dirname, '../Frontend/build')));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/build/index.html'));
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Conectado a MongoDB');
            app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
        })
        .catch((err) => console.error('Error de conexión a MongoDB:', err));
}

module.exports = app;
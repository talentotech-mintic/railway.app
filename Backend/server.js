const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/miTienda';

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGODB_URI, {})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
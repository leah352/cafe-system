const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const debugRoutes = require('./routes/debugRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const staffRoutes = require('./routes/staffRoutes');
const reportRoutes = require('./routes/reportRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reports', reportRoutes);

// Debug routes (connectivity checks)
app.use('/api/debug', debugRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;

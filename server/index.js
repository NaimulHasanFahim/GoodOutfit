import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();


app.use(express.json({limit: "300mb", extended: true}));
app.use(express.urlencoded({limit: "300mb", extended: true}));
app.use(cors());

// app.use('/posts', postRoutes);
// app.use('/user', userRoutes);
// app.use('/profile', profileRoutes);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('Server running on port: '+PORT)))
.catch((error) =>console.log(error.message));
// mongoose.set('useFindAndModify', false);
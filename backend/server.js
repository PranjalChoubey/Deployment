import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import couponRoutes from './routes/couponRoutes.js';
import adminRoutes from './routes/adminRoutes.js';



// App Config
const app = express()
const port = process.env.PORT || 4000
const couponRoutes = require('./routes/couponRoutes');
const adminRoutes = require('./routes/adminRoutes');


connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/coupons', couponRoutes);
app.use('/api/admin', adminRoutes);

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))

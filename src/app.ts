
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import recaptchaRoutes from './routes/recaptchaRouter';
dotenv.config();
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.use('/api', recaptchaRoutes);

app.listen(port, '192.168.0.104', () => {
    console.log(`Server is running on port http://192.168.0.104:${port}`);
});

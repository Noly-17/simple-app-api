// packages
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Routes
import userRouter from './routers/user';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});

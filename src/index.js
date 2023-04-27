import express from 'express';
import router from './router/index.js';
import errorHandler from './middlewares/errors/errorHandler.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const userRouter = require('./routers/userRoute');
const middlewares = require('./Middleware/notFound');
const blogsRouter = require('./routers/blogsRoute');
//initialize express
const app = express();
PORT=process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(morgan('tiny'));

//routes
app.use('/api/v1/', userRouter);
app.use('/api/v1/',blogsRouter);

//middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);





//create server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
const express = require('express');
require('dotenv').config();
const userRouter = require('./routers/userRoute');
const middlewares = require('./Middleware/notFound');
//initialize express
const app = express();
PORT=process.env.PORT || 5000;
//middleware
app.use(express.json());

//routes
app.use('/api/v1/', userRouter);
//middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);





//create server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
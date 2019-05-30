import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import config from "./config"
import authRoute from './routes/auth'
import userRoute from './routes/user'
import contactRoute from './routes/contact'
import  errorHandler from './middlewares/errorHandler'
import checkToken from './middlewares/checkToken'
import  getUser from './middlewares/getUser'
import cors from 'cors';

const app=express();
mongoose.Promise =bluebird;

mongoose.connect(config.database,{ useNewUrlParser: true },err=>{
    if(err) throw err;
   console.log('Mongo connected');
});

const server= app.listen(config.port,err=>{
   if(err) throw err;

   console.log(`Server listening on port ${config.port}`);
});
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json( ));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:config.secret
}));

app.use(express.static('public'));
app.use('/api',authRoute);
app.use('/api',checkToken,userRoute);
app.use('/api',checkToken,contactRoute);
//app.use(getUser);


app.use(errorHandler);

export default server;
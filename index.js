const app= require('express')();
const express=require('express');
const mongoose=require('mongoose');
const {MONGO_URI,PORT}=require('./config');
const cors=require("cors");
require('./models/User');
require('./models/Organisation');
require('./models/Country');
require('./models/Task')
require('./models/OrgTask');
require('./models/CountryTask');
require('./models/Blog');
require('./models/BlogEnrollment');

const port=process.env.PORT || PORT;

app.use(cors())
app.use(require('express').json());
app.use('/uploads', express.static('uploads'));

//Routes;
const SignUpRoute = require('./routes/signup');
const SignInRoute = require('./routes/login');
const DashBoardRoute = require('./routes/dashboard');
const TaskRoute = require('./routes/Taskroute');
const OrgTaskRoute = require('./routes/TaskrouteByOrg');
const CountryTaskRoute = require('./routes/TaskrouteByCountry');

//routes middle ware
app.use('/api/users', SignUpRoute);
app.use('/api/users', SignInRoute);
app.use('/api/users', DashBoardRoute);
app.use('/tasks', TaskRoute);
app.use('/tasks', OrgTaskRoute);
app.use('/tasks',CountryTaskRoute);
app.use('/api/blog', require('./routes/blog'));
app.use('/api/stats',require('./routes/stats'));
app.use('/user',require('./routes/profile'));
app.use('/task',require('./utils/description'));
app.use('/user',require('./routes/edit'));
app.use('/',require('./routes/UploadPhoto'))
//routes middle ware
// app.use('/api/users', SignUpRoute);
// app.use('/api/users', SignInRoute);
// app.use('/api/users', DashBoardRoute);
// app.use('/tasks', TaskRoute);

mongoose.connect(process.env.MONGO_URI || MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("DataBase Connected"))
.catch(err => console.log(err));

// if(process.env.NODE_ENV === 'production')
// {
    app.use(express.static('client/build'))
// }

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})


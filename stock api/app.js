const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ankit,01',
    database : 'test'
  }
});


const niftyRoutes = require('./api/routes/Nifty');
const sensexRoutes = require('./api/routes/Sensex');
const signinRoutes = require('./api/routes/signin');
const registerRoutes = require('./api/routes/register');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*app.post('/register',(req,res)=>{
	const{email,name,password} = req.body;
	knex('users')
	.returning('*')
	.insert({
		email: email,
		name: name
	})
	.then(response=>{
		res.json(response);
	})
})
*/

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/Nifty',niftyRoutes);
app.use('/Sensex',sensexRoutes);
app.use('/signin',signinRoutes);
app.use('/register',registerRoutes);

app.use((req,res,next)=>{
	const error = new Error('not found');
	error.status(404);
	next(error);
})

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;

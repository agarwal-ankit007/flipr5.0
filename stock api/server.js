/*const http = require('http');
const app = require('./app');
const bcrypt = require('bcrypt-nodejs');


const port = process.env.PORT || 3000;

const server = http.createServer(app);
*/

//const express = require('express');
/*const app = express();*/
/*
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


/*const niftyRoutes = require('./api/routes/Nifty');
const sensexRoutes = require('./api/routes/Sensex');
const signinRoutes = require('./api/routes/signin');
const registerRoutes = require('./api/routes/register');
*/
/*
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/register',(req,res)=>{
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


app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET');
		return res.status(200).json({});
	}
	next();
});

/*app.use('/Nifty',niftyRoutes);
app.use('/Sensex',sensexRoutes);
app.use('/signin',signinRoutes);
/*app.use('/register',registerRoutes);*/
/*
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

*/

//server.listen(port);

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const PORT = process.env.PORT || 3000;

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ankit,01',
    database : 'test'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET');
	/*if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET');
		return res.status(200).json({});
	}*/
	next();
});

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(password);
  console.log(req.body);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('err'))
})


app.get('/nifty',(req,res)=>{
	db.select('*').from('nifty').where('nid',93)
	.then(nifty => {
		if(nifty.length){
			res.json(nifty)
		}else{
			res.status(400).json('not found')
		}
	})
	.catch(err => res.status(400).json('error getting nifty'))
})




/*app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
})
*/

app.listen(PORT, ()=> {
  console.log('app is running on port 3000'+{PORT});
})



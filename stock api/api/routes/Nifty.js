const express = require('express');
const router = express.Router();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ankit,01',
    database : 'test'
  }
});


router.get('/',(req,res,next)=>{
	res.status(200).json({
		message: 'handling get request to /nifty'
	});
});

knex.select('*').from('nifty').then(data=>{
//	console.log(data)
});



router.get('/:date',(req,res,next)=>{

	const dat = req.params.date;
	Nifty.findByDate(dat)
	.exec()
	.then(doc=>{
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({error:err});
	});
});


module.exports = router;
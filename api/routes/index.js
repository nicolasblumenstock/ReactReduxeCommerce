var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

/* GET home page. */
router.get('/productlines/get', function(req, res, next) {
	const selectQuery = 'SELECT * FROM productlines';
	connection.query(selectQuery,(error, results, fields)=>{
		if(error){
			res.json(error)
		}else{
			res.json(results);
		}
	})
})

router.get('/products/get/:pl', function(req, res, next) {
	const pl = req.params.pl;
	const selectQuery = `SELECT * FROM products WHERE productLine IN (SELECT productLine FROM productlines WHERE link='${pl}')`;
	connection.query(selectQuery,(error, results, fields)=>{
		if(error){
			res.json(error)
		}else{
			res.json(results)
		}
		// var newQuery = `SELECT * FROM products WHERE productLine='${results[0].productLine}'`;
		// connection.query(newQuery,(err, ressie, fld)=>{
		// 	console.log(ressie)
		// 	if(err){
		// 		res.json({msg:'bad'});
		// 	}else{
		// 		res.json(ressie);
		// 	}
		})
	})

module.exports = router;
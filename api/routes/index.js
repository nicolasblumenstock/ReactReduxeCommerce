var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');
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
	})
})

router.post('/register', function(req,res,next){
	const reg = req.body;	
	const check = new Promise((resolve,reject) => {
		const checkQuery = 'SELECT * FROM users WHERE userName = ?';
		connection.query(checkQuery,[reg.userName],(error,results)=>{
			if (error) throw error;
			if(results.length > 0){
				reject({
					msg: 'User Name Already Exists.'
				})
			}else{
				resolve();
			}
		})
	})

	check.then(()=>{
		const insertIntoCust = 'INSERT INTO customers (customerNAME,contactLastName,contactFirstName,phone,addressLine1,addressLine2,city,state,postalCode,country,salesRepEmployeeNumber,creditLimit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
		const creditLimit = '1600000';		
		connection.query(insertIntoCust,[
			reg.companyName,
			reg.lName,
			reg.fName,
			reg.phoneNumber,
			reg.addressLine1,
			reg.addressLine2,
			reg.city,
			reg.state,
			reg.postalCode,
			reg.country,
			reg.salesRep,
			creditLimit
			], (error,result)=>{
				if(error) throw error;
				var hash = bcrypt.hashSync(reg.password)
				const newID = result.insertId;				
				var currTimeStamp = parseInt(Date.now() / 1000);
				var token = randToken.uid(40);				
				const insertQuery = 'INSERT INTO users (uid,type,password,created,token,username,email) VALUES (?,?,?,?,?,?,?)';
				connection.query(insertQuery,[
					newID,
					reg.accountType,
					hash,
					currTimeStamp,
					token,
					reg.userName,
					reg.email
					],(secError,secRes)=>{
						if(error){
							res.json({
								msg: secError
							})
						}else{
							res.json({
								msg: 'ok',
								token: token,
								name: reg.userName
							})
						}
					})
			})
	}).catch((error)=>{
		res.json(error)
	})
})

router.post('/login', function(req,res,next){
	var log = req.body;
	var checkQuery = 'SELECT * FROM users WHERE userName = ?';	
	connection.query(checkQuery,[log.userName],(error,results)=>{
		if(error) throw error;
		if (results.length === 0){
			res.json({
				msg: 'User Name Not Valid'
			})
		}else{
			var checkHash = bcrypt.compareSync(log.password,results[0].password);
			if(checkHash){
				const updateToken = `Update users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR)`;
				var token = randToken.uid(40);
				connection.query(updateToken,[token],(secErr, secRes)=>{
					res.json({
						msg: 'ok',
						name: results[0].username,
						token: token
					})
				})
			}else{
				res.json({
					msg: 'Incorrect Password'
				})
			}
		}
	})
})

module.exports = router;
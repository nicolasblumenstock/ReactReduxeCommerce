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

router.get('/salesReps', function(req,res,next){
	const query = 'SELECT employeeNumber,lastName,firstName FROM employees WHERE jobTitle="Sales Rep"';
	connection.query(query, (err, ressie, fields)=>{
		if(err) throw err;
		res.json(ressie);
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
								name: `${log.fname} + ${log.lname}`
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
	var uid = '';
	var checkQuery = 'SELECT * FROM users inner join customers on users.uid = customers.customerNumber  WHERE userName = ?';	
	connection.query(checkQuery,[log.userName],(error,results)=>{
		console.log(results[0])
		if(error) throw error;
		if (results.length === 0){
			res.json({
				msg: 'User Name Not Valid'
			})
		}else{
			uid = results[0].uid;
			var checkHash = bcrypt.compareSync(log.password,results[0].password);
			if(checkHash){
				const updateToken = `Update users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE userName = ?`;
				var token = randToken.uid(40);
				const cartTotal = 'select COUNT(a.item) as items,SUM(b.buyPrice) as total from cart a inner join products b on a.item = b.productCode where a.uid = ? group by a.uid';
				connection.query(updateToken,[token,log.userName],(secErr, secRes)=>{
					connection.query(cartTotal,[uid],(e,r)=>{
						var cart = {
							numItems: r[0].items,
							total: r[0].total
						}
						res.json({
							msg: 'ok',
							name: `${results[0].contactFirstName} ${results[0].contactLastName}`,
							token: token,
							cart: cart
						})					
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


router.post('/updateCart',function(req,res,next){
	var pCode = req.body.pCode;
	var token = req.body.user;
	// var pPrice = req.body.pPrice;
	// console.log(pCode,token,pPrice)
	var selectUser = 'select * from users where token = ?';
	var updateQuery = `INSERT INTO cart (uid,item) VALUES (?,?)`;
	var select = `select * from cart where uid = ?`;
	var uid = '';
	connection.query(selectUser,[token],(e1,r1)=>{
		if(e1) throw e1;
		if (r1.length == 0){
			res.json({msg: 'Log in Again'})
		}else{
			uid = r1[0].uid;
			connection.query(updateQuery,[uid,pCode],(error, results)=>{
				const cartTotal = 'select COUNT(a.item) as items,SUM(b.buyPrice) as total from cart a inner join products b on a.item = b.productCode where a.uid = ? group by a.uid';
				if(error) throw error;
				connection.query(cartTotal,[uid],(e,r)=>{
				if(e) throw e;
				var cart = {
					numItems: r[0].items,
					total: r[0].total
				}
				res.json(cart)
			})
		})			
		}
	})
})


router.post('/checkout', (req,res)=>{
	var token = req.body.token
	// console.log(req.body.token)
	var selectUser = 'select * from users where token =?';
	var uid = '';
	connection.query(selectUser,[token],(e,r)=>{
		if(e) throw e;
		if (r.length == 0){
			res.json({msg: 'Log in Again'})
		}else{
			uid = r[0].uid;
			console.log(uid)
			const query = 'select * from cart inner join products on cart.item = products.productCode where uid = ?';
			connection.query(query,[uid],(er, re)=>{
				if (er) throw er
				// console.log(re);
				res.json(re)
			})
		}
})
})


module.exports = router;
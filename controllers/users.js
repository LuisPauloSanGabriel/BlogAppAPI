const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require("../auth");
const { errorHandler } = require('../auth')


module.exports.registerUser = (req, res) => {
	let newUser = User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
	});


	if(!req.body.email.includes("@")) {
		return res.status(400).send({ error: "Invalid email"})
	}

	if(req.body.firstName === '' || req.body.lastName === '') {
		return res.status(400).send({error: "First name and Last name are required"})
	}

	if(req.body.password.length < 8) {
		return res.status(400).send({ error: 'Password must be atleast 8 characters.'})
	}


	return newUser.save()
	.then((result) => res.status(201).send({
		message: "Registered successfully"
	}))
	.catch(error => errorHandler(error, req, res))
};


module.exports.loginUser = (req, res) => {

	if(req.body.email.includes("@")) {

		return User.findOne({ email: req.body.email})
		.then(result => {
			if (result == null) {
				return res.status(404).send({ error: 'Email does not exist'})
			}

			if(req.body.email == null || req.body.password == null) {
				return res.status(401).send({ error: 'Email and password do not match'});
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

					if(isPasswordCorrect) {
						return res.status(200).send({ access: auth.createAccessToken(result) });
					} else {
						return res.status(401).send(false);
					}
			}
		}).catch(error => errorHandler(error,req,res))

	} else {
		return res.status(400).send(false);
	}
}

module.exports.getUsers = (req, res) => {
    return User.findById(req.user.id).then(result=>{
        if(result){
             return res.status(200).send(result)
         } else {
            return res.status(404).send({ error: "User not found"})
         }
    }).catch(error => errorHandler(error, req, res))
}   

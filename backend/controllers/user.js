const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**User Sign up */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**User login */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log('user : ', user)
            if (!user) {
                return res.status(401).json({ message: 'Compte ou utilisateur incorrect' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Compte ou utilisateur incorrect' });
                    }
                    res.status(200).json({
                        token: jwt.sign({ userId: user._id },
                            process.env.SECRETKEY, { expiresIn: '24h' }
                        ),
                        userId: user._id,
                        role: user.role
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
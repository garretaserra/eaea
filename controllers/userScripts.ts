'use strict';
import mongoose = require('mongoose');
import passport = require('passport');
import User from '../models/user';

exports.login = async function(req, res, next) {
    //Get user data for login
    const user = req.body;
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    await User.findOne({email: user.email}).then((data)=>{
        let finalUser = data;
        if(!finalUser)
            return res.status(400).send('Not found');
        if(finalUser.validatePassword(finalUser.password)) {
            let jwt = finalUser.generateJWT();
            //TODO: remove fields that are not necessary for the frontend

            // finalUser.hash = undefined;
            // finalUser.salt = undefined;
            return res.status(200).json({jwt: jwt, user: finalUser});
        }
        }
    );
};

exports.register = async function (req, res){
    const user= req.body;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(user);
    finalUser.setPassword(user.password);
    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
};

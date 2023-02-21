const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const config  = require('../config/jwt.config');

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY)
                res
                    .cookie('usertoken', userToken, {httpOnly:true})
                    .json({msg: 'user succesfully registered!', user: user});
            })
            .catch(err => res.status(400).json(err));
        },
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user == null) {
            return res.status(400).send('Email address not found');
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword){
            return res.status(400).send('Incorrect Password');
        }
        const userToken = jwt.sign({ id: user._id, firstName: user.firstName }, process.env.SECRET_KEY);

        res
            .cookie('usertoken', userToken, {httpOnly: true})
            .json({ msg: 'User successfuly logged in', user: user})
    }, 

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.status(200).json({msg:"succesfully logged out"})
    },

    getUserByEmail: async(req,res) => {
        const user = await User.findOne({email: req.params.email})
            if(!user){
                return res.status(400).send('Email not found');
            }
            res.json(user)
            

    },

    getUserEvents: (req, res) => {
        User.findOne({_id: req.user.id})
            .populate('eventsHosting')
            .populate({
                path: 'eventInvitations',
                populate: {
                    path: 'invitedToEvent',
                    model: 'Event'
                }
            })
            .then(user => res.json({user:user}))
            .catch(err => res.status(404).json(err))
    },

    getUserInvitedEvents: (req,res) => {
        User.findOne({_id: req.user.id})
            .populate({
                path: 'eventInvitations',
                populate: {
                    path: 'invitedToEvent',
                    model: 'Event'
                }
            })
            .then(user=> res.json(user))
            .catch(err=> res.json(err))
    }
}
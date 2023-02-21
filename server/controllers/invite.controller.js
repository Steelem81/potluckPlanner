const Invite = require('../models/invite.model');
const User = require('../models/user.model');
const Event = require('../models/event.model');
const UserController = require('./user.controller')
module.exports = {
    
    createInvite: (req,res) => {
        Invite.create({
            invitedUser: req.body.invitedUser,
            invitedToEvent: req.body.invitedToEvent,
            invitationStatus: 'pending'
        })
        
            .then(invite => {
                    invite.populate('invitedUser')
                    .then(invite => {
                    res.json(invite)
                    return  Event.findOneAndUpdate({_id: req.params.id}, {$push: {invitations: invite._id}}, {new:true})
            })
        })
            
        

            
            // .then(event => {
            //     return Event.findOneAndUpdate({_id: req.params.id}, {$push: {invitations: invite._id}}, {new:true})
            // })
            .catch(err => res.json(err))
    
    },
    getOneInvitation: (req, res) => {
        Invite.find({_id: req.params.id})
            .populate('invitedToEvent')
            .then(invitation => res.json(invitation))
            .catch(err => res.json(err))
    },

    getUserInvites: (req,res) => {
        Invite.find({invitedUser: req.user.id})
            .populate('invitedToEvent')
            .then(invite => res.json(invite))
            .catch(err => res.json(err))
    },

    updateResponse: (req,res) => {
        Invite.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
            .then(invite=> res.json(invite))
            .catch(err => res.json(err))
    }

}
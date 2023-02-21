const Event = require('../models/event.model');
const User = require('../models/user.model');

module.exports = {
    createEvent: (req, res) => {
        Event.create(req.body)
            .then(event =>{
                res.json(event)
                return User.findOneAndUpdate({_id: req.user.id}, {$push: {eventsHosting: event._id}}, {new:true})
                .catch(err => res.json(err))
            })

            .catch(err => res.status(400).json(err))
    },

    getOneEvent: (req, res) => {
        Event.findOne({_id: req.params.id})
            .populate({
                path:'invitations',
                populate: {
                    path: 'invitedUser',
                    model: 'User'
                }
            })
            .then(event => res.json(event))
            .catch(err => res.status(404).json(err))
    },

    getAllEvents: async(req, res) => {
        await Event.find()
        .then(eventList => res.json(eventList))
        .catch(err=> res.status(400).json(err))
    },

    updateEvent: (req,res) => {
        Event.findOneAndUpdate({_id: req.params.id}, req.body, { new: true, runValidators:true})
        .then(event => res.json(event))
        .catch(err => res.json(err))
    },

    cancelEvent: (req,res) =>{
        Event.deleteOne({_id: req.params.id})
            .then(deletedEvent => res.json(deletedEvent))
            .catch(((err) => console.log(err)));
    }
}

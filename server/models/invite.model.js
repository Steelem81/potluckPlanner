const { mongoose, Schema } = require('mongoose');

const InviteSchema = new mongoose.Schema({
    invitedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    invitedToEvent: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    
    invitationStatus: {
        type: String,
        required: [true, 'status is required']
    },

    dish:{
        type: String,
        enum: {
            values: ['Main', 'Side', 'Drinks', 'Dessert'],
            message: '{VALUE} is not supported'
        }
    }
}, {timestamps: true});


module.exports = mongoose.model('Invite', InviteSchema);


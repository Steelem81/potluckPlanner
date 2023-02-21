const {Schema, mongoose} = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Event Name is required']
    },
    eventDate: {
        type: String,
        required: [true, 'Date is required']
    },
    eventDescription: {
        type: String
    },
    eventLocation: {
        type: String,
        // required: [true, 'Location is required']
    },

    invitations: [{
        type: Schema.Types.ObjectId,
        ref: 'Invite'
    }],
    dishRatio: {
        main: {
            type: Number,
            required: [true, "Main Ratio Required"],
            // min:[0, "Must be greater than 0%"],
            // max:[1, "Must be less than 100%"]
        },
        side: {
            type: Number,
            required: [true, "Sides Ratio required"],
            // min:[0, "Must be greater than 0%"],
            // max:[1, "Must be less than 100%"]
        },
        drink: {
            type: Number,
            required: [true, "Drinks Ratio Required"],
            // min:[0, "Must be greater than 0%"],
            // max:[1, "Must be less than 100%"]
        },
        dessert: {
            type: Number,
            // required: [true, "Desserts Ratio Required"],
            // min:[0, "Must be greater than 0%"],
            // max:[1, "Must be less than 100%"]
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('Event', EventSchema)
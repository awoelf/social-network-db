const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate funciton for thoughts
const getThoughts = async (userId) =>
    Thought.aggregate([
        { $match: {_id: ObjectId(userId)} },
        {
            $unwind: '$thought'
        },
        {
            $group: {
                _id: ObjectId(userId),
                // thoughts: { '$thought' }
            }
        }
    ])

// // Aggregate function for friends
// const getFriends = async (userId) => {

// }

// GET all users
const getUsers = async (req, res) => {
    try {
        const userData = await User.find()
        res.status(200).json(userData);
    }   
    catch (err) {
        res.status(400).json(err);
    }
}

module.exports = getUsers;
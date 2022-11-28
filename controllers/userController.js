const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate funciton for thoughts
const getThoughts = async (userId) =>
  Thought.aggregate([
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: '$thought',
    },
    {
      $group: {
        _id: ObjectId(userId),
        // thoughts: { '$thought' }
      },
    },
  ]);

// // Aggregate function for friends
// const getFriends = async (userId) => {

// }

// GET all users
const getUsers = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

// GET user by id
const getUserById = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.userId });
    if (!userData) {
      res.status(404).json({ message: 'No user with that id.' });
    } else {
      res.status(200).json({ userData });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// POST new user
const newUser = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json({
      message: 'The following user has been created.',
      user: userData,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// DELETE a user
const deleteUser = async (req, res) => {
  try {
    const userData = await User.findOneAndRemove({ _id: req.params.userId });
    if (!userData) {
      res.status(404).json({ message: 'No user with that id.' });
    } else {
      res.status(200).json({
        message: 'The following user has been deleted.',
        user: userData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// PUT user data
const updateUser = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!userData) {
      res.status(404).json({ message: 'No user with that id.' });
    } else {
      res.status(200).json({
        message: 'The following user has been updated.',
        user: userData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// POST new friend
const addFriend = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!userData) {
      res.status(404).json({ message: 'No user with that id.' });
    } else {
      res.status(200).json({
        message: 'A friend has been added to the following user.',
        friendId: req.params.friendId,
        user: userData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// DELETE friend
const deleteFriend = async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        if (!userData) {
            res.status(404).json({ message: 'No user with that id.' });
          } else {
            res.status(200).json({
              message: 'A friend has been deleted from the following user.',
              friendId: req.params.friendId,
              user: userData,
            });
          }
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = { 
    getUsers, 
    getUserById, 
    newUser, 
    deleteUser, 
    updateUser, 
    addFriend,
    deleteFriend
};

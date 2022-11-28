const { User, Thought } = require('../models');

// GET all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughtData = await Thought.find();
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
};

// GET thought by id
const getThoughtById = async (req, res) => {
  try {
    const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought with that id.' });
    } else {
      res.status(200).json({ thoughtData });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// POST a new thought
const newThought = async (req, res) => {
  try {
    const thoughtData = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    const userData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thoughtData._id } },
      { runValidators: true, new: true }
    );

    if (!thoughtData || !userData) {
      res.status(404).json({ message: 'Error when adding thought.' });
    } else {
      res.status(200).json({
        message: 'A new thought has been added to a user.',
        thought: thoughtData,
        user: userData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// PUT a thought
const updateThought = async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought with that id.' });
    } else {
      res.status(200).json({
        message: 'A thought has been updated.',
        thought: thoughtData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// DELETE a thought
const deleteThought = async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    const userData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { thoughts: req.params.thoughtId } },
      { runValidators: true, new: true }
    );
    if (!thoughtData || !userData) {
      res.status(404).json({ message: 'Error when deleting thought.' });
    } else {
      res.status(200).json({
        message: 'The following thought has been deleted.',
        thought: thoughtData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// POST a new reaction
const newReaction = async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought with that id.' });
    } else {
      res.status(200).json({
        message: 'Reaction successfully added to thought.',
        reaction: req.body,
        thought: thoughtData,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// DELETE a reaction
const deleteReaction = async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought with that id.' });
    } else {
      res.status(200).json({ message: 'Reaction successfully deleted.' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getThoughts,
  getThoughtById,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
};

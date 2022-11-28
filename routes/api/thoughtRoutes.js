const router = require('express').Router();
const {
	getThoughts,
	getThoughtById,
	newThought,
	updateThought,
	deleteThought,
	newReaction,
	deleteReaction
} = require('../../controllers/thoughtController');

// Get and add thoughts
router.route('/').get(getThoughts).post(newThought);

// Get, update, and delete thought by id
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// Post and delete reactions
router.route('/:thoughtId/reaction').post(newReaction).delete(deleteReaction);

module.exports = router;

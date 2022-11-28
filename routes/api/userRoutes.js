const {
  getUsers,
  getUserById,
  newUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

const router = require('express').Router();

// Get all users
router.route('/').get(getUsers).post(newUser);

// Get, delete, and update user by id
router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUser);

// Add and delete friend by id
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;

const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post(
  '/',
  [
    check('firstName').not().isEmpty(),
    check('email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phoneNumber, email, address } = req.body;

    try {
      const user = new User({ firstName, lastName, phoneNumber, email, address });
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
);

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update user
router.put('/:id', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, address } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.email = email || user.email;
    user.address = address || user.address;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    await user.remove();
    res.json({ msg: 'User removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

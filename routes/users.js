const express = require('express');
const User = require('../models/user');
const uploadCloud = require('../config/cloudinary.js');

const router = express.Router();

/* GET Profile page */

router.get('/profile', (req, res, next) => {
  const session = req.session.currentUser;

  User.findById(session._id)
    .populate('myFriends')
    .then((friends) => {
      const friendsNames = friends.myFriends;
      res.render('profile', { session, friendsNames });
    })
    .catch(next);
});

/* POST Add friend page */

router.post('/profile/search', (req, res, next) => {
  const searchField = req.body.search;
  User.find({ "username" : searchField })
    .then((user) => {
      res.render('search', { user });
    })
    .catch(next);
});

/* POST Add friend to friend list */

router.post('/profile', (req, res, next) => {
  const friendId = req.body.id;
  const userName = req.session.currentUser.username;
  User.findOneAndUpdate({ username: userName }, { $push: { myFriends: friendId } })
    .then((user) => {
      res.redirect('profile');
    })
    .catch(next);
});

/* POST delete friend from friend list */


router.post('/profile/:id/delete', (req, res, next) => {
  const friendId = Object.values(req.params);
  const userName = req.session.currentUser.username;

  User.findOneAndUpdate({ username: userName }, { $pullAll: { myFriends: friendId } })
    .then(() => res.redirect('/users/profile'))
    .catch(next);
});

module.exports = router;

/* POST user profile image */

router.post('/profile/add-profile-photo', uploadCloud.single('photo'), (req, res, next) => {
  const userId = req.session.currentUser._id;
  const imagePath = req.file.url;
  User.findByIdAndUpdate(userId, { 'imgPath': imagePath }, { new: true })
    .then((user) => {
      const session = user;
      User.findById(session._id)
        .populate('myFriends')
        .then((friends) => {
          const friendsNames = friends.myFriends;
          res.render('profile', { session, friendsNames });
        })
        .catch(next);
    })
    .catch(next);
});

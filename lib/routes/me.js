/* eslint-disable new-cap */
const router = require('express').Router;
const User = require('../models/user');

router
  .get('/favorites', ({ user }, res, next) => {
    User.findById(user.id)
      .populate('facorites', 'name')
      .lean()
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .put('/favorites/:skiResortId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.skiResortId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });

module.exports = router;
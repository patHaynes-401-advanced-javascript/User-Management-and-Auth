/* eslint-disable new-cap */
const router = require('express').Router();
const User = require('../models/user');

router
  .get('/favorites', ({ user }, res, next) => {
    User.findById(user._id)
      .populate('favorites', 'name')
      .lean()
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .put('/favorites/:skiResortId', (req, res, next) => {
    User.updateById(req.body._id, {
      $push: {
        favorites: req.params.skiResortId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });

  


module.exports = router;
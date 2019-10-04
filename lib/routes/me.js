/* eslint-disable new-cap */
const router = require('express').Router();
const User = require('../models/user');

router
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .populate('favorites')
      .lean()
      .then(user => res.json(user))
      .catch(next);
  })

  .put('/favorites/:skiResortId', (req, res, next) => {
    User.updateById(req.body._id, {
      $push: {
        favorites: req.params.skiResortId
      }
    })
      .then(favorites => res.json(favorites))
      .catch(next);
  });

  


module.exports = router;
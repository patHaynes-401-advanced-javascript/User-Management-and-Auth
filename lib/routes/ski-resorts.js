/* eslint-disable new-cap */
const router = require('express').Router();
const SkiResort = require('../models/ski-resort');

router
  .post('/', (req, res, next) => {
    req.body.owner = req.user.id;
    SkiResort.create(req.body)
      .then(resort => res.json(resort))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    SkiResort.findById(req.params.if)
      .lean()
      .then(resort => res.json(resort))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    SkiResort.find()
      .lean()
      .then(resort => res.json(resort))
      .catch(next);
  })

  .put('/:id', ({ params, body, user }, res, next) => {
    SkiResort.updateOne({
      _id: params.id,
      owner: user.id
    }, body)
      .then(resort => res.json(resort))
      .catch(next);
  })

  .delete('/:id', ({ params, user }, res, next) => {
    SkiResort.findOneAndRemove({
      _id: params.id,
      owner: user.id
    })
      .then(resort => res.json(resort))
      .catch(next);
  });

module.exports = router;

// eslint-disable-next-line new-cap
const router = require('express').Router();
const SnowCondition = require('../models/snow-condition');
const ensureAuth = require('../middleware/ensure-auth');
const ensureRole = require('../middleware/ensure-role');

router
  .get('/', (req, res, next) => {
    SnowCondition.find()
      .lean()
      .then(conditions => res.json(conditions))
      .catch(next);
  })

  .post('/', ensureAuth(), ensureRole('admin'), (req, res, next) => {
    SnowCondition.create(req.body)
      .then(conditions => res.json(conditions))
      .catch(next);
  })

  .put('/:id', ensureAuth(), ensureRole('admin'), ({ params, body }, res, next) => {
    SnowCondition.updateOne({
      _id: params.id,
    }, body)
      .then(conditions => res.json(conditions))
      .catch(next);
  })

  .delete('/', ensureAuth(), ensureRole('admin'), ({ params }, res, next) => {
    SnowCondition.findByIdAndRemove({
      _id: params.id
    })
      .then(conditions => res.json(conditions))
      .catch(next);
  });

module.exports = router;